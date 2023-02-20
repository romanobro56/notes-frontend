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
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 10)
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
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
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