import { Component } from 'solid-js';

const MenuBar: Component = () => {
  return (
    <div class="w-screen h-12 bg-gray-600 flex flex-row justify-around">
      <button class="rounded-md text-gray-200 hover:bg-gray-800 h-8 w-16 mt-2">About</button>
      <button class="rounded-md text-gray-200 hover:bg-gray-800 h-8 w-16 mt-2">Home</button>
      <button class="rounded-md text-gray-200 hover:bg-gray-800 h-8 w-20 mt-2">Account</button>
    </div>
  )
}

export default MenuBar;