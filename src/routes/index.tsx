import { Component } from 'solid-js';
import AddNote from '~/components/AddNote';
import Notes from '~/components/Notes';

const index: Component = () => {
  return (
    <div>
      <div class="flex flex-row w-full justify-center my-8">
        <AddNote />
      </div>
      <div class="w-full">
        <Notes />
      </div>
    </div>
  )
}

export default index;