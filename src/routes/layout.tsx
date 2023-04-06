import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "~/utils/supabase.types";

export const onRequest: RequestHandler = async ({ sharedMap, cookie }) => {
  const supabaseClient = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
    }
  );

  const refreshToken = cookie.get("my-refresh-token");
  const accessToken = cookie.get("my-access-token");

  if (refreshToken && accessToken) {
    // TODO: error handle for when this fails. probably wipe cookies.
    await supabaseClient.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });
  }
  sharedMap.set("supabase", supabaseClient);
  // TODO: get this value w/ error handling
  sharedMap.set(
    "session",
    (await supabaseClient.auth.getSession()).data.session
  );
};

export const useSession = routeLoader$(async ({ sharedMap }) => {
  return { session: sharedMap.get("session") };
});

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});
