/**
 * dashboard/index.tsx
 * A normal user's dashboard page.
 */

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useUserData = routeLoader$(async ({ sharedMap }) => {
  // TODO: make safe
  const data = await sharedMap.get('supabase').from('profiles').select('*').maybeSingle();
  return data.data
})

export default component$(() => {
  const query = useUserData();

  return (
    <div class="m-4">
      <h1 class="font-semibold text-2xl">Dashboard</h1>
      <p>Data: {query.value?.name}</p>
    </div>
  );
});
