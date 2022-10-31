import React from 'react';
import styled, { css } from 'styled-components';
import { Button, buttonClasses } from '@mui/material';
import AtTypography from '../AtTypography/AtTypography';
import {
  white,
  black,
  grey4,
  grey2,
  grey3,
  green,
  red,
} from '../../utils/colors';

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
    active: {
      backgroundColor: white,
      color: black,
    },
    focus: {
      backgroundColor: white,
      color: black,
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
    active: {
      backgroundColor: black,
      color: white,
    },
    focus: {
      backgroundColor: black,
      color: white,
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
    active: {
      backgroundColor: null,
      color: null,
    },
    focus: {
      backgroundColor: null,
      color: null,
    },
    disabled: {
      backgroundColor: grey4,
      color: grey3,
    },
  },
};

interface StyledButtonProps {
  kind: AtButtonKind;
  $variant: AtButtonVariant;
  $btnName?: string;
  startIcon?: React.ReactNode;
  iconSize?: number;
}

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
        : css`
            height: 40px;
            padding: 10px 20px;
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
      width: ${({ iconSize }) => (iconSize ? iconSize : '16px')};
      height: ${({ iconSize }) => (iconSize ? iconSize : '16px')};
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

    :active {
      transition: all 0.25s ease-in-out;
      background-color: ${({ kind }) =>
        buttonKind[kind].active.backgroundColor};
      color: ${({ kind }) => buttonKind[kind].active.color};
    }

    :focus {
      ${({ $variant }) =>
        $variant === AtButtonVariant.Contained
          ? css<{ kind: AtButtonKind }>`
              background-color: ${({ kind }) =>
                buttonKind[kind].focus.backgroundColor};
              color: ${({ kind }) => buttonKind[kind].focus.color};
            `
          : $variant === AtButtonVariant.Outlined
          ? css<{ kind: AtButtonKind }>`
              background-color: transparent;
              color: ${({ kind }) => buttonKind[kind].focus.color};
            `
          : css<{ kind: AtButtonKind }>`
              background-color: transparent;
              color: ${({ kind }) => buttonKind[kind].focus.color};
            `}
      transition: all 0.25s ease-in-out;
      box-shadow: none;
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
`;

interface AtButtonProps {
  kind: AtButtonKind;
  variant: AtButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name?: string;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fontSize?: string;
  iconSize?: number;
}

const AtButton: React.FunctionComponent<AtButtonProps> = (
  props: AtButtonProps
) => {
  return (
    <StyledButton
      {...props}
      kind={props.kind}
      $variant={props.variant}
      $btnName={props.name}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      iconSize={props.iconSize}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.name && (
        <AtTypography variant={'button'} fontSize={props.fontSize}>
          {props.name}
        </AtTypography>
      )}
    </StyledButton>
  );
};

export default AtButton;
