import { Component, createSignal, onMount, For } from "solid-js";
import NoteCard, { Note } from './NoteCard'

export const [notes, setNotes] = createSignal([] as Note[]);

const Notes: Component = () => {
    const breakpoints = [
        { px: 236, columns: "columns-1" },
        { px: 572, columns: "columns-2" },
        { px: 808, columns: "columns-3" },
        { px: 1044, columns: "columns-4" },
        { px: 1280, columns: "columns-5" },
        { px: 1516, columns: "columns-6" },
        { px: 1752, columns: "columns-7" },
    ]
    const [columns, setColumns] = createSignal("")
    const noteColors = ["bg-blue-400", "bg-red-400", "bg-green-400", "bg-yellow-400", "bg-gray-400"];
    const noteTexts = [
        "this is a short text",
        "this is a medium text. A short description that the user would input",
        "this is a long text. I dont know why anyone would want to write a note this long, but we must cover all use cases. AAAAAAAAAAAAAAAAAAAA! open source more like source"
    ]
    onMount(() => {
        for (var i=0;i<10;i++){
            let note = {
                text: noteTexts[Math.floor(Math.random()*noteTexts.length)],
                color: noteColors[Math.floor(Math.random()*noteColors.length)],
                id: Math.random().toString(36).slice(2, 13)
            }
            setNotes([note, ...notes()]);
        }
        calculateColumns()
    });
    window.addEventListener('resize', async () => {
        await calculateColumns()
    });
    function calculateColumns() {
        let width = window.innerWidth
        console.log(width)
        console.log(breakpoints.length)
        for(let i=0;i++;i<breakpoints.length) {
            console.log(breakpoints[i].px)
            console.log(i)
            if(breakpoints[i].px < width){
                console.log(breakpoints[i].px)
                console.log(breakpoints[i].columns)
                setColumns(breakpoints[i].columns)
                return
            }
        }
    }
  return (
    <div class={"mx-5 " + columns()}>
        <For each={notes()}>{(note, i) =>
            <NoteCard text={note.text} color={note.color} id={note.id} />}
        </For>
    </div>
  )
}

export default Notes