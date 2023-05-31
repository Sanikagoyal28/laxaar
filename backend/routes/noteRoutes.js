const express = require("express")
const router = express.Router();

const NoteController = require("../controller/noteController")

router.post("/create_note", NoteController.createNote)
router.post("/edit_note", NoteController.editNote)
router.get("/get_note", NoteController.getNotes)
router.delete("/delete_note/:noteid", NoteController.deleteNote)

module.exports = router