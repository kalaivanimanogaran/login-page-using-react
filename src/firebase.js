
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJBrsy9qS5c-LhdMekRHQvOyCQfh_dEbA",
  authDomain: "my-project-baf6b.firebaseapp.com",
  projectId: "my-project-baf6b",
  storageBucket: "my-project-baf6b.firebasestorage.app",
  messagingSenderId: "549323379601",
  appId: "1:549323379601:web:4aa063851237a68a158030",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const Google = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      const userData = {
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("name", userData.name);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("profilePic", userData.profilePic);
      }

      console.log("User Data Saved:", userData);
      return userData;
    } else {
      console.error("User data not available");
      return null;
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

// Firebase Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    console.log("User successfully logged out");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth, provider };

