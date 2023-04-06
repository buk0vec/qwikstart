import { component$ } from "@builder.io/qwik";
import { useSession } from "~/routes/layout";
import { supabase } from "~/utils/supabaseClient";

/** Header component shown across all pages */
export default component$(() => {
  const sessionStore = useSession();

  return (
    <header class="sticky left-0 right-0 top-0 z-50">
      <div class="flex flex-row justify-between items-center py-2 px-4 border-b-2 backdrop-blur-md">
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
      </div>
    </header>
  );
});
