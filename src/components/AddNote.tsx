import { Component, createSignal } from 'solid-js';
import {notes, setNotes} from './Notes'

const AddNote: Component = () => {
    const [noteInput, setNoteInput ] = createSignal("")
    const [noteColor, setNoteColor] = createSignal("")
    const submitNote = (noteText: string, color: string) =>{
        setNotes(
            [{
                text: noteText,
                color: color,
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 16)
            }, ...notes()]
        )
    }
    return (
        <div>
            <input type='text' placeholder='Add Note...' 
                value={noteInput()} 
                onInput={(e) => setNoteInput(e.currentTarget.value)}>
            </input>
            <select name="color select" value={noteColor()} onInput={e => setNoteColor(e.currentTarget.value)
            }>
                <option value="bg-green-400">Green</option>
                <option value="bg-blue-400">Blue</option>
                <option value="bg-red-400">Red</option>
                <option value="bg-yellow-400">Yellow</option>
            </select>
            <button onClick={() => {
                submitNote(noteInput(),noteColor())
            }}>
                Submit Note
            </button>
        </div>
    )
}

export default AddNote;