import React from 'react';
import useAuth from './hooks/useAuth';

interface IProps {
  children?: React.ReactNode;
}

const RequireAuth = (props: IProps) => {

  const auth = useAuth();

  console.log(props.children);
  if(auth.isLoggedIn('Google')) {
    return props.children;
  } else {
    return (
      <>
        <h1> You must be logged in to view this page. </h1>
        <a href="http://localhost:3000/googleauth/sign-in"> Sign In via Google Auth </a>
      </>
    );
  }
}

export default RequireAuth;
