import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BuilderLogo } from "~/components/icons/builder";
import { QwikLogo } from "~/components/icons/qwik";
import { SupabaseLogo } from "~/components/icons/supabase";
import StackBox from "~/components/stack-box/stack-box";

export default component$(() => {
  return (
    <div class="mx-4">
      <h1 class="text-center font-extrabold tracking-tight text-6xl my-4">
        Make your new fast SaaS,&nbsp;<i>faster.</i>
      </h1>
      <p class="text-center text-xl mb-8">
        Qwik SaaS Starter leverages both bleeding-edge and battle-tested
        technologies to make it easier to take your business from and idea to a
        fully-functioning SaaS that stands out on the modern web.
      </p>
      <h2 class="text-center font-extrabold text-4xl mb-4">
        Our (default) stack
      </h2>
      <div class="flex lg:flex-row flex-col justify-center items-center lg:items-stretch gap-2">
        <StackBox
          title="Qwik"
          content="Deliver your product with the quickest web framework available (no pun intended). Qwik brings performance, SEO, 
          and everything else you would want in a web framework."
        >
          <QwikLogo />
        </StackBox>
        <StackBox
          title="Builder.io"
          content="Low code? No problem. Manage your components and build your pages with Builder.io's visual builder and CMS."
        >
          <BuilderLogo />
        </StackBox>
        <StackBox
          title="Supabase"
          content="Need a database? Authentication? Storage? Supabase gives you all three, which you can either host yourself or on Supabase's cloud platform."
        >
          <SupabaseLogo />
        </StackBox>
      </div>
      <div class="flex flex-row justify-center my-4 gap-4">
        <h2 class="font-bold text-3xl">Plus some other goodies: </h2>
        <ul class="[&>li]:font-bold [&>li]:text-2xl list-inside">
          <li>Tailwind</li>
          <li>Stripe</li>
          <li>Partytown</li>
          <li>Microsoft Clarity</li>
          <li>... and more to come!</li>
        </ul>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik SaaS Template",
  meta: [
    {
      name: "description",
      content: "A template for your SaaS",
    },
  ],
};
