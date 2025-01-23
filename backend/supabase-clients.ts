import {
    createRouteHandlerClient,
    createServerComponentClient,
  } from "@supabase/auth-helpers-nextjs";
  import { cookies } from "next/headers";
  
  // We will use this client in Server Components
  export const createServerSupabase = () => {
    return createServerComponentClient({ cookies });
  };
  
  // We will use this client in Route Handlers
  export const createRouteHandlerSupabase = () => {
    return createRouteHandlerClient({ cookies });
  };