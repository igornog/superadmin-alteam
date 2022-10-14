import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  inputAdornmentClasses,
  inputBaseClasses,
  OutlinedInput,
  outlinedInputClasses,
} from '@mui/material';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  black,
  green,
  green5,
  grey2,
  grey3,
  grey5,
  red,
  red1,
  white,
} from '../../utils/colors';
import { Eye, EyeSlash } from 'iconsax-react';
import AtTypography from '../AtTypography/AtTypography';

export enum AtTextFieldType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

const StyledLabel = styled.label<{
  isError?: boolean;
  isSuccess?: boolean;
  focused: boolean;
  isDisabled?: boolean;
}>`
  background-color: ${({ isError, isSuccess, isDisabled }) =>
    isDisabled ? grey2 : isError ? red : isSuccess ? green : grey2};
  font-family: Inter;
  font-size: 10px;
  padding: 3px 5px;
  border-radius: 5px;
  color: ${white};
`;

const StyledInput = styled(OutlinedInput)<{
  isError?: boolean;
  isSuccess?: boolean;
  focused: boolean;
  disabled?: boolean;
  size?: string;
}>`
  &.${outlinedInputClasses.root} {
    background-color: ${({ focused, isError, isSuccess }) =>
      focused ? (isError ? red1 : isSuccess ? green5 : white) : white};

    & input {
      color: ${({ disabled }) => (disabled ? grey3 : black)};

      &::placeholder {
        color: ${grey3};
      }

      &:hover {
        &::placeholder {
          color: ${grey2};
        }
      }

      padding: ${({ size }) => (size === 'medium' ? '18px 20px' : '10px 20px')};
    }

    &.${inputBaseClasses.adornedStart} {
      padding-left: 0;

      input {
        padding-left: 10px;
      }
    }

    &.${inputBaseClasses.adornedEnd} {
      padding-right: 0;

      input {
        padding-right: 10px;
      }

      & > svg {
        width: 20px;
        color: ${({ disabled }) => (disabled ? grey3 : grey2)};
        padding-right: 20px;
      }
    }

    .${inputAdornmentClasses.positionStart} {
      width: ${({ size }) => (size === 'medium' ? '20px' : '15px')};
      color: ${({ isError, isSuccess, disabled }) =>
        disabled ? grey3 : isError ? red : isSuccess ? green : grey2};
      padding-left: 20px;
      margin-right: 0;
    }
  }

  &.${outlinedInputClasses.root},
    &.${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
    fieldset {
      border-width: 1px;
      border-color: ${({ isError, isSuccess }) =>
        isError ? red : isSuccess ? green : grey5};
    }
  }

  &.${outlinedInputClasses.root}:hover:not(.Mui-disabled) {
    fieldset {
      border-color: ${({ isError, isSuccess }) =>
        isError ? red : isSuccess ? green : grey3};
    }
  }
`;

const AtTextField: React.FunctionComponent<AtTextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const returnValue = (value: string) => {
    props.onValueChange?.(value);
    setValue(value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box position={'relative'}>
      {props.label && (
        <Box
          position={'absolute'}
          top={'-10px'}
          zIndex={1}
          paddingLeft={'20px'}
        >
          <StyledLabel
            focused={isFocused}
            isError={props.isError}
            isSuccess={props.isSuccess}
            isDisabled={props.disabled}
          >
            {props.label} {props.required && '*'}
          </StyledLabel>
        </Box>
      )}

      <FormControl variant="outlined" fullWidth={true}>
        <StyledInput
          fullWidth={true}
          isError={props.isError}
          isSuccess={props.isSuccess}
          focused={isFocused}
          disabled={props.disabled}
          value={value}
          size={props.size ?? 'medium'}
          required={props.required}
          type={
            props.type === AtTextFieldType.Password
              ? showPassword
                ? AtTextFieldType.Text
                : AtTextFieldType.Password
              : props.type || AtTextFieldType.Text
          }
          placeholder={props.placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            returnValue(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          startAdornment={
            props.startIcon && (
              <InputAdornment position="start">
                {props.startIcon}
              </InputAdornment>
            )
          }
          endAdornment={
            props.endIcon ||
            (props.type === AtTextFieldType.Password && value.length > 0 && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ))
          }
        />

        {props.isError && props.helperText ? (
          <FormHelperText>
            <AtTypography color={red}>{props.helperText}</AtTypography>
          </FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
};

interface AtTextFieldProps {
  fullWidth?: boolean;
  required?: boolean;

  isSuccess?: boolean;
  isError?: boolean;
  helperText?: string;
  disabled?: boolean;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  size?: 'small' | 'medium';
  onValueChange?: (value: string) => void;
  placeholder?: string;
  type?: AtTextFieldType;
  label?: string;
}

export default AtTextField;
