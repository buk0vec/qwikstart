import type { RequestEvent } from "@builder.io/qwik-city";

/** Invoke within a RequestHandler to not allow the user to access a route if they aren't logged in
 * and redirects them to the appropriate URL
 */
export const authedGuard = (event: RequestEvent, redirect: string) => {
  const session = event.sharedMap.get('session');
  if (!session) {
    event.redirect(302, redirect);
  }
}

/** Invoke within a RequestHandler to not allow the user to access a route if they are logged in
 * and redirects them to the appropriate URL
 */
export const unauthedGuard = (event: RequestEvent, redirect: string) => {
  const session = event.sharedMap.get('session');
  if (session) {
    event.redirect(302, redirect);
  }
}