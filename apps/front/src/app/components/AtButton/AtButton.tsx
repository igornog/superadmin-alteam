import React from 'react'
import styled, { css } from 'styled-components'
import { Button, buttonClasses } from '@mui/material'
import AtTypography from '../AtTypography/AtTypography'
import {
  white,
  black,
  grey4,
  grey2,
  grey3,
  green,
  red,
} from '../../utils/colors'
import { ArrowDown2 } from 'iconsax-react'

export enum AtButtonKind {
  Default = 'default',
  Success = 'success',
  Danger = 'danger',
}

export enum AtButtonVariant {
  Contained = 'contained',
  Outlined = 'outlined',
  Text = 'text',
}

export const buttonKind = {
  [AtButtonKind.Default]: {
    default: {
      backgroundColor: black,
      color: white,
    },
    hover: {
      backgroundColor: green,
      color: black,
      outlined: grey2,
    },
    disabled: {
      backgroundColor: grey4,
      color: grey3,
    },
  },
  [AtButtonKind.Success]: {
    default: {
      backgroundColor: green,
      color: black,
    },
    hover: {
      backgroundColor: black,
      color: white,
      outlined: grey2,
    },
    disabled: {
      backgroundColor: grey4,
      color: grey3,
    },
  },
  [AtButtonKind.Danger]: {
    default: {
      backgroundColor: red,
      color: white,
    },
    hover: {
      backgroundColor: black,
      color: white,
      outlined: grey2,
    },
    disabled: {
      backgroundColor: grey4,
      color: grey3,
    },
  },
}

interface StyledButtonProps {
  kind: AtButtonKind
  $variant: AtButtonVariant
  $btnName?: string
  $padding?: string
  startIcon?: React.ReactNode
  $iconSize?: number
  $flexibleHeight?: boolean
  clicked?: React.MouseEventHandler<HTMLButtonElement>
}

const StyledArrow = styled(ArrowDown2)<{ open?: boolean }>`
  transition: 0.3s;
  transform: rotate(${({ open }) => (open ? '180' : '0')}deg);
`

const StyledButton = styled(Button)<StyledButtonProps>`
  & {
    border-radius: 5px;

    border: 0;
    outline: 0;
    transition: all 0.25s ease-in-out;
    font-family: 'Inter';

    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 24px;
    font-size: 13px;
    text-transform: initial;
    box-shadow: none;

    ${({ clicked }) =>
    clicked
      ? css`
      transition: 0.3s;
      transform: rotate(180deg);
        `
      : `      transition: 0.3s;
      transform: rotate(0deg);` }


    & .${buttonClasses.endIcon} {
      margin-right: 0;
    }

    ${({ $btnName, startIcon }) =>
      !$btnName && startIcon
        ? css`
            padding: 5px;
            height: 24px;
            width: 24px;

            & .${buttonClasses.startIcon} {
              margin: 0;
            }
          `
        : css<{
            $variant: AtButtonVariant
            $padding?: string
            $flexibleHeight?: boolean
          }>`
            padding: ${({ $variant, $padding }) =>
              $padding
                ? $padding
                : $variant === AtButtonVariant.Text
                ? '10px 0'
                : '10px 20px'};

            ${({ $flexibleHeight }) =>
              $flexibleHeight
                ? css`
                    min-height: 24px;
                  `
                : css`
                    height: 40px;
                  `}
          `}

    ${({ $variant }) =>
      $variant === AtButtonVariant.Contained
        ? css<{ kind: AtButtonKind }>`
            background-color: ${({ kind }) =>
              buttonKind[kind].default.backgroundColor};
            color: ${({ kind }) => buttonKind[kind].default.color};
          `
        : $variant === AtButtonVariant.Outlined
        ? css<{ kind: AtButtonKind }>`
            background-color: transparent;
            color: ${({ kind }) => buttonKind[kind].default.backgroundColor};
            border: 1px solid
              ${({ kind }) => buttonKind[kind].default.backgroundColor};
          `
        : css<{ kind: AtButtonKind }>`
            background-color: transparent;
            color: ${({ kind }) => buttonKind[kind].default.backgroundColor};
          `}

    & svg {
      width: ${({ $iconSize }) => ($iconSize ? $iconSize : '16px')};
      height: ${({ $iconSize }) => ($iconSize ? $iconSize : '16px')};
    }

    :hover {
      transition: all 0.25s ease-in-out;
      border: none;
      cursor: pointer;
      box-shadow: none;

      ${({ $variant }) =>
        $variant === AtButtonVariant.Contained
          ? css<{ kind: AtButtonKind }>`
              background-color: ${({ kind }) =>
                buttonKind[kind].hover.backgroundColor};
              color: ${({ kind }) => buttonKind[kind].hover.color};
            `
          : $variant === AtButtonVariant.Outlined
          ? css<{ kind: AtButtonKind }>`
              background-color: transparent;
              color: ${({ kind }) => buttonKind[kind].hover.outlined};
              border: 1px solid ${({ kind }) => buttonKind[kind].hover.outlined};
            `
          : css<{ kind: AtButtonKind }>`
              background-color: transparent;
              color: ${({ kind }) => buttonKind[kind].hover.backgroundColor};
            `}
    }

    &.Mui-disabled {
      transition: all 0.25s ease-in-out;
      cursor: not-allowed;

      ${({ $variant }) =>
        $variant === AtButtonVariant.Contained
          ? css<{ kind: AtButtonKind }>`
              background-color: ${({ kind }) =>
                buttonKind[kind].disabled.backgroundColor};
              color: ${({ kind }) => buttonKind[kind].disabled.color};
            `
          : $variant === AtButtonVariant.Outlined
          ? css<{ kind: AtButtonKind }>`
              background-color: transparent;
              color: ${({ kind }) => buttonKind[kind].disabled.color};
              border: 1px solid ${({ kind }) => buttonKind[kind].disabled.color};
            `
          : css<{ kind: AtButtonKind }>`
              background-color: transparent;
              color: ${({ kind }) => buttonKind[kind].disabled.backgroundColor};
            `}
    }
  }
`

const AtButton: React.FunctionComponent<AtButtonProps> = (
  props: AtButtonProps,
) => {
  return (
    <StyledButton
      {...props}
      kind={props.kind}
      $variant={props.variant}
      $btnName={props.name}
      $padding={props.padding}
      startIcon={props.startIcon}
      endIcon={
        props.dropdown ? (
          <StyledArrow open={props.open} size={15} />
        ) : props.endIcon}
      $iconSize={props.$iconSize}
      disabled={props.disabled}
      disableRipple={true}
      onClick={props.onClick}
    >
      {props.name && (
        <AtTypography
          variant={'button'}
          fontSize={props.fontSize}
          whiteSpace={'nowrap'}
        >
          {props.name}
        </AtTypography>
      )}
    </StyledButton>
  )
}

export interface AtButtonProps {
  kind: AtButtonKind
  variant: AtButtonVariant
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  name?: string
  dropdown?: boolean
  open?: boolean
  disabled?: boolean
  padding?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  fontSize?: string
  $iconSize?: number
  $flexibleHeight?: boolean
}

export default AtButton
