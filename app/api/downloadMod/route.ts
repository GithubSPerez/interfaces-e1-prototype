import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const modUrl = searchParams.get("url");
  const filename = searchParams.get("name");

  if (!modUrl) {
    return new Response("Missing mod file url", { status: 400 });
  }

  const response = await axios.get(modUrl, {
    responseType: "stream",
  });

  return new Response(response.data, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}