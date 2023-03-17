// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RequestEvent, RequestEventLoader } from "@builder.io/qwik-city";
import type { Session, createClient } from "@supabase/supabase-js";
import type { Database } from "./utils/supabase.types";

/** A Map<K, V> with type suggestions for the Supabase client and the session information. */
interface SharedMap<K, V> {
  clear(): void;
  delete(key: K): boolean;
  forEach(
    callbackfn: (value: V, index: K, map: SharedMap<K, V>) => void,
    thisArg?: any
  ): void;
  get(key: K): V;
  get(key: "supabase"): ReturnType<typeof createClient<Database>>;
  get(key: "session"): Session | null;
  has(key: K): boolean;
  set(key: K, value?: V): SharedMap<K, V>;
  size: number;
}

declare module "@builder.io/qwik-city" {
  interface RequestEvent extends RequestEvent {
    /**
     * Shared Map across all the request handlers. Every HTTP request will get a new instance of
     * the shared map. The shared map is useful for sharing data between request handlers.
     * Type definition has been modified to account for Supabase client and Session data.
     */
    sharedMap: SharedMap<string, any>;
  }
  interface RequestEventLoader extends RequestEventLoader {
    /**
     * Shared Map across all the request handlers. Every HTTP request will get a new instance of
     * the shared map. The shared map is useful for sharing data between request handlers.
     * Type definition has been modified to account for Supabase client and Session data.
     */
    sharedMap: SharedMap<string, any>;
  }
}
