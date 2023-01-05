import React from 'react'
import { isAuthenticated } from '.';

import {Navigate} from 'react-router-dom'

function PrivateRoute({ children }) {
    const auth = isAuthenticated();
    return auth ? children : <Navigate to="/signin" />;
  }

function ProtectedRoute({ children }) {
    const auth = isAuthenticated();
    return auth ? <Navigate to="/" />:children;
  }



export{
  PrivateRoute,ProtectedRoute
}