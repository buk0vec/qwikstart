import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import Header from "../components/header/header";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const serverTime = useServerTimeLoader();
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <hr class="my-2" />
      <footer class="mx-4">
        <a
          href="https://github.com/buk0vec"
          target="_blank"
          class="font-light text-neutral-600"
        >
          Created by buk0vec and the open source community.
          <div>{serverTime.value.date}</div>
        </a>
      </footer>
    </>
  );
});
