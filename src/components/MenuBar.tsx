import { Component } from 'solid-js';
import { A } from 'solid-start';

const MenuBar: Component = () => {
  return (
    <div class="w-screen h-12 bg-gray-600 flex flex-row justify-around">
      <A href="/about"><button class="rounded-md text-gray-200 hover:bg-gray-800 h-8 w-16 mt-2">
        About</button></A>
      <A href="/"><button class="rounded-md text-gray-200 hover:bg-gray-800 h-8 w-16 mt-2">
        Home</button></A>
      <A href="/login"><button class="rounded-md text-gray-200 hover:bg-gray-800 h-8 w-20 mt-2">
        Account</button></A>
    </div>
  )
}

export default MenuBar;