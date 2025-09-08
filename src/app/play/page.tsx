export const runtime = "edge";
import Slider from "@/components/slider";
import { getRequestContext } from '@cloudflare/next-on-pages'
import { Suspense } from 'react';

interface CardData {
  id: number;
  name: string;
  url: string;
  category?: string;
}

interface ApiResponse {
  results: CardData[];
}

async function getData(): Promise<ApiResponse> {
  try {
    const api = await getRequestContext().env.API;
    const res = await fetch(api + `/api/cards`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return empty results on error to prevent app crash
    return { results: [] };
  }
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col h-dvh bg-blue-200 items-center justify-center p-8">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      <p className="mt-4 text-white text-lg">Loading cards...</p>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="flex flex-col h-dvh bg-blue-200 items-center justify-center p-8">
      <div className="text-white text-center">
        <h2 className="text-2xl mb-4">Unable to load cards</h2>
        <p>Please try refreshing the page</p>
      </div>
    </div>
  );
}

export default async function PlaySlider() {
  const data = await getData();
  
  // Handle empty or error response
  if (!data.results || data.results.length === 0) {
    return <ErrorFallback />;
  }

  const elementAtStart: CardData = {
    id: 0,
    name: " <- Swipe Left ",
    category: "Start",
    url: "https://imgtr.ee/images/2024/03/10/c64c32544fcce14e177396413416cfc7.jpeg"
  };

  const elementAtEnd: CardData = {
    id: data.results.length + 1,
    name: "The End.",
    category: "End",
    url: "https://imgtr.ee/images/2024/03/10/c64c32544fcce14e177396413416cfc7.jpeg"
  };

  // Create optimized dataset
  const optimizedData = [
    elementAtStart,
    ...data.results,
    elementAtEnd
  ];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex flex-col h-dvh bg-blue-200 items-center p-8">
        <Slider data={optimizedData} />
      </div>
    </Suspense>
  );
}
