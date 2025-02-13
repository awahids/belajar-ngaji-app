'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import LoginDialog from '../auth/LoginForm'
import SignupDialog from '../auth/SignupForm'

const menus = [
  {
    label: "Login",
    action: "login"
  },
  {
    label: "Signup",
    action: "signup"
  }
]

export default function Header() {
  const [isModalSignupOpen, setIsModalSignupOpen] = useState(false)
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-primary">Belajar Ngaji</h1>
        <div className="flex space-x-4">
          {menus.map((menu, index) => (
            <Button
              key={index}
              variant={menu.label === "Login" ? "outline" : "default"}
              onClick={() =>
                menu.action === "signup"
                  ? setIsModalSignupOpen(true)
                  : setIsModalLoginOpen(true)
              }
              className={`transition duration-200 ${menu.label === 'Login' ? 'hover:bg-gray-200' : 'hover:bg-gray-500'}`}
            >
              {menu.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Modal Login */}
      {isModalLoginOpen && (
        <LoginDialog open={isModalLoginOpen} onOpenChange={setIsModalLoginOpen} />
      )}

      {/* Modal Signup */}
      {isModalSignupOpen && (
        <SignupDialog open={isModalSignupOpen} onOpenChange={setIsModalSignupOpen} />
      )}
    </header>
  )
}
