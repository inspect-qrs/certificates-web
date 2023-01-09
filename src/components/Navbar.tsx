import { useAuthStore } from '@/config/store/auth'
import React, { ReactElement } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

interface NavBarProps {
  className?: string
  linkClassNames?: string
  handleClick: () => void
}

interface Link {
  name: string
  to: string
}

const links: Link[] = [
  { name: 'Dashboard', to: '/dashboard' }
]

const NavBar = ({ linkClassNames, className, handleClick }: NavBarProps): ReactElement => {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  return (
    <div className={className}>
      {links.map(({ name, to }) => {
        return (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              ` py-3 font-m text-white px-6 text-center sm:rounded-2xl md:py-1 hover:bg-blue
                ${linkClassNames ?? ''} ${isActive ? 'bg-blue' : ''}`
            }
            onClick={handleClick}
          >
            {name}
          </NavLink>
        )
      })}
      <a onClick={handleLogout} className='block text-center cursor-pointer py-1 font-m text-white px-6 sm:rounded-2xl hover:bg-blue'>Logout</a>
    </div>

  )
}

export default NavBar
