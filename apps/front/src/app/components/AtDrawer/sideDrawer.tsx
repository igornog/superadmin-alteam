import { white } from '../../utils/colors'
import { SideDrawerVariant } from '../../utils/redux/types/settings.type'
import DrawerClient from './drawers/DrawerClient'
import DrawerCreateClient from './drawers/DrawerCreateClient/DrawerCreateClient'
import DrawerTalent from './drawers/DrawerTalent'

export const drawers = {
  [SideDrawerVariant.Talent]: {
    size: '50%',
    content: <DrawerTalent />,
    backgroundColor: white,
  },
  [SideDrawerVariant.Client]: {
    size: '50%',
    content: <DrawerClient />,
    backgroundColor: white,
  },
  [SideDrawerVariant.CreateClient]: {
    size: '100%',
    content: <DrawerCreateClient />,
    backgroundColor: '#F7F8FE',
  },
}
