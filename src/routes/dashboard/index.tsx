/**
 * dashboard/index.tsx
 * A normal user's dashboard page.
 */

import { component$ } from "@builder.io/qwik";
import { useUserData } from "./layout";

export default component$(() => {
  const query = useUserData();

  return (
    <div class='overflow-y-scroll h-screen w-full'>
      <header class="h-[64px] border-b border-zinc-400 flex items-center px-4">
        <h1 class="font-semibold text-3xl tracking-tight">Dashboard</h1>
      </header>
      <div class="mx-4 mt-4">
        <h2 class='text-4xl'>Hello, <b>{query.value?.data?.name}</b></h2>
      </div>
    </div>
  );
});
