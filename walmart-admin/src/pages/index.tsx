import { Inter } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handlePredict = async () => {
    const data = {
      name: "rice",
    };
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const prediction = await response.json();
    console.log(prediction);
  }

  return (
    <>
      <div className="flex h-screen w-full bg-gray-100">
            <aside className="w-64 bg-blue-500 min-w-[250px] shadow-lg">
                <Sidebar />
            </aside>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 bg-gray-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700">Welcome to your dashboard!</p>
                    </div>
                    <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                      onClick={() => handlePredict()}
                    >
                      Click me!
                    </button>
                </main>
            </div>
        </div>
    </>
  );
}
