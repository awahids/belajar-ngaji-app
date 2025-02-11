'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SignupForm from './signup-form'

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

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold text-primary">Belajar Ngaji</h1>
        <div className="flex space-x-4">
          {menus.map((menu, index) => (
            <Button
              key={index}
              variant={menu.label === "Login" ? "outline" : "default"}
              onClick={() => setIsModalOpen(true)}>
              {menu.label}
            </Button>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='p-4'>
          <DialogHeader>
            <DialogTitle>Signup</DialogTitle>
          </DialogHeader>
          <SignupForm />
        </DialogContent>
      </Dialog>
    </header>
  )
}