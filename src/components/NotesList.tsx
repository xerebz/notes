import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Plus, Trash2, Edit2, Save } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

const NotesList: React.FC = () => {
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/notes`), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          content: doc.data().content,
          createdAt: doc.data().createdAt.toDate(),
        }));
        setNotes(notesData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addNote = async () => {
    if (newNote.trim() && user) {
      await addDoc(collection(db, `users/${user.uid}/notes`), {
        content: newNote,
        createdAt: new Date(),
      });
      setNewNote('');
    }
  };

  const deleteNote = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, `users/${user.uid}/notes`, id));
    }
  };

  const startEditing = (id: string, content: string) => {
    setEditingNote(id);
    setEditContent(content);
  };

  const saveEdit = async () => {
    if (editingNote && user) {
      await updateDoc(doc(db, `users/${user.uid}/notes`, editingNote), {
        content: editContent,
      });
      setEditingNote(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Notes</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Add a new note..."
        />
        <button
          onClick={addNote}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-r flex items-center"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="bg-white p-4 rounded shadow">
            {editingNote === note.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-grow p-2 border rounded-l"
                />
                <button
                  onClick={saveEdit}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r flex items-center"
                >
                  <Save size={20} />
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p>{note.content}</p>
                <div>
                  <button
                    onClick={() => startEditing(note.id, note.content)}
                    className="text-blue-500 hover:text-blue-600 mr-2"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {note.createdAt.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;