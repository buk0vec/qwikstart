import { Slot, component$ } from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  type RequestHandler,
  useLocation,
} from "@builder.io/qwik-city";
import { authedGuard } from "~/utils/guards";
import { supabase } from "~/utils/supabaseClient";

/** Make sure that users are authenticated. If they aren't then redirect to /login */
export const onRequest: RequestHandler = async (event) => {
  authedGuard(event, "/login");
};

export const useUserData = routeLoader$(async ({ sharedMap }) => {
  const req = await sharedMap
    .get("supabase")
    .from("profiles")
    .select("*")
    .maybeSingle();
  return req;
});

export default component$(() => {
  const { url } = useLocation();
  // TODO: Abstract out menu styles + underline
  return (
    <div class="flex h-screen">
      <aside class="w-[192px] shrink-0 bg-zinc-50 float-left h-screen z-50 border-zinc-400 border overflow-y-scroll">
        <ul class="pt-2">
          <Link href="/dashboard/">
            <li
              class={`p-2 m-2 text-lg rounded-md hover:bg-zinc-200 transition-colors ${
                url.pathname === "/dashboard/"
                  ? "underline underline-offset-2"
                  : ""
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/personal">
            <li
              class={`p-2 m-2 text-lg rounded-md hover:bg-zinc-200 transition-colors ${
                url.pathname.startsWith("/dashboard/personal/")
                  ? "underline underline-offset-2"
                  : ""
              }`}
            >
              Personal Info
            </li>
          </Link>
          <li
            class="p-2 m-2 text-lg rounded-md hover:bg-zinc-200 transition-colors cursor-pointer"
            onClick$={async () => {
              await supabase.auth.signOut();
              document.location.href = "/";
            }}
          >
            Sign Out
          </li>
        </ul>
      </aside>
      <Slot />
    </div>
  );
});
