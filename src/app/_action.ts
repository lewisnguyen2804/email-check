"use server"

import { redirect } from "next/navigation"

declare global {
  var __SECRET_KEY__: string
}

export async function setSecretKey(secret: string) {
  global.__SECRET_KEY__ = secret
  redirect("/email")
}

export async function getSecretKey() {
  return global.__SECRET_KEY__
}