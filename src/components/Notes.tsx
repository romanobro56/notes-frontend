import { Component, createSignal, onMount, For } from "solid-js";
import NoteCard, { Note } from './NoteCard'


export const [notes, setNotes] = createSignal([] as Note[]);

const Notes: Component = () => {
    const noteColors = ["blue", "red", "green", "yellow", "gray"];
    const noteTexts = [
        "this is a short text",
        "this is a medium text. A short description that the user would input",
        "this is a long text. I dont know why anyone would want to write a note this long, but we must cover all use cases."
    ]
    onMount( () => {
        for (var i=0;i<10;i++){
            let note = {
                text: noteTexts[Math.floor(Math.random()*noteTexts.length)],
                color: noteColors[Math.floor(Math.random()*noteColors.length)],
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 10)
            }
          setNotes([note, ...notes()]);
      }
      console.log(notes());
  });
  return (
      <div class="grid grid-cols-4 auto-cols-auto mx-5">
          <For each={notes()}>{(note, i) =>
                  <NoteCard text={note.text} color={note.color} id={note.id} />
          }</For>
      </div>
  )
}

export default Notes