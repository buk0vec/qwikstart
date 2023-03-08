import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <header class="flex flex-row justify-between mx-4 mt-4 content-baseline">
      <div class="logo">
        <a href="/" title="home" class="text-3xl text-black font-bold">
          Qwik SaaS Starter
        </a>
      </div>
      <nav>
        <ul class="flex flex-row gap-4 content-baseline align-bottom">
          <li>
            <a href="/signup">Sign up</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
});
