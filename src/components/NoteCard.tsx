import { Component, createSignal, onMount } from 'solid-js';
import { notes, setNotes } from './Notes'

export type Note = {
  text: string,
  color: string
  id: string
}

function getMultilineStringHeight(str: string) {
  var el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.visibility = 'false';
  el.style.width = '224px';
  el.style.height = 'auto';
  el.style.fontSize = '1rem';
  el.style.lineHeight = '1.5rem';
  el.style.whiteSpace = 'normal';
  el.style.textAlign = "center"
  el.style.font = "menlo"
  el.innerHTML = str;
  document.body.appendChild(el);
  var height = el.offsetHeight;
  document.body.removeChild(el);
  return height;
}

export function removeIndex<T>(array: readonly T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

const NoteCard: Component<{ text: string, color: string, id: string }> = (props) => {
  const [color, setColor] = createSignal(props.color)
  const [text, setText] = createSignal(props.text)
  const id = props.id
  const [scrollHeight, setScrollHeight] = createSignal<number>(document.getElementById(id)?.scrollHeight || 48)
  onMount(()=>{
    setScrollHeight(getMultilineStringHeight(text()))
  })
  return (
    <div class={color() + " rounded-sm p-2 text-md w-full h-max box-border inline-block break-inside-avoid note"}>
      <textarea id={id} class={"note-text m-1 w-56 text-center min-h-min rounded-sm " + color()} 
        onInput={(e) =>{
          setScrollHeight(getMultilineStringHeight(e.currentTarget.value))
          console.log(scrollHeight())
        }}
        value={text()}
        onFocusOut={(e) => {
          setText(e.currentTarget.value)
        }}
        style={{
          "resize": "none",
          "height": `${scrollHeight()}px`,
          "overflow": "hidden",
          "min-height": "24px",
          "font": "menlo"
        }}
        placeholder="Empty Note"
      />
      <div class="flex flex-col note-buttons">
        <div class="flex flex-row space-x-6 self-center">
          <button class="bg-red-400 rounded-full w-3 h-3 border-2 border-white border-spacing-4"
            onClick={() => {
              setColor("bg-red-400")
            }}
           />
          <button class="bg-blue-400 rounded-full w-3 h-3 border-2 border-white border-spacing-4"
            onClick={() => {
              setColor("bg-blue-400")
            }}
          />   
          <button class="bg-orange-400 rounded-full w-3 h-3 border-2 border-white border-spacing-4"
            onClick={() => {
              setColor("bg-orange-400")
            }}
          /> 
          <button class="bg-purple-400 rounded-full w-3 h-3 border-2 border-white border-spacing-4"
            onClick={() => {
              setColor("bg-purple-400")
            }}
          /> 
          <button class="bg-gray-400 rounded-full w-3 h-3 border-2 border-white border-spacing-4"
            onClick={() => {
              setColor("bg-gray-400")
            }}
          /> 
        </div>
        <button class="bg-red-400 self-center rounded-sm shadow-sm w-48 shadow-yellow-800 m-3"
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