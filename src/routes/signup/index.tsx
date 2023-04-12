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
  type RequestHandler,
  useNavigate,
} from "@builder.io/qwik-city";
import { supabaseServerClient } from "~/utils/supabaseServerClient";
import { supabase } from "~/utils/supabaseClient";
import { unauthedGuard } from "~/utils/guards";
import Header from "~/components/header/header";
import zod from 'zod';

// Redirect to dashboard if logged in
export const onRequest: RequestHandler = async (event) => {
  unauthedGuard(event, "/dashboard");
};

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
    const signupResponse = await supabaseServerClient.auth.signUp({
      email: user.email,
      password: user.password,
    });
    if (signupResponse.error || signupResponse.data.user === null) {
      return {
        success: false,
        reason: signupResponse.error?.message ?? "An error has accured",
      };
    }
    const insertResponse = await supabaseServerClient.from("profiles").insert({
      id: signupResponse.data.user.id,
      name: user.name,
    });

    if (insertResponse.error) {
      // remove newly created account before sending error response
      await supabaseServerClient.auth.admin.deleteUser(
        signupResponse.data.user.id
      );
      return {
        success: false,
        reason: insertResponse.error.message,
      };
    }
    return {
      success: true,
      reason: ""
    }
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
    Listen for successful signup to log in and navigate.
  */
  useTask$(async ({ track }) => {
    track(() => action.value?.success);
    // If there was a successful login, log in client-side from previously submitted formData
    console.log("TRACKED ACTION VALUE: ", action.value?.success)
    if (action.value?.success && action.formData) {
      const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6)
      })
      const form = Object.fromEntries(action.formData)
      const parsed = schema.safeParse(form)
      if (!parsed.success) {
        action.value.reason = "Failed to log in. Try logging in manually"
        return;
      }
      const { email, password } = parsed.data;
      console.log(email, password)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        action.value.reason = "Failed to log in. Try logging in manually"
        return;
      }
      nav("/dashboard");
    }
  });

  return (
    <>
      <Header />
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
            <button class="btn btn-filled-primary">Create Account</button>
          </div>
        </Form>
        {action.value?.success === false && (
          <p class="text-center text-red-600">{action.value?.reason}</p>
        )}
        {action.value?.success === true && (
          <p class="text-center ">Success! Redirecting...</p>
        )}
      </div>
    </>
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
