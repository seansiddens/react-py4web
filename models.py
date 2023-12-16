"""
This file defines the database models
"""

from .common import db, Field
from pydal.validators import *

### Define your table below
#
# db.define_table('thing', Field('name'))
#
## always commit your models to avoid problems later
#
# db.commit()
#
# Define the user table
db.define_table('foo',
                Field('first_name', required=True),
                Field('last_name', required=True),
                Field('email', unique=True, required=True),
                Field('password', 'password', readable=False, required=True),
                )

db.commit()