import { Component, createSignal} from 'solid-js';
import {notes, setNotes} from './Notes'

export type Note = {
    text: string,
    color: string
    id: string
}

const NoteCard: Component<{text: string, color: string, id: string}> = (props) => {
    const [color, setColor] = createSignal(props.color)
    const [text, setText] = createSignal(props.text)
    const id = props.id
    function removeIndex<T>(array: readonly T[], index: number): T[] {
      return [...array.slice(0, index), ...array.slice(index + 1)];
    }    
    return (
        <div class={"bg-" + color() + "-400 rounded-sm my-3 text-md font-mono w-min min-w-fit"}>
            <h2 class="m-2 w-56 text-center">{text()}</h2>
            <div class="grid grid-flow-row">
              <button class="bg-green-500 rounded-sm shadow-sm shadow-green-800 m-3"onClick={() => {
                setColor("green");
                }}>
                  <h1 class="m-0.5">change to green</h1>
              </button>
              <button class="bg-yellow-400 rounded-sm shadow-sm shadow-yellow-800 m-3"onClick={() => {
                setText("this now a short note");
                }}>
                  <h1 class="m-0.5">change text to short</h1>
              </button>
              <button class="bg-red-400 rounded-sm shadow-sm shadow-yellow-800 m-3"onClick={() => {
                console.log(notes().findIndex(note => note.id === id))
                setNotes(removeIndex(notes(), notes().findIndex(notes => notes.id === id)))
                }}>
                  <h1 class="m-0.5">change text to short</h1>
              </button>
            </div>
        </div>
    )
}

export default NoteCard;