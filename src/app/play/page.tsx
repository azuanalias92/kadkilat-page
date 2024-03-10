export const runtime = "edge";
import Slider from "@/components/slider";
import { getRequestContext } from '@cloudflare/next-on-pages'

async function getData() {
  const api = await getRequestContext().env.API
  const res = await fetch(api +`/api/cards`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PlaySlider() {
  const data: any = await getData();
  let elementAtStart = {
    "id": 0,
    "name": " <- Swipe Left ",
    "category": "Start",
    "url": "https://imgtr.ee/images/2024/03/10/c64c32544fcce14e177396413416cfc7.jpeg"
};

// Element to add at the end
let elementAtEnd = {
    "id": data.results.length + 1,
    "name": "The End.",
    "category": "End",
    "url": "https://imgtr.ee/images/2024/03/10/c64c32544fcce14e177396413416cfc7.jpeg"
};

// Add element at the start
data.results.unshift(elementAtStart);

// Add element at the end
data.results.push(elementAtEnd);
  return (
    data && (
      <div className="flex flex-col h-dvh bg-blue-200 items-center p-8">
        <Slider data={data.results} />
      </div>
    )
  );
}
