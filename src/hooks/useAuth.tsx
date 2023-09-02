export const AUTH_LOCATION = {
  'Google': 'gauth-token'
} as const;

type AuthSource = keyof typeof AUTH_LOCATION;

function useAuth() {

  function getCredentials(source: AuthSource) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(AUTH_LOCATION[source]))
      ?.split('=')[1];
  }

  function LogOut(source: AuthSource) {
    document.cookie = `${AUTH_LOCATION[source]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  function isLoggedIn(source: AuthSource) {
    const token = getCredentials(source);
    return !!token;
  } 

  return { isLoggedIn, LogOut, getCredentials }
}

export default useAuth;