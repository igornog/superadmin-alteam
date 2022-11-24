import { SideDrawerVariant } from '../../utils/redux/types/settings.type'
import DrawerTalent from './drawers/DrawerTalent'

export const drawers = {
  [SideDrawerVariant.Talent]: {
    size: '50%',
    content: <DrawerTalent />,
  },
}
