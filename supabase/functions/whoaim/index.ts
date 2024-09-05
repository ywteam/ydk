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

  src/node/library/packages/ydk-api/src/lib/config src/node/library/packages/ydk-api/src/lib/console src/node/library/packages/ydk-api/src/lib/data src/node/library/packages/ydk-api/src/lib/decorators src/node/library/packages/ydk-api/src/lib/entities src/node/library/packages/ydk-api/src/lib/events src/node/library/packages/ydk-api/src/lib/exceptions src/node/library/packages/ydk-api/src/lib/extensions src/node/library/packages/ydk-api/src/lib/hub src/node/library/packages/ydk-api/src/lib/i18n src/node/library/packages/ydk-api/src/lib/interfaces src/node/library/packages/ydk-api/src/lib/ioc src/node/library/packages/ydk-api/src/lib/log src/node/library/packages/ydk-api/src/lib/models src/node/library/packages/ydk-api/src/lib/policies src/node/library/packages/ydk-api/src/lib/specs src/node/library/packages/ydk-api/src/lib/ts src/node/library/packages/ydk-api/src/lib/value-object src/node/library/packages/ydk-api/src/lib/contants.ts

*/
