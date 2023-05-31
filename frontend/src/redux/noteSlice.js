import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Baseurl from "./Baseurl";
import axios from "axios";

const initialState = {
    loading: false,
    notes: [],
    msg: ''
}

const AddNoteThunk = createAsyncThunk("add_notes", async (data) => {
    return await axios.post("http://localhost:3000/create_note", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const EditNoteThunk = createAsyncThunk("edit_notes", async (data) => {
    return await axios.post("http://localhost:3000/edit_note", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const DltNoteThunk = createAsyncThunk("delete_notes", async (id) => {
    return await axios.delete(`http://localhost:3000/delete_note/${id}`)
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((Err) => {
            console.log(Err)
            return Err
        })
})

const GetNoteThunk = createAsyncThunk("all_notes", async () => {
    return await axios.get("http://localhost:3000/get_note")
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err
        })
})

const NoteSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        dltNote: (state, action) => {
            state.notes = state.notes.filter((s) => { return s._id != action.payload.id })
        },
        editNote: (state, action) => {
            console.log(action)
            const note = state.notes.findIndex((n) => n._id == action.payload._id)
            state.notes[note] = action.payload
            // state.notes = state.notes.filter(())
        }
    },
    extraReducers: (builder) => {

        builder.addCase(AddNoteThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(AddNoteThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
        })
        builder.addCase(AddNoteThunk.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(DltNoteThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(DltNoteThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
        })
        builder.addCase(DltNoteThunk.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(EditNoteThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(EditNoteThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
        })
        builder.addCase(EditNoteThunk.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(GetNoteThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(GetNoteThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = action.payload.data.notes
        })
        builder.addCase(GetNoteThunk.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default NoteSlice

export { AddNoteThunk, EditNoteThunk, DltNoteThunk, GetNoteThunk }

export const { dltNote, editNote } = NoteSlice.actions