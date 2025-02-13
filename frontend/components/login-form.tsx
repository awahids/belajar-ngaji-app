'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SignupDialog from './signup-form'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
})

type LoginSchema = z.infer<typeof loginSchema>

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSignupDialog, setShowSignupDialog] = useState(false) // Tambahkan state untuk signup dialog

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<LoginSchema> = async (values) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.data.token)
        window.location.href = '/'
      } else {
        setErrorMessage(data.message || 'Login failed')
      }
    } catch {
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='p-6 max-w-md w-full max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="you@example.com" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" {...field} className="pl-10 pr-10" />
                      <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="flex items-center">
                <Separator className="flex-1" />
                <span className="px-4 text-muted-foreground">or</span>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  Google
                </Button>
                <Button variant="outline">
                  Facebook
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => {
                    onOpenChange(false)
                    setShowSignupDialog(true)
                  }}
                >
                  Sign up here
                </button>
              </div>

              {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Tambahkan Signup Dialog */}
      {/* <SignupDialog open={showSignupDialog} onOpenChange={setShowSignupDialog} /> */}
    </>
  )
}
