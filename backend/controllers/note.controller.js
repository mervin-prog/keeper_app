
import mongoose, { mongo } from 'mongoose';
import Note from '../models/note.model.js';
import User from '../models/user.model.js';

export const createNote = async (req,res) =>{

        const {title,content}= req.body;
        try{
            if(!title || !content){
                return res.status(400).json({success: false, message: "Please provide all fields"});
            }
            
            const newNote = new Note({
                userId:req.user._id,
                title,
                content
            });
            
            await newNote.save();
            res.status(200).json({status: true, newNote});
        }
        catch(error){
            res.status(400).json({status:false,message:error.message});
        }
}

export const deleteNote = async (req,res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({status: false, message: "Invalid id or Note not found"});
    }
    try{
        await Note.findByIdAndDelete(id);
        res.status(200).json({status: true, message: "Note deleted successfully"});
    }
    catch(error){
        res.status(500).json({status: false, message: "Server error"});
    }
}

export const getNotes = async (req,res) =>{
    try{
        const notes = await Note.find({});
        return res.status(200).json({status: true, notes});
    }
    catch(error){
        res.status(500).json({status: false, message: "Server error"});
    }
}

export const updateNote= async (req,res) =>{
    const {id} = req.params;
    const note = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({status: false, message: "Invalid id or Note not found"});
    }
    try{
        const updatedNote = await Note.findByIdAndUpdate(id, note, {new :true});
        return res.status(200).json({status: true, updatedNote});
    }
    catch(error){
        res.status(500).json({status: false, message: "Server error"});
    }
}


export const checkAuth = async (req, res, next) => {

    if (!req.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized - user ID not found" });
    }

	try {
        //Find the User by userId and Attach user to req without password i.e)...user._doc,password:undefined
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
        req.user = user;
        next();
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};