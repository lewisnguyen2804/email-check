"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        src="/assets/cat_loading.gif"
        alt="Loading..."
        width={400}
        height={400}
      />
    </div>
  );
}
