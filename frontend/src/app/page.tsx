"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const registerTestUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        })
        const data = await res.json()
        console.log('API response: ', data)
      } catch (err) {
          console.error('API error: ', err)
      }
    }
    registerTestUser()
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center text-xl">
      Welcome to Gravus Frontend. 💪
    </main>
  )
}
