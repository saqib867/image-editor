'use client'
import Image from "next/image";
import ImageEditor from "./components/image-editor";

export default function Home() {
  return (
    <main className=" h-[110vh]">
      <ImageEditor/>
    </main>
  );
}
