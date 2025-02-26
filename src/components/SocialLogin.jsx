
import { Google } from "../firebase";

const SocialLogin = ({ onLogin }) => {
  const handleGoogleLogin = async () => {
    try {
      const userData = await Google();
      if (userData) {
        onLogin(userData);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="social-login">
      <button className="social-button" onClick={handleGoogleLogin}>
        <img src="google.png" alt="Google" className="social-icon" />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
