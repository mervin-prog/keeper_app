import {create} from "zustand";
import axios from "axios";


const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/notes" : `${import.meta.env.VITE_CLIENT_URL}/api/notes`;

axios.defaults.withCredentials = true;

export const useNoteStore = create((set) => ({

    notes : [],
    error : null,
    message : null,

    getNotes : async() => {
        set({error : null});
        try{
            const response = await axios.get(`${API_URL}`);
            set({notes: response.data.notes, error : null});
        }
        catch(error){
            set({error: error.message});
        }
    },

    createNote : async(title,content) => {
        set({error : null});
        try{
            const response = await axios.post(`${API_URL}`, { title, content});
            set((prevNotes) => ({
                notes : [...prevNotes.notes, response.data.newNote],
                error : null
            }));
        }
        catch(error){
            set({error: error.response.data.message});
            throw error;
        }
    },

    updateNote : async (id,note) => {
        set({error : null});
        try{
            const response = await axios.put(`${API_URL}/${id}`,note);
            
            set((prevNotes) => ({
                notes: prevNotes.notes.map((note) => (note._id === id ? response.data : note)),
                error: null
            }))
        }
        catch(error){
            set({error: error.response.message});
        }
    },

    deleteNote : async (id) => {
        set({error : null});
        try{
            await axios.delete(`${API_URL}/${id}`);
            set((prevNotes) => ({
                notes : prevNotes.notes.filter((note) => (note._id !== id)),
                error : null
            }));
        }
        catch(error){
            set({error : error.message});
        }
    },
}))