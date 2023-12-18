"""
This file defines actions, i.e. functions the URLs are mapped into
The @action(path) decorator exposed the function at URL:

    http://127.0.0.1:8000/{app_name}/{path}

If app_name == '_default' then simply

    http://127.0.0.1:8000/{path}

If path == 'index' it can be omitted:

    http://127.0.0.1:8000/

The path follows the bottlepy syntax.

@action.uses('generic.html')  indicates that the action uses the generic.html template
@action.uses(session)         indicates that the action uses the session
@action.uses(db)              indicates that the action uses the db
@action.uses(T)               indicates that the action uses the i18n & pluralization
@action.uses(auth.user)       indicates that the action requires a logged in user
@action.uses(auth)            indicates that the action requires the auth object

session, db, T, auth, and tempates are examples of Fixtures.
Warning: Fixtures MUST be declared with @action.uses({fixtures}) else your app will result in undefined behavior
"""

import bcrypt
import jwt
import os
import mimetypes
from py4web import action, request, response, abort
from .common import db

SECRET_KEY = 'your-secret-key'  # TODO: Replace with actual secret key

def token_required(f):
    def decorated(*args, **kwargs):
        # Extract the token from the Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            abort(401, 'Authorization token is missing or invalid')

        token = auth_header.split(" ")[1]  # Extract the token part
        
        try:
            # Decode the token
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = payload  # You can attach user information to the request
        except jwt.ExpiredSignatureError:
            # Token has expired
            abort(401, 'Token has expired')
        except jwt.InvalidTokenError:
            # Token is invalid
            abort(401, 'Invalid token')

        return f(*args, **kwargs)

    return decorated


@action('user', method=['GET'])
@token_required
def user():
    """Example of a protected endpoint that requires a valid JWT token to be included in the Authorization header."""
    response.status = 200
    return {}


@action('signup', method=['POST', 'OPTIONS'])
@action.uses(db)
def signup():
    # Get credentials from the request.
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    password= data.get('password')  
    email = data.get('email')

    print(f"{email} is signing up!")

    # Check if the user already exists.
    existing_user = db(db.foo.email == email).select().first()
    if (existing_user):
        response.status = 409
        return {"error": "User already exists"}

    # Hash the password.
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create new user record in the database.
    user_id = db.foo.insert(first_name=first_name, last_name=last_name, email=email, password=hashed_password)

    response.status = 201
    return {"message": "User registered successfully", "email": email, "firstName": first_name, "lastName": last_name, "user_id": user_id}


@action('signin', method=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    print("User is signing in!")

    if not email or not password:
        return {"error": "Email and password are required"}

    # Retrieve user from the database
    user = db(db.foo.email == email).select().first()

    if not user:
        print("user not found!")
        response.status = 404
        return {"error": "User not found"}

    # Check if the supplied password matches the hashed password in the database
    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        # Create a JWT token
        token = jwt.encode({'user_id': user.id}, SECRET_KEY, algorithm='HS256')
        response.status = 200
        return {"email": user.email, "firstName": user.first_name, "lastName": user.last_name, "token": token}
    else:
        response.status = 401
        return {"error": "Invalid credentials"}


@action('index')
def catch_all(path=None):
    print("default page being served")
    # Construct an absolute path to the React index.html file.
    APP_FOLDER = os.path.dirname(__file__)
    file_path = os.path.join(APP_FOLDER, 'static', 'build', 'index.html')

    # Ensure the file exists
    if not os.path.isfile(file_path):
        # Handle the error appropriately (e.g., return a 404 page)
        return 'File not found', 404

    with open(file_path, 'rb') as f:
        response.headers['Content-Type'] = 'text/html'
        return f.read()


# @action('index')
# @action('react-app/<path:path>', method=['GET'])
# def catch_all(path=None):
#     # Path to your React app's build directory
#     app_build_folder = os.path.join(os.path.dirname(__file__), 'static', 'build')

#     # Serve static files (e.g., CSS, JS, images)
#     if path is not None and "." in path:  # Checks if the path is likely a file
#         file_path = os.path.join(app_build_folder, path)
#         if os.path.isfile(file_path):
#             # Infer the content type (e.g., text/css, application/javascript)
#             content_type, _ = mimetypes.guess_type(file_path)
#             if content_type:
#                 response.headers['Content-Type'] = content_type
#                 print(f"serving {content_type}")
#             return open(file_path, 'rb').read()

#     # Serve index.html for any other path
#     index_file_path = os.path.join(app_build_folder, 'index.html')
#     if os.path.isfile(index_file_path):
#         print("serving index.html")
#         response.headers['Content-Type'] = 'text/html'
#         return open(index_file_path, 'rb').read()

#     return 'Not Found', 404
