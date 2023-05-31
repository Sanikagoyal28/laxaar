const { Errorhandler } = require("../middleware/errorHandler")
const Note = require("../models/noteModel")

const createNote = async (req, res, next) => {
    try {

        const { title, description } = req.body

        if (!title)
            return next(new Errorhandler("Title for a note is required", 400))

        const find_note = await Note.findOne({ title: title.toUpperCase() })

        if (find_note)
            return next(new Errorhandler("Note by this title already exists", 400))

        const new_note = await Note.create({
            title: title.toUpperCase(),
            description
        })

        return res.status(200).json({ success: true, msg: "New Note added" })
    }
    catch (err) {
        return next(new Errorhandler(err))
    }
}

const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({})

        return res.status(201).json({ success: true, msg: "User's notes", notes })
    }
    catch (err) {
        return next(new Errorhandler(err))
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const { noteid } = req.params

        if (!noteid)
            return next(new Errorhandler("Note ID is not given", 400))

        const note = await Note.findById(noteid)
        if (!note)
            return next(new Errorhandler("Note not found", 400))

        await Note.deleteOne({ _id: noteid })

        return res.status(201).json({ success: true, msg: "Note deleted successfully" })
    }
    catch (err) {
        return next(new Errorhandler(err))
    }
}

const editNote = async (req, res, next) => {
    try {
        const { noteid, title, description } = req.body

        if (!noteid)
            return next(new Errorhandler("Note ID is not given", 400))

        const note = await Note.findById(noteid)
        if (!note)
            return next(new Errorhandler("Note not found", 400))

        const note_title = await Note.findOne({ title: title.toUpperCase() })
        
        if (note_title && !note._id.equals(note_title._id))
            return next(new Errorhandler("Note by this title already exists", 400))

        const edit_note = await Note.updateOne({ _id: noteid }, {
            title: title.toUpperCase(),
            description
        })

        return res.status(201).json({ success: true, msg: "Note edited successfully" })
    }
    catch (err) {
        return next(new Errorhandler(err))
    }
}

module.exports = {
    createNote,
    getNotes,
    deleteNote,
    editNote
}
