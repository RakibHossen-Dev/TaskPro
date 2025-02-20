import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // localStorage.setItem("email", currentUser?.email);
      setUser(currentUser);
      // console.log(currentUser);
      setLoading(true);
      if (currentUser) {
        const userInfo = { email: currentUser.email };

        // Get JWT token
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });

        // Check `premiumTaken` status
        const userResponse = await axiosPublic.get(
          `/user/${currentUser.email}`
        );
        const userData = userResponse.data;
        if (userData.premiumEnds) {
          const premiumEndTime = new Date(userData.premiumEnds);
          const currentTime = new Date();

          if (currentTime > premiumEndTime) {
            await axiosPublic.patch(`/resetPremium/${currentUser.email}`, {
              premiumTaken: null,
              premiumEnds: null,
            });
            console.log("Subscription expired. Resetting premium status.");
            setUser((prevUser) => ({
              ...prevUser,
              premiumTaken: null,
              premiumEnds: null,
            }));
          } else {
            console.log("User is still a premium user.");
          }
        }

        // jgkfh
      } else {
        localStorage.removeItem("access-token");
      }
      console.log("Current User", currentUser);
      // localStorage.setItem("email", currentUser?.email);

      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
