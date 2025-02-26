import { useState, useEffect } from "react";
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("name");
    if (storedUser) {
      setUser({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        profilePic: localStorage.getItem("profilePic"),
      });
    }
  }, []);

  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem("name"); 
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    console.log("User Logged Out");
  };

  return (
    <div className="login-container">
      {user ? (
        <div className="user-info">
          <img src={user.profilePic} alt="Profile" className="profile-pic" />
          <p>Welcome, {user.name}!</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <h2 className="form-title">{isSignUp ? "Sign Up" : "Log in with"}</h2>

          <SocialLogin onLogin={setUser} />

          <p className="separator">
            <span>or</span>
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="login-form">
            <InputField type="email" placeholder="Email address" icon="mail" />
            <InputField type="password" placeholder="Password" icon="lock" />

            {isSignUp && (
              <InputField
                type="password"
                placeholder="Confirm Password"
                icon="lock"
              />
            )}

            {!isSignUp && (
              <a
                href="#"
                className="forgot-pass-link"
                onClick={(e) => e.preventDefault()}
              >
                Forgot Password?
              </a>
            )}

            <button type="submit" className="login-button">
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          <p className="signup-prompt">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <a
              href="#"
              className="signup-link"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? " Login now" : " Sign up now"}
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default App;



