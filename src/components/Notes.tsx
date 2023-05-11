import { Component, createSignal, onMount, For } from "solid-js";
import NoteCard, { Note } from './NoteCard'

export const [notes, setNotes] = createSignal([] as Note[]);

const Notes: Component = () => {
  onMount(async () => {
    if(localStorage.getItem("token")){
      const token = localStorage.getItem("token")
      await fetch("http://localhost:3009/notes", {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        redirect: "follow"
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setNotes([])
        for(var i=0;i<data.length;i++){
          let note = {
            text: data[i].contents,
            color: data[i].color,
            id: data[i].number
          }
          console.log("adding note")
          setNotes([note, ...notes()]);
        }
      })
    }
  });
  const [columns, setColumns] = createSignal("")
  return (
    <div class="m-5 col-gap">
        <For each={notes()}>{(note, i) =>
            <NoteCard text={note.text} color={note.color} id={note.id} />}
        </For>
    </div>
  )
}

export default Notes