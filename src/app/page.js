"use client";

import ImageEditor from "./components/image-editor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <main className=" h-[100vh]">
        <div className="relative bg-white w-full ">
  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b h-[100vh] from-slate-50 to-transparent" style={{ backgroundImage: "radial-gradient(#eceaea  2px, transparent 3px)", backgroundSize: "20px 20px" }}>
  </div>

</div>
      <ImageEditor/>
      <ToastContainer />
    </main>
  );
}
