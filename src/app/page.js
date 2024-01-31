"use client";

import ImageEditor from "./components/image-editor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <main className=" h-[100%]">



      <ImageEditor/>
      <ToastContainer />
    </main>
  );
}
