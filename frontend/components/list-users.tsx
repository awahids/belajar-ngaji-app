'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from './ui/badge'

// Define a User type
type User = {
  id: number
  name: string
  email: string
  phone: string
  role: string
  avatar?: string
  verified_at: string | null
}

// Define a type for the API response
type ApiResponse = {
  success: boolean
  message: string
  statusCode: number
  data: Array<{
    id: number
    uuid: string
    name: string
    email: string
    phone: string
    verified_at: string | null
    role: {
      id: number
      uuid: string
      name: string
      value: string
    }
  }>
  meta: {
    pagination: {
      total: number
      per_page: number
      current_page: number
      last_page: number
      from: number
      to: number
    }
  }
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Status badge color mapping
  const getStatusBadgeVariant = (verified_at: string | null) => {
    return verified_at ? 'outline' : 'destructive';
  }

  const fetchUsers = async (page: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data: ApiResponse = await response.json()

      if (data.success) {
        const mappedUsers = data.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role.name,
          verified_at: user.verified_at,
          avatar: "/placeholder.svg?height=40&width=40"
        }))

        setUsers(mappedUsers)
        setTotalPages(data.meta.pagination.last_page)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>User List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name </TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <span>{user.name}</span>
                </TableCell>
                <TableCell className='font-medium text-2xl'>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={getStatusBadgeVariant(user.verified_at)}>
                    {user.verified_at ? 'Verified' : 'Not Verified'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  )
}