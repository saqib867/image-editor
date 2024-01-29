'use client'
import Image from "next/image";
import ImageEditor from "./components/image-editor";

export default function Home() {
  return (
    <main className=" h-[100vh]">
      <ImageEditor/>
    </main>
  );
}
