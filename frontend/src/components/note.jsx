import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { DltNoteThunk, EditNoteThunk, dltNote, editNote } from "../redux/noteSlice";

function Note(props) {

    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState('')
    const [dltId, setDltId] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch();
    const notes = useSelector((r) => r.notes)

    function handleEdit(e) {
        e.preventDefault()
        const data = {
            title,
            "description": desc,
            "noteid": editId
        }
        dispatch(EditNoteThunk(data))
            .then((res) => {
                if (res.payload.data.success) {
                    toast.success(res.payload.data.msg, {
                        position: "top-right",
                        theme: "light",
                        autoClose: 5000,
                    });
                    setEdit(false)
                    const note = {
                        "_id": editId,
                        "title": title,
                        "description": desc
                    }
                    dispatch(editNote(note))
                    console.log("yes")
                }
                if (res.payload.status === 400) {
                    toast.error(res.payload.data.msg, {
                        position: "top-right",
                        theme: "light",
                        autoClose: 5000,
                    });
                }
            })
    }

    function handleDelete() {
        dispatch(DltNoteThunk(dltId))
            .then((res) => {
                if (res.payload.data.success) {
                    toast.success(res.payload.data.msg, {
                        position: "top-right",
                        theme: "light",
                        autoClose: 5000,
                    });
                    setOpen(false)
                    dispatch(dltNote({ id: dltId }))
                }
                if (res.payload.status === 400) {
                    toast.error(res.payload.data.msg, {
                        position: "top-right",
                        theme: "light",
                        autoClose: 5000,
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (notes.length > 0) {
            notes.map((n) => {
                if (n._id === editId) {
                    setTitle(n.title)
                    setDesc(n.description)
                }
            })
        }
    }, [editId])

    useEffect(() => {

        const totalNotes = document.getElementsByClassName("Notes")
        const button1 = document.getElementsByClassName("button1")
        const button2 = document.getElementsByClassName("button2")

        for (var i = 0; i < totalNotes.length; i++) {
            let max = 0xFFFFFF;
            let random = Math.random() * max;
            random = Math.floor(random)
            let hex = random.toString(16)
            let randomColor = hex.padStart(6, 0)

            totalNotes[i].style.backgroundColor = '#' + randomColor
            button1[i].style.color = '#' + randomColor
            button2[i].style.color = '#' + randomColor
        }
    }, [])

    return <>
        <div className="Notes">
            <div className="buttonFlex">
                <button className="button1" onClick={() => {
                    setEdit(true)
                    setEditId(props.id)
                }}>Edit</button>
                <button className="button2" onClick={() => {
                    setOpen(true)
                    setDltId(props.id)
                }}>Delete</button>
            </div>
            <p className="title">{props.title}</p>
            <p className="desc">{props.desc}</p>
        </div>

        {/* delete dialog */}
        <Dialog open={open} onClose={() => { setOpen(false) }} PaperProps={{
            sx: {
                maxWidth: 600,
                maxHeight: 500,
                marginTop: 0
            }
        }}
            keepMounted >
            <div id="dialogDlt">
                <p id="dltHead">Delete Note</p>
                <p id="dltContent">This can’t be undone and it will be permanently deleted.</p>
                <button id="addNew" type="button" onClick={() => { handleDelete() }}>Delete</button>
            </div>
        </Dialog>

        {/* edit dialog */}
        <Dialog open={edit} onClose={() => { setEdit(false) }} PaperProps={{
            sx: {
                maxWidth: 600,
                maxHeight: 500,
                marginTop: 0
            }
        }}
            keepMounted >
            <div id="Dialog">
                <DialogTitle>Edit Note</DialogTitle>
                <form onSubmit={handleEdit} >
                    <pre>
                        <label for="title" className="label">Title:                   </label>
                        <input type="text" id="titleInput" placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                        <label for="desc" className="label">Description:     </label>
                        <textarea id="descInput" rows={4} placeholder="" value={desc} onChange={(e) => setDesc(e.target.value)} required={title.length < 10 ? true : false} /><br />
                    </pre>
                    <button type="submit" id="addNew">Edit</button>
                </form>
            </div>
        </Dialog>
        <ToastContainer />
    </>
}

export default Note