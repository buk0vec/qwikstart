import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "~/utils/supabase.types";

export const onRequest: RequestHandler = async ({ sharedMap, cookie }) => {
  // TODO: clean up env variable checking for dev vs prod
  const supabaseClient = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
    }
  );

  const refreshToken = cookie.get("my-refresh-token");
  const accessToken = cookie.get("my-access-token");


  if (refreshToken && accessToken) {
    const { error } = await supabaseClient.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });
    // delete bad cookies on error
    if (error) {
      cookie.delete("my-refresh-token")
      cookie.delete("my-access-token")
    }
  }
  sharedMap.set("supabase", supabaseClient);
  /** get the session. if there's a gotrue error, we ignore it b/c session should be null anyways */
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
