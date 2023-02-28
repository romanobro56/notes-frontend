import { Component } from 'solid-js';

const Login: Component = () => {
    return (
        <div class="flex flex-col rounded-lg bg-gray-300 items-center">
            <input class="mx-16 mt-8 " type="text" placeholder="email" ></input>
            <input class="mx-16 my-8 grow" type="password" placeholder="password" ></input>
            <button class="w-16 h-6 mb-6 rounded-sm bg-gunmetal text-neutral-200" > login </button> 
        </div>
    )
}

export default Login;