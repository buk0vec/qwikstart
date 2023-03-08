import { Slot, component$ } from "@builder.io/qwik";

interface StackBoxProps {
  title: string;
  content: string;
}

export default component$((props: StackBoxProps) => {
  return (
    <div class="border-4 rounded-md flex flex-col items-center max-w-sm p-4 hover:shadow hover:bg-blue-100 transition-colors">
      <div class="h-32 w-32 flex">
        <Slot />
      </div>
      <h3 class="text-lg font-semibold">{props.title}</h3>
      <p class="text-center">{props.content}</p>
    </div>
  );
});
