import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { black } from '../../utils/colors'
import { convertHexToRGBA } from '../../utils/helpers'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHook'
import { handleDrawer } from '../../utils/redux/actions/settings.action'
import { SideDrawer } from '../../utils/redux/types/settings.type'
import { drawers } from './sideDrawer'

const AtDrawer: React.FunctionComponent = () => {
  const [drawerSettings, setDrawerSettings] = useState(new SideDrawer({}))

  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(handleDrawer(null))

  const selectedDrawer = settings.selectedDrawer

  useEffect(() => {
    if (selectedDrawer) {
      setDrawerSettings(new SideDrawer(drawers[selectedDrawer]))
    }
  }, [selectedDrawer])

  return (
    <Drawer
      anchor={'right'}
      open={selectedDrawer !== null}
      onClose={handleClose}
      transitionDuration={{ enter: 600, exit: 300 }}
      BackdropProps={{
        style: {
          backgroundColor: convertHexToRGBA(black, 0.5),
        },
      }}
      PaperProps={{
        style: {
          width: drawerSettings.size,
          boxShadow: 'none',
          backgroundColor: drawerSettings.backgroundColor,
        },
      }}
    >
      {drawerSettings.content}
    </Drawer>
  )
}

export default AtDrawer
