'use client';

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export default function Home() {
  return (
    <main className="flex h-screen bg-blue-200 flex-col items-center justify-between ">
      <ComposableMap>
        <Geographies geography="/features.json">{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}</Geographies>
      </ComposableMap>      
    </main>
  );
}
