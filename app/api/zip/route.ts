import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await axios.post(
    "https://api.eazip.io/jobs",
    {
        ...body,
        mode: "stream",
    },
    {
      headers: {
        "X-API-Key": process.env.API_KEY!,
        "Content-Type": "application/json",
      },
    }
  );

  return Response.json(response.data);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  const response = await axios.get(
    `https://api.eazip.io/jobs/${jobId}`,
    {
      headers: {
        "X-API-Key": process.env.API_KEY!,
      },
    }
  );

  return Response.json(response.data);
}