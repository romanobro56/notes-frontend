import { createSignal, createEffect } from "solid-js";
import { createCookieSessionStorage, useParams, useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import MenuBar from "~/components/MenuBar";
import { getUser } from "~/db/controllers/user";

export function routeData(){
  return createServerData$(async (_, { request }) =>{
    if (await getUser(request)) {
      throw redirect("/")
    }
    return {};
  })
}

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export default function Login(){
  const data = useRouteData<typeof routeData>()
  const params = useParams()

  return(
    <div class="h-screen login">
      <MenuBar />
      <div class="w-full h-full grid  place-items-center bg-gray-700">
        <div class="flex flex-col rounded-lg bg-gray-300 items-center">
          <input class="mx-16 mt-8 " type="text" placeholder="email"> </input>
          <input class="mx-16 my-8 grow" type="password" placeholder="password"></input>
          <button class="w-16 h-6 mb-6 rounded-sm bg-gunmetal text-neutral-200"> login </button> 
        </div>
      </div>
    </div>
  )
}