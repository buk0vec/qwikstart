import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  globalAction$,
  zod$,
  z,
} from "@builder.io/qwik-city";

export const useLogin = globalAction$(
  (user, { fail }) => {
    if (user.email === "foo@bar.com" && user.password === "foobar") {
      return {
        success: true,
      };
    } else {
      return fail(401, {
        success: false,
        reason: "Invalid email and/or password",
      });
    }
  },
  zod$({
    email: z.string(),
    password: z.string(),
  })
);

export default component$(() => {
  const action = useLogin();
  return (
    <div class="m-4">
      <h1 class="font-semibold text-4xl text-center mb-4">Login to Qwik SaaS Starter</h1>
      <Form action={action} class="flex flex-col items-center">
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
      {action.status === 401 && (
        <p class="text-center text-red-600">{action.value?.reason}</p>
      )}
      {action.value?.success === true && (
        <p class="text-center ">Success! Logging in...</p>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login page",
    },
  ],
};
