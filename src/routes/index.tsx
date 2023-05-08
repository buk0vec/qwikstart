/**
 * index.tsx
 * The home page
 */

import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import Header from "~/components/header/header";
import { BuilderLogo } from "~/components/icons/builder";
import { QwikLogo } from "~/components/icons/qwik";
import { SupabaseLogo } from "~/components/icons/supabase";
import StackBox from "~/components/stack-box/stack-box";
import {
  RenderContent,
  getContent,
  getBuilderSearchParams,
} from "@builder.io/sdk-qwik";
import { BUILDER_PUBLIC_API_KEY } from "./[...index]";

const BUILDER_MODEL = "landing-page-content";

export default component$(() => {
  const location = useLocation();
  // Use Builder content
  const builderContentRsrc = useResource$<any>(() => {
    return getContent({
      model: BUILDER_MODEL,
      apiKey: BUILDER_PUBLIC_API_KEY,
      options: getBuilderSearchParams(location.url.searchParams),
      userAttributes: {
        urlPath: location.url.pathname || "/", // <-- Use for targeting by URL
      },
    });
  });

  return (
    // Render page with Builder Content
    <Resource
      value={builderContentRsrc}
      onPending={() => <div>Loading...</div>}
      onResolved={(content) => (
        <>
          <Header />
          <main>
            <div class="mx-4">
              <h1 class="text-center font-extrabold tracking-tight text-6xl my-4">
                Make your new fast SaaS,&nbsp;<i>faster.</i>
              </h1>
              <p class="text-center text-xl mb-8">
                Qwik SaaS Starter leverages both bleeding-edge and battle-tested
                technologies to make it easier to take your business from an
                idea to a fully-functioning SaaS that stands out on the modern
                web.
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
                  title="Builder"
                  content="Low code? No problem. Manage your components and build your pages with Builder's visual builder and CMS."
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
              <h2 class="mx-auto text-2xl mt-4">
                Connect Builder to the template to edit its content. The following content was added with Builder:
              </h2>
              <RenderContent
                apiKey={BUILDER_PUBLIC_API_KEY}
                model={BUILDER_MODEL}
                content={content}
              />
            </div>
          </main>
          <hr class="my-2" />
          <footer class="mx-4">
            <a
              href="https://github.com/buk0vec"
              target="_blank"
              class="font-light text-neutral-600"
            >
              Created by buk0vec and the open source community.
            </a>
          </footer>
        </>
      )}
    />
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
