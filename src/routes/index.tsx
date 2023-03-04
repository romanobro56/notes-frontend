import { Component, Show } from 'solid-js';
import AddNote from '~/components/AddNote';
import Notes from '~/components/Notes';
import MenuBar from '~/components/MenuBar';
import { useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import { getUser } from '~/db/controllers/user';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await getUser(request)
    if(!user) throw redirect("/account")
    console.log(user)
    return user;
  })
}

const index: Component = () => {
  const user = useRouteData<typeof routeData>()
  return (
    <>
      <MenuBar />
        <Show when={user}>
          <div class="flex flex-row w-full justify-center mt-4">
            <AddNote />
          </div>
          <div class="w-full">
            <Notes />
          </div>
        </Show>
    </>
  )
}

export default index;