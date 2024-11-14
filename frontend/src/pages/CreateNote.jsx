import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useNoteStore } from '../store/noteStore';
import toast from 'react-hot-toast';

function CreateNote({editingNote, onSave}) {

    const [isExpanded,setExpanded] = useState(false);
    const {createNote, updateNote, error} = useNoteStore();
    const [note, setNote] = useState({
        title : "",
        content : ""
    });

    //populate the form with editing note.

    useEffect(() => {
        if(editingNote){
            setNote({
                title : editingNote.title,
                content : editingNote.content
            });
        }
        else{
            setNote({title : "", content : ""});
        }
    },[editingNote]);

    function handleChange(event){
        const {name, value} = event.target;
        setNote((prevNote)=>({
            ...prevNote,
            [name]:value
        }));
    }

    function handleExpand(){
        setExpanded(true);
    }

    async function submitNote(event){
        event.preventDefault();

        try{
            if(editingNote){
                await updateNote(editingNote._id, note);
                toast.success("Note updated successfully !")
                onSave();
            }
            else{
                await createNote(note.title, note.content);
                toast.success("Note created successfully !")
            }
        }
        catch(error){
            console.log(error);
        }
        
        setNote({
            title:"",
            content:""
        });
        setExpanded(false);
    }

    return (
        
        <form className='create-note'>
        {
            isExpanded &&
            <input 
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder='Title'
        />
        }
        <textarea 
            name="content"
            onChange={handleChange}
            onClick={handleExpand}
            value={note.content}
            placeholder='Keep a Note...'
            rows={isExpanded ? 3 : 1}
        />
        {error && <p style={{color: "red", fontWeight: "bold", padding:"5px", alignSelf:"self-start", marginBottom:"30px"}}>{error}</p>}

        <Zoom in={isExpanded}>

            {editingNote === null ?
                <Fab className='add-btn' onClick={submitNote}>
                <AddIcon />
                </Fab>
                :
                <Fab className='update-btn' onClick={submitNote}>
                    <UpdateIcon />
                </Fab>
            }
            
        </Zoom>
        </form>
    );
};

export default CreateNote;
