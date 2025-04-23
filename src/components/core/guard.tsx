"use client"

import { useRouter } from "nextjs-toploader/app";
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const Guard: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [secret, setSecret] = useLocalStorage("secret", "")

  if (!secret || secret !== process.env.NEXT_PUBLIC_API_KEY) {
    router.push("/403");
  }

  return <>{children}</>;
}

export default Guard
