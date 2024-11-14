import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNoteStore } from "../store/noteStore";
import toast from "react-hot-toast";

function Notes({id,title,content,onEdit}){

    const {deleteNote } = useNoteStore();

    async function handleDelete(e){
        e.preventDefault();
        
        try{
            await deleteNote(id);
            toast.success("Note deleted successfully");
        }
        catch(error){
            console.log(error)
        }        
    }

    function handleEdit(e){
        e.preventDefault();
        onEdit({id,title,content}); //trigger edit with note data.
    }

    return (
        <div className="notes">
            <h2>{title}</h2>
            <p>{content}</p>
            <DeleteIcon className="delete-btn" onClick={handleDelete} />
            <BorderColorIcon className="edit-btn" onClick={handleEdit} />
        </div>
    );
}
export default Notes;