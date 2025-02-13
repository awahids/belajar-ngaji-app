'use client'

import UserTable from '@/components/users/ListUser'

export default function ListUsers() {


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500 p-4">
      <UserTable />
    </div>
  )
}