import { Component } from 'solid-js';
import MenuBar from '~/components/MenuBar';
 
 const about: Component = () => {
  return (
    <div>
      <MenuBar />
      <p class="text-center font-mono text-5xl mt-6 h-24">notes app</p>
      <p class="text-center font-thin text-xl mt-4 h-32">yeah, that's about it.</p>
      <div class="flex flex-col w-full items-center">
        <div class="bg-slate-400 rounded-lg w-100 flex flex-col items-center mt-6">
          <p class="text-center font-normal text-2xl mt-2 mx-4">check out my Github profile here:</p>
          <a href="https://github.com/romanobro56">
            <img src="/minion-money.png" alt="profile here" class="rounded-full h-48 border-4 border-slate-800 my-4" />
          </a>
        </div>
      </div>
    </div>
  )
 }
 
 export default about;