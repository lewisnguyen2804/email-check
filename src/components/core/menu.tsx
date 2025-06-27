"use client"

import Link from 'next/link'
import { Button } from '../ui/button'
import { Environment } from './environment'

export const Menu = () => {
  return (
    <div className="flex flex-row gap-4">
      <Environment />
      <Button>
        <Link href="/">Send Mail Loggers</Link>
      </Button>
      <Button>
        <Link href="/user">Check User Endpoints </Link>
      </Button>
    </div>
  );
}
