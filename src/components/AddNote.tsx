import { Component, createSignal, onMount } from 'solid-js';
import {notes, setNotes} from './Notes'

const AddNote: Component = () => {
    const [noteInput, setNoteInput ] = createSignal("")
    const [noteColor, setNoteColor] = createSignal("")
    const [emptyNoteWarning, setEmptyNoteWarning] = createSignal("")
    const submitNote = async (noteText: string, color: string) =>{
        const token = localStorage.getItem("token")
        await fetch("http://localhost:3009/users/getUser", {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            redirect: "follow"
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("noteNum", JSON.stringify({noteNum: data.noteNum}))
        })
        setNotes(
            [{
                text: noteText,
                color: color,
                id: JSON.parse(localStorage.getItem("noteNum"))
            }, ...notes()]
        )
        await fetch("http://localhost:3009/notes/createNote", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body:JSON.stringify({
                contents: noteText,
                color: color
            }),
            redirect: "follow"
        })
    }
    onMount(() =>{
        setNoteColor("bg-gray-300")
    })
    return (
        <div class="flex flex-col">
            <div class="flex flex-row border-2 border-black rounded-md py-1 px-2">
                <input type='text' class="outline-none" placeholder='Add Note...' 
                    value={noteInput()} 
                    onInput={(e) => {
                        setNoteInput(e.currentTarget.value)
                        if(e.currentTarget.value){
                            setEmptyNoteWarning("")
                        }
                }}>
                </input>
                <select name="color select" value={noteColor()} class={"rounded-md mr-1 " + noteColor()}
                    onInput={e => setNoteColor(e.currentTarget.value)
                }>  
                    <option class="bg-gray-300" value="bg-gray-300"> Select Color </option>
                    <option class="bg-green-400 rounded-sm" value="bg-green-400">Green</option>
                    <option class="bg-blue-400 rounded-sm" value="bg-blue-400">Blue</option>
                    <option class="bg-red-400 rounded-sm" value="bg-red-400">Red</option>
                    <option class="bg-yellow-400 rounded-sm" value="bg-yellow-400">Yellow</option>
                </select>
                <button class="rounded-md bg-slate-500 font-sans p-2 hover:bg-slate-700 hover:text-gray-200"
                    onClick={() => {
                        if(!noteInput()){
                            setEmptyNoteWarning("you must type a note to submit it!")
                            return
                        }
                        if(!noteColor()){
                            submitNote(noteInput(),"bg-gray-300")
                        } else {
                            submitNote(noteInput(),noteColor())
                        }
                }}>
                    Submit Note
                </button>
            </div>
            <div class="under h-6 text-center ">
                <p>{emptyNoteWarning()}</p>
            </div>
        </div>
    )
}

export default AddNote;