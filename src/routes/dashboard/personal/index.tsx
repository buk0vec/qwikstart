import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { useUserData } from "../layout";
import { supabase } from "~/utils/supabaseClient";

export default component$(() => {
  const user = useUserData();
  const name = useSignal(user.value?.name);
  const nameInput = useSignal(user.value?.name);
  const showNameEdit = useSignal(false);

  useTask$(({ track }) => {
    track(() => user);
    name.value = user.value?.name;
  });

  const onNameChange = $(async () => {
    // TODO: Validate name better
    if (nameInput.value && nameInput.value.length > 0) {
      // TODO: validate operation
      await supabase
        .from("profiles")
        .update({ name: nameInput.value })
        .eq("id", user.value?.id);
      location.reload();
    }
  });

  return (
    <div class="overflow-y-scroll h-screen w-full">
      <header class="h-[64px] border-b border-zinc-400 flex items-center px-4">
        <h1 class="font-semibold text-3xl tracking-tight">
          Personal Information
        </h1>
      </header>
      <div class="mx-4 mt-4">
        <div class="border-2 border-black shadow-md rounded-md px-4 py-2">
          <div class="flex flex-row gap-4">
            <p class="text-2xl font-semibold">Name</p>
            <button
              class="border px-2 rounded-md hover:bg-violet-100 transition-colors border-black"
              onClick$={() => {
                nameInput.value = name.value;
                showNameEdit.value = !showNameEdit.value;
              }}
            >
              {showNameEdit.value ? "Cancel" : "Edit"}
            </button>
          </div>
          {!showNameEdit.value && <p class="text-xl">{name}</p>}
          {showNameEdit.value && (
            <div class="flex flex-row gap-4 my-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                class="rounded-md"
                bind:value={nameInput}
                required={true}
              />
              <button
                class="border px-2 rounded-md hover:bg-violet-100 transition-colors border-black"
                onClick$={onNameChange}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
