import { Component } from 'solid-js';
import AddNote from '~/components/AddNote';
import Notes from '~/components/Notes';
import MenuBar from '~/components/MenuBar';

const index: Component = () => {
  return (
    <>
      <MenuBar />
      <div class="flex flex-row w-full justify-center mt-4">
        <AddNote />
      </div>
      <div class="w-full">
        <Notes />
      </div>
    </>
  )
}

export default index;