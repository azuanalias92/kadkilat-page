export const runtime = "edge";
import Slider from "@/components/slider";
import { getRequestContext } from '@cloudflare/next-on-pages'

async function getData() {
  const api = await getRequestContext().env.API
  console.log("api", api)
  const res = await fetch(api +`/api/cards`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PlaySlider() {
  const data: any = await getData();
  return (
    data && (
      <div className="flex flex-col h-screen bg-blue-200 items-center p-8">
        <Slider data={data.results} />
      </div>
    )
  );
}
