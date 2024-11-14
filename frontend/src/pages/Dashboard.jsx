import React, { useEffect, useState } from 'react';
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import CreateNote from "./CreateNote";
import Notes from "../components/Notes";
import { useNoteStore } from '../store/noteStore';

const Dashboard = () => {

  const {notes, getNotes} = useNoteStore();
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    getNotes();
  },[getNotes]);

  function handleEdit(note){
    setEditingNote(note);
  }

  function handleSave(){
    getNotes();
    setEditingNote(null); 
  }

  return (
    <div>
    <Header />
      <CreateNote editingNote={editingNote} onSave={handleSave} />
      
      {notes.map((note,index)=>{
        return (
          <Notes
            key={index}
            id={note._id}
            title={note.title}
            content={note.content}
            onEdit={() => handleEdit(note)}
          />
        )
      })}
    <Footer />
    </div>
  )
}

export default Dashboard;


 