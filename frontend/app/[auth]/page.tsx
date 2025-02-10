'use client'
import { useParams } from 'next/navigation'
import LoginForm from '@/components/login-form'
import SignupForm from '@/components/signup-form'

export default function AuthPage() {
  const params = useParams()
  const { auth } = params

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500 p-4">
      {auth === 'login' && <LoginForm />}
      {auth === 'signup' && <SignupForm />}
      {!auth && <p>Please select a valid authentication method.</p>}
    </div>
  )
}