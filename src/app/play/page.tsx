import Slider from "@/components/slider";

async function getData() {
  const res = await fetch(`http://localhost:8787/api/cards`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PlaySlider() {
  const data: any = await getData();

  console.log("data", data.results);
  return (
    data && (
      <div className="flex flex-col h-screen bg-blue-200 items-center p-8">
        <Slider data={data.results} />
      </div>
    )
  );
}
