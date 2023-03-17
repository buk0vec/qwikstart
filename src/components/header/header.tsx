import { component$ } from "@builder.io/qwik";
import { useSession } from "~/routes/layout";
import { supabase } from "~/utils/supabaseClient";

/** Header component shown across all pages */
export default component$(() => {
  const sessionStore = useSession();

  return (
    <header class="flex flex-row justify-between mx-4 mt-4 content-baseline">
      <div class="logo">
        <a href="/" title="home" class="text-3xl text-black font-bold">
          Qwik SaaS Starter
        </a>
      </div>
      <nav>
        <ul class="flex flex-row gap-4 content-baseline align-bottom">
          {!sessionStore.value.session && (
            <>
              <li>
                <a href="/signup">Sign up</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </>
          )}
          {sessionStore.value.session && (
            <>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <button
                  onClick$={async () => {
                    // TODO: Graceful sign-out
                    await supabase.auth.signOut();
                    document.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
});
