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
} from "@builder.io/qwik-city";

/**
 * Server-side action that validates sign-up data and creates a new account.
 */
export const useSignup = globalAction$(
  (user) => {
    if (user.password.length < 6) {
      return {
        success: false,
        reason: "Password must be at least 6 characters long",
      };
    }
    return {
      success: true,
      reason: "",
    };
  },
  zod$({
    name: z.string(),
    email: z.string(),
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
  useTask$(({ track }) => {
    track(() => action.value?.success);
    if (action.value?.success) {
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
