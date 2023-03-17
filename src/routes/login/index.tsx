/*
  login/index.tsx
  The page for users to log in
 */

import { component$, $, useStore } from "@builder.io/qwik";
import { type RequestHandler, type DocumentHead } from "@builder.io/qwik-city";
import { unauthedGuard } from "~/utils/guards";
import { supabase } from "~/utils/supabaseClient";

export const onRequest: RequestHandler = async (event) => {
  // Redirect to dashboard if logged in
  unauthedGuard(event, '/dashboard')
}


export default component$(() => {
  const status = useStore<{
    valid?: boolean;
    message?: string;
    loading: boolean;
  }>({
    valid: undefined,
    message: undefined,
    loading: false,
  });

  /** Event handler for login submit. */
  const useLogin = $(async (event: any) => {
    status.loading = true;
    const email = event.target.email.value as string;
    const password = event.target.password.value as string;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      status.valid = false;
      status.message = error.message;
    } else {
      status.valid = true;
      document.location.href = "/dashboard";
    }
    status.loading = false;
  });

  return (
    <div class="m-4">
      <h1 class="font-semibold text-4xl text-center mb-4">
        Login to Qwik SaaS Starter
      </h1>
      <form
        preventdefault:submit
        onSubmit$={useLogin}
        class="flex flex-col items-center"
      >
        <label for="email" class="mb-4">
          Email
          <input
            type="email"
            name="email"
            placeholder="qwik@me.com"
            class="rounded-md block"
            required={true}
          />
        </label>
        <label for="password" class="mb-4">
          Password
          <input
            type="password"
            name="password"
            placeholder="•••••••"
            class="rounded-md block"
            required={true}
          />
        </label>
        <div class="flex flex-row gap-4 justify-center">
          <button
            class="btn btn-filled-primary w-min"
            disabled={status.loading}
          >
            Login
          </button>
        </div>
      </form>
      {status.valid === false && (
        <p class="text-center text-red-600">{status.message}</p>
      )}
      {status.valid === true && (
        <p class="text-center ">Success! Logging in...</p>
      )}
    </div>
  );
});

/** Meta */
export const head: DocumentHead = {
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login page",
    },
  ],
};
