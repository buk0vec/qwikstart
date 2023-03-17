import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { createClient } from '@supabase/supabase-js'

import Header from "../components/header/header";
import type { Database } from "~/utils/supabase.types";

export const onRequest: RequestHandler = (async ({ sharedMap, cookie }) => {
  const supabaseClient = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false
    }
  })

  const refreshToken = cookie.get("my-refresh-token");
  const accessToken = cookie.get("my-access-token");

  if (refreshToken && accessToken) {
    // TODO: error handle for when this fails. probably wipe cookies.
    await supabaseClient.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });
  }
  sharedMap.set('supabase', supabaseClient)
  // TODO: get this value w/ error handling
  sharedMap.set('session', (await supabaseClient.auth.getSession()).data.session)
})

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useSession = routeLoader$(async ({ sharedMap }) => {
  return { session: sharedMap.get('session') }
})

export default component$(() => {
  const serverTime = useServerTimeLoader();
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <hr class="my-2" />
      <footer class="mx-4">
        <a
          href="https://github.com/buk0vec"
          target="_blank"
          class="font-light text-neutral-600"
        >
          Created by buk0vec and the open source community.
          <div>{serverTime.value.date}</div>
        </a>
      </footer>
    </>
  );
});
