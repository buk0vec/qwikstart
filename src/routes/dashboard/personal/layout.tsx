import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  // TODO: better menu abstraction
  const { url } = useLocation();
  return (
    <>
      <aside class="relative top-0 left-0 w-[192px] shrink-0 bg-zinc-50 h-screen float-left z-50 border-zinc-400 border border-l-0">
        <ul class="pt-2">
          <Link href="/dashboard/personal">
            <li
              class={`p-2 m-2 text-lg rounded-md hover:bg-zinc-200 transition-colors ${
                url.pathname === "/dashboard/personal/"
                  ? "underline underline-offset-2"
                  : ""
              }`}
            >
              Basic Information
            </li>
          </Link>
          <Link href="/dashboard/personal/payment">
            <li
              class={`p-2 m-2 text-lg rounded-md hover:bg-zinc-200 transition-colors ${
                url.pathname === "/dashboard/personal/payment/"
                  ? "underline underline-offset-2"
                  : ""
              }`}
            >
              Payment
            </li>
          </Link>
        </ul>
      </aside>
      <Slot />
    </>
  );
});
