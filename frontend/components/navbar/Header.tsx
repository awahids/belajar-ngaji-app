'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import LoginDialog from '../auth/LoginForm'
import SignupDialog from '../auth/SignupForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const [isModalSignupOpen, setIsModalSignupOpen] = useState(false)
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)

  return (
    <header className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-primary">Belajar Ngaji</h1>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <Button variant="destructive" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsModalLoginOpen(true)}>
                Login
              </Button>
              <Button onClick={() => setIsModalSignupOpen(true)}>Signup</Button>
            </>
          )}
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
