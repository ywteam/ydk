import OpenAI from "https://deno.land/x/openai@v4.53.2/mod.ts";

async function chat() {
  const url = Deno.env.get("OPENAI_BASE_URL") + "chat/completions";
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.",
      },
      {
        role: "user",
        content:
          "Compose a poem that explains the concept of recursion in programming.",
      },
    ],
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    console.error("Failed to fetch:", response.statusText);
  } else {
    const data = await response.json();
    console.log("Response:", data);
  }
}

Deno.serve(async (req) => {

  await chat();

  const url = new URL(req.url);
  const params = url.searchParams;
  const prompt = params.get("prompt") ?? "";
  if (!prompt) return new Response("Missing prompt", { status: 400 });
  const client = new OpenAI({
    baseURL: Deno.env.get("OPENAI_BASE_URL"),
    apiKey: Deno.env.get("OPENAI_API_KEY"),
  });

  const stream = false;
  const chatCompletion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream,
    messages: [
      {
        role: "system",
        content:
          "You are LLAMAfile, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // if (stream) {
  //   console.log("Streaming response");
  //   const headers = new Headers({
  //     "Content-Type": "text/event-stream",
  //     Connection: "keep-alive",
  //   });

  //   // Create a stream
  //   const stream = new ReadableStream({
  //     async start(controller) {
  //       const encoder = new TextEncoder();

  //       try {
  //         for await (const part of chatCompletion) {
  //           const chunch = encoder.encode(
  //             part.choices[0]?.delta?.content || "",
  //           );
  //           controller.enqueue(chunch);
  //           console.log("Streamed:", chunch);
  //         }
  //       } catch (err) {
  //         console.error("Stream error:", err);
  //       } finally {
  //         controller.close();
  //       }
  //     },
  //   });

  //   // Return the stream to the user
  //   return new Response(stream, {
  //     headers,
  //   });
  // }

  return Response.json(chatCompletion);
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request get 'http://127.0.0.1:54321/functions/v1/llamafile' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --data-urlencode "prompt=write a short rap song about Supabase, the Postgres Developer platform, as sung by Nicki Minaj"

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/llamafile' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"prompt":"write a short rap song about Supabase, the Postgres Developer platform, as sung by Nicki Minaj"}'


  curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/llamafile' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data-urlencode "prompt=write a short rap song about Supabase, the Postgres Developer platform, as sung by Nicki Minaj" -G


  curl -i --location --request POST  'http://127.0.0.1:54321/functions/v1/llamafile' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data-urlencode "prompt=write a short rap song about Supabase, the Postgres Developer platform, as sung by Nicki Minaj"

*/
