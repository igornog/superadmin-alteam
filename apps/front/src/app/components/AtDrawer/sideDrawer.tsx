import { SideDrawerVariant } from '../../utils/redux/types/settings.type'
import DrawerClient from './drawers/DrawerClient'
import DrawerTalent from './drawers/DrawerTalent'

export const drawers = {
  [SideDrawerVariant.Talent]: {
    size: '50%',
    content: <DrawerTalent />,
  },
  [SideDrawerVariant.Client]: {
    size: '50%',
    content: <DrawerClient />,
  },
}
