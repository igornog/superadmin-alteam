import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Talents from './features/talents'
import Account from './features/account'
import Listings from './features/listings'
import {
  Personalcard,
  Profile,
  Briefcase,
  Category,
} from 'iconsax-react'
import Clients from './features/clients'
// import AtTalentCardDetails from './components/AtCard/AtTalentCardDetails'
import { useAuth0 } from '@auth0/auth0-react'
export const Navigation: NavigationProps[] = [
  {
    link: '/',
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
    element: <Listings />,
    icon: <Briefcase />,
    name: 'Listings',
  },
  {
    link: '/account',
    element: <Account />,
    icon: <Category />,
    name: 'Account',
  },
  // {
  //   link: '/marketplace',
  //   element: <Talents />,
  //   icon: <MonitorMobbile />,
  //   name: 'Marketplace',
  // },
  // {
  //   link: '/settings',
  //   element: <Talents />,
  //   icon: <Setting2 />,
  //   name: 'Settings',
  // },
]

export interface NavigationProps {
  link: string
  element: React.ReactNode
  icon?: React.ReactNode
  name?: string
}

export const App: React.FunctionComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    isAuthenticated,
    error
  } = useAuth0();

  // useEffect(() => {
  //   if (error) {
  //     navigate('/')
  //   }
  // }, [error, navigate])

  return (
    <Routes location={location} key={location.pathname}>

      {/* <Route path="/" element={<Auth />} />
      <Route path="/talent/:id" element={<AtTalentCardDetails />} /> */}

      {
        Navigation.map((item: NavigationProps, index: number) => {
          return <Route path={item.link} element={item.element} key={index} />
        })
      }
    </Routes>
  )
}

export default App
