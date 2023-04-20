# Qwikstart

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbuk0vec%2Fqwikstart&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY,VITE_BUILDER_API_KEY,SECRET_SUPABASE_SERVICE_KEY)

This is a boilerplate that (currently) uses the following technologies:

- [Qwik/QwikCity](https://qwik.builder.io/)
- [Builder](https://builder.io)
- [Supabase](https://supabase.com/)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just a extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── supabase/
│   └── ...
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
    └── utils/
        └── ...
```

- `supabase`: Supabase config, including the seed.sql file to initialize tables and RLS.

- `src/routes`: Provides the directory based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `src/utils`: Directory for utilities, including the Supabase server + admin client and types.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.


## Add Integrations and deployment

Use the `pnpm qwik add` command to add additional integrations. Some examples of integrations include: Cloudflare, Netlify or Express server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
pnpm qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). During development, the `dev` command will server-side render (SSR) the output.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

To get started with this template, you need to create `.env` and `.env.development` files as shown in the `.env` and `.env.example` files. You will need your Builder API key, your Supabase instance URL and anon key, and your Supabase admin key.

> Note: the Supabase admin key will stay on the server and is not leaked to the client by default. Make sure that you do not call the Supabase admin client in client-side code!

You can either deploy a Supabase instance on [Supabase's cloud platform](https://supabase.com) or self-host one for development. To self-host an instance, make sure that you have Docker installed and running, and then run: 

```shell
pnpm db.start # or `yarn db.start`
```

To stop the Supabase instance, run:

```shell
pnpm db.stop # or `yarn db.stop`
```

> Note: The Supabase instance will not persist any data after you stop it. This includes database and authentication data. On each instance of starting the database, the `seed.sql` file will run.

If you update the schema of the database, you will also want to update the generated types for the Supabase js client. You can do this by running:

```shell
pnpm db.types # or `yarn db.types`
```

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to locally preview a production build, and it should not be used as a production server.

```shell
pnpm preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. Additionally, the build command will use Typescript to run a type check on the source code.

```shell
pnpm build # or `yarn build`
```

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `pnpm build.server` and `pnpm build.client`:

```shell
pnpm build
```

[Read the full guide here](https://github.com/BuilderIO/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
pnpm deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.

> Note: Make sure to include all your environment variables in the deployment!