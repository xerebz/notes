import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import NotesList from './components/NotesList';
import { LogOut } from 'lucide-react';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Notes App</h1>
          <button
            onClick={() => auth.signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <LogOut className="mr-2" />
            Sign Out
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <NotesList />
        </div>
      </main>
    </div>
  );
}

export default App;