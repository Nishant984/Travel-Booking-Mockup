import { useAuth } from '../context/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const LoginButton = () => {
  const { currentUser, googleSignIn, logOut } = useAuth();

  const handleAuth = async () => {
    if (currentUser) {
      await logOut();
    } else {
      await googleSignIn();
    }
  };

  return (
    <button
      onClick={handleAuth}
      className="flex items-center space-x-1 hover:text-blue-200"
    >
      <UserCircleIcon className="h-5 w-5" />
      <span>{currentUser ? 'Logout' : 'Login'}</span>
    </button>
  );
};

export default LoginButton;