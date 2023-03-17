import { Slot, component$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { authedGuard } from "~/utils/guards"

/** Make sure that users are authenticated. If they aren't then redirect to /login */
export const onRequest: RequestHandler = async (event) => {
  authedGuard(event, '/login')
}

export default component$(() => <Slot />)