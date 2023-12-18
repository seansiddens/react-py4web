import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';
import SignIn from './SignIn';
import SignUp from './SignUp';

/**
 * A wrapper component for routes that require authentication. 
 */
const AuthenticatedRoute = ({children}) => {
  if (localStorage.getItem('user')) {
    return children;
  }

  // If user is not logged in, re-direct them to the signin page.
  return <Navigate to='/signin' replace />;
};

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={
          <Home />
        }/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<NotFound/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
