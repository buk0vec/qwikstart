/*
  login/index.tsx
  The page where users can create an account
 */
import { component$, useTask$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  globalAction$,
  zod$,
  z,
  useNavigate,
  type RequestHandler,
} from "@builder.io/qwik-city";
import { supabaseServerClient } from "~/utils/supabaseServerClient";
import { supabase } from "~/utils/supabaseClient";
import { unauthedGuard } from "~/utils/guards";

// Redirect to dashboard if logged in
export const onRequest: RequestHandler = async (event) => {
  unauthedGuard(event, '/dashboard')
}

/**
 * Server-side action that validates sign-up data and creates a new account.
 */
export const useSignup = globalAction$(
  async (user) => {
    // Check restrictions
    if (user.password.length < 6) {
      return {
        success: false,
        reason: "Password must be at least 6 characters long",
      };
    }
    if (user.name.length < 1) {
      return {
        success: false,
        reason: "Name must be at least 1 character long",
      };
    }
    const signupResponse = await supabaseServerClient.auth.signUp({ email: user.email, password: user.password })
    if (signupResponse.error || signupResponse.data.user === null) {
      return {
        success: false,
        reason: signupResponse.error?.message ?? "An error has accured"
      }
    }
    const insertResponse = await supabaseServerClient.from('profiles').insert({
      id: signupResponse.data.user.id,
      name: user.name
    })

    if (insertResponse.error) {
      // remove newly created account before sending error response
      const res = await supabaseServerClient.auth.admin.deleteUser(signupResponse.data.user.id)
      console.log("Result >>> " + JSON.stringify(res))
      return {
        success: false,
        reason: insertResponse.error.message
      }
    }

    return {
      success: true,
      reason: "",
    };
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
);

export default component$(() => {
  const action = useSignup();
  const nav = useNavigate();

  /*
    Listen for successful signup to navigate.
    Currently doing this because Qwik doesn't typegen correctly when using redirect()
    on server side.
  */
  useTask$(async ({ track }) => {
    track(() => action.value?.success);
    // If there was a successful login, log in client-side from previously submitted formData
    if (action.value?.success) {
      // TODO: replace "as" with better validation
      const email = action.formData?.get('email') as string | undefined;
      const password = action.formData?.get('password') as string | undefined;
      if (email === undefined || password === undefined) {
        // TODO: handle error
        console.log("somehow missing formdata")
        return
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      // TODO: handle error better
      if (error) {
        console.log(error)
        return
      }
      nav("/dashboard");
    }
  });

  return (
    <div class="m-4">
      <h1 class="font-semibold text-4xl text-center mb-4">
        Sign up for Qwik SaaS Starter
      </h1>
      <Form action={action} class="flex flex-col items-center">
        <label for="name" class="mb-4">
          Name
          <input
            type="text"
            name="name"
            placeholder="Qwik Dev"
            class="rounded-md block"
            value={action.formData?.get("name")}
            required={true}
          />
        </label>
        <label for="email" class="mb-4">
          Email
          <input
            type="email"
            name="email"
            placeholder="qwik@me.com"
            class="rounded-md block"
            value={action.formData?.get("email")}
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
          <button class="btn btn-filled-primary w-min">Login</button>
        </div>
      </Form>
      {action.value?.success === false && (
        <p class="text-center text-red-600">{action.value?.reason}</p>
      )}
      {action.value?.success === true && (
        <p class="text-center ">Success! Redirecting...</p>
      )}
    </div>
  );
});

/** Meta */
export const head: DocumentHead = {
  title: "Sign Up",
  meta: [
    {
      name: "description",
      content: "Sign up page",
    },
  ],
};
