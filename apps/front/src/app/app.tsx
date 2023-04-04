import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Auth from './features/auth'
import Talents from './features/talents'
// import Marketplace from './features/marketplace'
import {
  Personalcard,
  Profile,
  Briefcase,
  Setting2,
  Category,
  MonitorMobbile,
} from 'iconsax-react'
import Clients from './features/clients'
export const Navigation: NavigationProps[] = [
  {
    link: '/talents',
    element: <Talents />,
    icon: <Profile />,
    name: 'Talents',
  },
  {
    link: '/clients',
    element: <Clients />,
    icon: <Personalcard />,
    name: 'Clients',
  },
  {
    link: '/listings',
    element: <Talents />,
    icon: <Briefcase />,
    name: 'Listings',
  },
  {
    link: '/marketplace',
    element: <Talents />,
    icon: <MonitorMobbile />,
    name: 'Marketplace',
  },
  {
    link: '/settings',
    element: <Talents />,
    icon: <Setting2 />,
    name: 'Settings',
  },
  {
    link: '/account',
    element: <Talents />,
    icon: <Category />,
    name: 'Account',
  },
]

export interface NavigationProps {
  link: string
  element: React.ReactNode
  icon?: React.ReactNode
  name?: string
}

export const App: React.FunctionComponent = () => {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Auth />} />

      {Navigation.map((item: NavigationProps, index: number) => {
        return <Route path={item.link} element={item.element} key={index} />
      })}
    </Routes>
  )
}

export default App
