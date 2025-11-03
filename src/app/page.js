"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">

    </div>
  );
}
