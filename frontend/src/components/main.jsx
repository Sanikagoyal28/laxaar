import { useDispatch, useSelector } from "react-redux"
import Note from "./note"
import { useEffect, useState } from "react";
import { AddNoteThunk, GetNoteThunk } from "../redux/noteSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootstrap from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import './styles.css'

function Main() {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [count, setCount] = useState(0)
    const [desc, setDesc] = useState('')
    const [open, setOpen] = useState(false)
    const loading = useSelector((r) => r.loading)
    const notes = useSelector((r) => r.notes)

    const [note, setNote] = useState([])
    useEffect(() => {
        dispatch(GetNoteThunk())
    }, [])

    useEffect(() => {
        setNote(notes)
    }, [notes])

    useEffect(() => {
        setCount(desc.length)
    }, [desc])

    function handleAdd(e) {
        e.preventDefault()
        const data = {
            title,
            'description': desc
        }

        dispatch(AddNoteThunk(data))
            .then((res) => {
                if (res.payload.data.success) {
                    toast.success(res.payload.data.msg, {
                        position: "top-right",
                        theme: "light",
                        autoClose: 5000,
                    });
                    setOpen(false)
                    setTitle('')
                    setDesc('')

                    const newNote = {
                        title: title,
                        description: desc,
                        id: 1
                    }
                    setNote([newNote, ...note])
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

    useEffect(() => {
        if (loading) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    return <>
        <div className="background">
            <div className="flex">
                <p className="head">All notes</p>
                <button className="add" onClick={() => { setOpen(true) }}>Add note</button>
            </div>

            <div className="noteFlex">
                {note.length > 0 ? note.map((n, index) => {
                    return <Note title={n.title} desc={n.description} id={n._id} index={index} />
                }) : null}
            </div>
        </div>

        <Dialog open={open} onClose={() => { setOpen(false) }} PaperProps={{
            sx: {
                maxWidth: 1000,
                marginTop: 0
            }
        }}
            keepMounted >
            <div id="Dialog">
                <DialogTitle>Add New Note</DialogTitle>
                <form onSubmit={handleAdd} >
                    <pre>
                        <label for="title" className="label">Title:                   </label>
                        <input type="text" id="titleInput" placeholder="Enter title of note" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                        <label for="desc" className="label">Description:     </label>
                        <textarea id="descInput" rows={4} maxLength={120} placeholder="Type something here" value={desc} onChange={(e) => setDesc(e.target.value)} required={title.length < 10 ? true : false} /><br />
                    </pre>
                    <p className="count">{count}/120</p>
                    <button type="submit" id="addNew">Add</button>
                </form>
            </div>
            <ToastContainer />
        </Dialog>
        <ToastContainer />
        {loading ? <ReactBootstrap.Spinner animation="border" variant="light" id="Spinner" /> : null}
    </>
}

export default Main