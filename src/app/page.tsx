'use client'

import { use } from "react";
import ImageEditor from "./components/image-editor";
import React from "react";

export default function Home() {
  return (
    <main className=" h-[100vh]">
      <ImageEditor/>
    </main>
  );
}
