import { createStore } from "solid-js/store";
import { A } from "@solidjs/router";
import MenuBar from "~/components/MenuBar";
import { Match, Switch, createSignal } from "solid-js";


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

export default function Login(){
  const URL = "http://localhost:3009"
    let emailInput: any; let passwordInput:any;
    const [login, setLogin] = createStore<Login>({
        email: "", 
        pass: ""
    });
    const [error, setError] = createSignal<String>("")
  return(
    <div class="h-screen login">
      <MenuBar />
      <div class="w-full h-full grid  place-items-center bg-gray-700">
        <div class="flex flex-col rounded-lg bg-gray-300 items-center pb-8">
        <A href="/login"><p class="font-semibold text-l mt-8">Already have an account? Click here </p> </A>
            <input class="mx-16 mt-8 " type="text" placeholder="email"ref={emailInput} onInput={() => {
                setLogin("email", emailInput.value)
            }}></input>
          <input class="mx-16 my-8 grow" type="password" placeholder="password" ref={passwordInput} onInput={() => {
                setLogin("pass", passwordInput.value)
            }}></input>
          <button class="w-36 h-6 mb-15 rounded-sm bg-blue-200 text-neutral-800"onClick={async () => {
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
                    localStorage.setItem("noteNum", JSON.stringify({noteNum: 0}))
                  }
                  if (data.code){
                    setError(data.code)
                  } else {
                    setError("")
                    window.location.replace("http://localhost:3000")
                  }
                }).catch(err =>{
                  console.log(err.message)
                })
            }}> Sign Up with email </button> 
            <Switch fallback={<div></div>}>
              <Match when={error() === "exists"}>
                <p class="font-semibold mt-4">User already exists in database</p>
              </Match>
              <Match when={error() === "failed"}>
                <p class="font-semibold mt-4">Failed to create user in database. Please contact the owner of the site</p>
              </Match>
            </Switch>
        </div>
      </div>
    </div>
  )
}