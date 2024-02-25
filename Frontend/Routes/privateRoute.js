import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/spinner';
import { setAuth } from '../redux/auth';

function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/v1/auth/user-auth', {
          headers: {
            Authorization: auth?.token,
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }

        console.log(setOk)
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error checking authentication:', error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      // If no token is available, clear the auth state to prevent any potential issues
      dispatch(setAuth({ user: null, token: '' }));
      setOk(false);
    }
  }, [auth?.token, dispatch]);

  return ok ? <Outlet /> : <Spinner />;
}

export default PrivateRoute;
