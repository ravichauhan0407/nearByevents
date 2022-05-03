import React from 'react'
import { isAuthenticated } from '.';

import {Navigate} from 'react-router-dom'

function PrivateRoute({ children }) {
    const auth = isAuthenticated();
    return auth ? children : <Navigate to="/signin" />;
  }

export default PrivateRoute