import { A } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { createCookieSessionStorage, useParams, useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import MenuBar from "~/components/MenuBar";


function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}
type Login = {
  email: string,
  pass: string
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export default function Signup(){
  const URL = "http://localhost:3009"
    let emailInput: any; let passwordInput:any;
    const [login, setLogin] = createStore<Login>({
        email: "", 
        pass: ""
    });
  return(
    <div class="h-screen login">
      <MenuBar />
      <div class="w-full h-full grid  place-items-center bg-gray-700">
        <div class="flex flex-col rounded-lg bg-gray-300 items-center">
        <A href="/signup"><p class="font-semibold text-l mt-8">Need to make an account? Click here </p> </A>
          <input class="mx-16 mt-8 " type="text" placeholder="email"ref={emailInput} onInput={() => {
                setLogin("email", emailInput.value)
            }}></input>
          <input class="mx-16 my-8 grow" type="password" placeholder="password" ref={passwordInput} onInput={() => {
                setLogin("pass", passwordInput.value)
            }}></input>
          <button class="w-16 h-6 mb-6 rounded-sm bg-blue-100 text-neutral-700"onClick={async () => {
            console.log(JSON.stringify(login))
                const data = await fetch(URL + "/users/createUser", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(login),
                    redirect: "follow"
                })
                .then(response => response.json())
                .then(data => {
                  if (data.token){
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("noteNum", data.noteNum)
                    window.location.replace("http://localhost:3000")
                  }
                  console.log(data.message)
                }).catch(err =>{
                  console.log(err.message)
                })
            }}> login </button> 
        </div>
      </div>
    </div>
  )
}