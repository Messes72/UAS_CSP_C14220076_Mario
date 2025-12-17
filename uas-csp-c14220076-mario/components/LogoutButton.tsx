'use client'

import { logout } from '@/app/actions/auth'

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  )
}
