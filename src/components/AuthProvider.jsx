import React from 'react';
import { firebase, googleAuthProvider } from 'config/firebase';
import Loader from 'components/Loader';
import { getFullUser, updateProfile } from 'services/user';
import ErrorPage from 'components/ErrorPage';
import Button from 'components/Button';

const AuthContext = React.createContext(null);

const Provider = ({ children }) => {
  const [authError, setAuthError] = React.useState(null);
  const [hasCheckedUser, setHasCheckedUser] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const onStartLogIn = React.useCallback(() => {
    firebase
      .auth()
      .signInWithRedirect(googleAuthProvider)
      .catch(error => {
        console.error(error);
        setAuthError(error);
      });
  }, [setAuthError]);

  const logOut = React.useCallback(() => {
    firebase.auth().signOut();
  }, []);

  const updateUser = React.useCallback(
    updatedUser => {
      setUser(user => ({
        ...user,
        ...updatedUser,
      }));
      return updateProfile({
        ...user,
        ...updatedUser,
      }).then(afterUpdate => {
        setUser(user => ({
          ...user,
          ...updatedUser,
          ...afterUpdate,
        }));
      });
    },
    [user],
  );

  const value = React.useMemo(
    () => ({
      user,
      onStartLogIn,
      logOut,
      updateUser,
    }),
    [user, onStartLogIn, logOut, updateUser],
  );

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        setUser(null);
        if (!hasCheckedUser) setHasCheckedUser(true);
      } else {
        getFullUser(user).then(user => {
          setUser(user);
          if (!hasCheckedUser) setHasCheckedUser(true);
        });
      }
    });
  }, [setUser, setHasCheckedUser, hasCheckedUser]);

  if (!hasCheckedUser) return <Loader />;

  if (authError)
    return (
      <ErrorPage
        message={
          <>
            <p>
              Hm...we 're having some trouble logging you in. Please try again
              in a moment.{' '}
            </p>{' '}
            <p>
              If the problem persists, please{' '}
              <a
                href="mailto:siteless@googlegroups.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact us{' '}
              </a>
              .{' '}
            </p>{' '}
            <div>
              <Button
                text="Back"
                onClick={() => {
                  setAuthError(null);
                }}
              />{' '}
            </div>
          </>
        }
        error={authError}
      />
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Provider;
