import "jsr:@supabase/functions-js/edge-runtime.d.ts"


Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name??''}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:


*/
