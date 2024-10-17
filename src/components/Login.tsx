import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Notes App</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <LogIn className="mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;