import { createClient } from "@supabase/supabase-js";

/** A supabase client with full R/W access. **Do not expose this to the client side! It must stay on the server.** */
export const supabaseServerClient = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL,
  process.env.SECRET_SUPABASE_SERVICE_KEY ?? ""
);
