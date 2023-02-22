import { Component, createSignal, createEffect} from 'solid-js';
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
        <div class={color() +" rounded-sm m-2 p-2 text-md font-mono w-min min-w-fit min-h-fit"}>
            <textarea style="resize:none" class="m-2 w-56 text-center min-h-fit" value={text()}
              onFocusOut={(e) =>{
                setText(e.currentTarget.value || "")
              }} />
            <div class="grid grid-flow-row">
              <button class="bg-green-500 rounded-sm shadow-sm shadow-green-800 m-3"
                onClick={() => {
                  setColor("bg-green-800");
                }}>
                <h1 class="m-0.5">change to green</h1>
              </button>
              <button class="bg-yellow-400 rounded-sm shadow-sm shadow-yellow-800 m-3"
                onClick={() => {
                  setText("this now a short note");
                }}>
                <h1 class="m-0.5">change text to short</h1>
              </button>
              <button class="bg-red-400 rounded-sm shadow-sm shadow-yellow-800 m-3"
                onClick={() => {
                  console.log(notes().findIndex(note => note.id === id))
                  setNotes(removeIndex(notes(), notes().findIndex(notes => notes.id === id)))
                }}>
                <h1 class="m-0.5">delete note</h1>
              </button>
            </div>
        </div>
    )
}

export default NoteCard;