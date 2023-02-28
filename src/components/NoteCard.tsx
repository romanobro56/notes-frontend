import { Component, createSignal, onMount } from 'solid-js';
import { notes, setNotes } from './Notes'

export type Note = {
  text: string,
  color: string
  id: string
}
// Note: the elements needed to be able to display note on screen
// text, color and id are destructured as props

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
// gets the height of the note's inner text by creating an invisible 
// div and getting the height of that div with the text inside

export function removeIndex<T>(array: readonly T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
// removes item at index of array of type any by returning new array

const NoteCard: Component<{ text: string, color: string, id: string }> = (props) => {
  const [color, setColor] = createSignal(props.color)
  const [text, setText] = createSignal(props.text)
  const id = props.id
  //all props destructured as signals except for id, as it is read only
  //note: color must be represented as the whole tailwind background color syntax, ex:
  //"bg-red-400", or "bg-slate-800"
  //because if you try and chop it into pieces for simpler code, tailwind will not update

  const [noteVisibility, setNoteVisibility] = createSignal("visible")
  const [confirmVisibility, setConfirmVisibility] = createSignal("hidden")
  //initialize the display trait of the note and the "confirm note deletion" popup

  const [scrollHeight, setScrollHeight] = createSignal<number>(getMultilineStringHeight(text()) || 48)
  //set the height of the editable text box
  //this needs to be done because the text box does not auto resize but rather wants to scroll

  return (
    <div class={color() + " rounded-sm p-2 text-md w-full h-max box-border inline-block break-inside-avoid note"}>
      <div class={"note-container " + noteVisibility()}>
        <textarea id={id} class={"note-text m-1 w-56 text-center min-h-min rounded-sm " + color()} 
          onInput={(e) =>{
            setScrollHeight(getMultilineStringHeight(e.currentTarget.value))
          }}
          //sets the height of the input as you are typing for better experience

          value={text()}
          onFocusOut={(e) => {
            setText(e.currentTarget.value)
          }}
          //must only set the text signal on focus out because the value of the input is the text
          //if the text is changed while typing, the cursor will move making it impossible to type

          style={{
            "resize": "none",
            "height": `${scrollHeight()}px`,
            "overflow": "hidden",
            "min-height": "24px",
            "font": "menlo"
          }}
          //the styles must be set directly otherwise the tailwind default values take over
          //those values will interfere with the calculation of the text height
          //no, I do not know why resize and overflow matter but they do

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
              setNoteVisibility("hidden")
              setConfirmVisibility("visible") 
            }}
            //delete button just replaces note with confirm delete screen
          >
            <h1 class="m-0.5">delete note</h1>
          </button>
        </div>
      </div>
      <div class={"deleteConfirmation " + confirmVisibility()}>
        <button class="bg-red-400 self-center rounded-sm shadow-sm w-48 shadow-yellow-800 m-3"
            onClick={() => {
              console.log(notes().findIndex(note => note.id === id))
              setNotes(removeIndex(notes(), notes().findIndex(notes => notes.id === id)))
            }}
            //when clicked, deletes the note from the list of notes and removes from screen
        >
            <h1 class="m-0.5">Yes, delete</h1>
        </button>
        <button class="bg-green-400 self-center rounded-sm shadow-sm w-48 shadow-green-800 m-3"
            onClick={() => {
              setNoteVisibility("visible")
              setConfirmVisibility("hidden") 
            }}
            //nevermind button gives user chance to correct mistakenly deleted notes
        >
            <h1 class="m-0.5">Nevermind!</h1>
        </button>
      </div>
    </div>
  )
}

export default NoteCard;