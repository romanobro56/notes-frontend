import { createSignal, createEffect } from "solid-js";
import { createCookieSessionStorage } from "solid-start";
import MenuBar from "~/components/MenuBar";


const login = () => {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    createEffect(() =>{
        console.log(email() + " " + password());
    });
    return (
      <>
      </>
    )
}

export default login;