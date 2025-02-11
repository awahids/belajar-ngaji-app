'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const menus = [
  {
    label: "Login",
    href: "/login"
  },
  {
    label: "Signup",
    href: "/signup"
  }
]

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold text-primary">Belajar Ngaji</h1>
        <div className="flex space-x-4">
          {menus.map((menu, index) => (
            <Link key={index} href={menu.href}>
              <Button variant={menu.label === "Login" ? "outline" : "default"} size="sm">{menu.label}</Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header