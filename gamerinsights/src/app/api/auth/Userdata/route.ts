import { getUserData } from "@/lib/data";

export async function GET(request: Request) {
    const data = await getUserData();
    return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } });
}