import { Box } from '@mui/material'
import {
  Content,
  ContextMenuTrigger,
  Item,
  MenuItemProps,
  Root,
} from '@radix-ui/react-context-menu'
import React from 'react'
import styled from 'styled-components'
import { black, blue5, grey2, grey5, red, white } from '../../utils/colors'
import { boxShadow } from '../../utils/theme'

const StyledMenuContent = styled(Content)`
  min-width: 210px;
  padding: 10px;
  background-color: ${white};
  z-index: 999;
  border: 1px solid ${grey5};
  border-radius: 5px;
  box-shadow: ${boxShadow};
`

const AtContextMenuContent: React.FunctionComponent<any> = (props: any) => {
  return <StyledMenuContent {...props} />
}

const StyledMenuItem = styled(Item)<{ variant?: string }>`
  line-height: 1;
  border-radius: 3px;
  height: 25px;
  display: flex;
  align-items: center;
  color: ${({ variant }) => (variant === 'danger' ? red : grey2)};

  &[data-disabled] {
    color: ${blue5};
    pointer-events: none;
  }

  &[data-highlighted] {
    outline: 0;
    cursor: pointer;
    color: ${black};

    img {
      filter: brightness(0.5);
    }
  }
`

export const AtContextMenuItem: React.FunctionComponent<
  AtContextMenuItemProps
> = (props: AtContextMenuItemProps) => {
  return (
    <StyledMenuItem variant={props.variant} {...props}>
      {props.children}
    </StyledMenuItem>
  )
}

interface AtContextMenuItemProps extends MenuItemProps {
  variant?: 'default' | 'danger'
  children: React.ReactNode
}

const AtRightClick: React.FunctionComponent<AtRightClickProps> = (
  props: AtRightClickProps,
) => {
  return props.disabled ? (
    props.children
  ) : (
    <Root modal={false}>
      <ContextMenuTrigger asChild={true}>{props.children}</ContextMenuTrigger>
      <AtContextMenuContent onClick={(e: any) => e.stopPropagation()}>
        <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
          {props.contextMenu}
        </Box>
      </AtContextMenuContent>
    </Root>
  )
}

interface AtRightClickProps {
  children: React.ReactElement
  contextMenu: React.ReactNode
  disabled?: boolean
}

export default AtRightClick
