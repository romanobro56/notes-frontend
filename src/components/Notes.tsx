import { Component, createSignal, onMount, For } from "solid-js";
import NoteCard, { Note } from './NoteCard'

export const [notes, setNotes] = createSignal([] as Note[]);

const Notes: Component = () => {
    const noteColors = ["bg-blue-400", "bg-red-400", "bg-green-400", "bg-yellow-400", "bg-gray-400"];
    const noteTexts = [
        "this is a short text",
        "this is a medium text. A short description that the user would input",
        "this is a long text. I dont know why anyone would want to write a note this long, but we must cover all use cases. AAAAAAAAAAAAAAAAAAAA! open source more like source"
    ]
    onMount( () => {
        for (var i=0;i<10;i++){
            let note = {
                text: noteTexts[Math.floor(Math.random()*noteTexts.length)],
                color: noteColors[Math.floor(Math.random()*noteColors.length)],
                id: Math.random().toString(36).slice(2, 13)
            }
          setNotes([note, ...notes()]);
      }
  });
  return (
    <div class="mx-5 masonry-with-columns">
        <For each={notes()}>{(note, i) =>
            <NoteCard text={note.text} color={note.color} id={note.id} />}
        </For>
    </div>
  )
}

export default Notes