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
import styled from 'styled-components';
import { blue, green, grey2, grey3, grey5, red, white } from '../utils/colors';
import { isValidEmail } from '../utils/emails';
import AtTypography from './AtTypography';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export enum AtTextFieldType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

const StyledLabel = styled.label<{ status: string; focused: boolean }>`
  background-color: ${({ focused, status }) =>
    status === 'error' ? red : focused && status === 'success' ? green : grey2};
  font-family: Inter;
  font-size: 10px;
  padding: 3px 5px;
  border-radius: 5px;
  color: ${white};
`;

const StyledInput = styled(OutlinedInput)`
  &.${outlinedInputClasses.root} {
    background-color: white;

    & input {
      &::placeholder {
        color: ${grey3};
      }

      &:hover {
        &::placeholder {
          color: ${grey2};
        }
      }

      padding: 16.5px 20px;
    }

    &:hover:not(:focused) .${outlinedInputClasses.notchedOutline} {
      border-color: ${grey2};
    }

    .${inputAdornmentClasses.positionEnd} {
      padding-right: 10px;
    }
  }

  &.${outlinedInputClasses.root},
    &.${outlinedInputClasses.root}.${outlinedInputClasses.focused} {
    fieldset {
      border-width: 1px;
    }

    &:not(.Mui-error):not(.MuiInputBase-colorSuccess) {
      fieldset {
        border-color: ${grey5};
      }
    }

    &:hover:not(.Mui-error):not(.MuiInputBase-colorSuccess) {
      fieldset {
        border-color: ${grey2};
      }
    }
  }
`;

const AtTextField: React.FunctionComponent<AtTextFieldProps> = (props) => {
  const [status, setStatus] = useState<any>('secondary');
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const returnValue = (value: string) => {
    if (props.type === AtTextFieldType.Email) {
      if (value.length === 0) {
        setStatus('secondary');
        props.onValueChange?.('');
        setValue('');
        return;
      }

      if (!isValidEmail(value)) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    }

    props.onValueChange?.(value);
    setValue(value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box position={'relative'}>
      {props.label && (
        <Box position={'absolute'} top={'-8px'} zIndex={1} paddingLeft={'20px'}>
          <StyledLabel status={status} focused={isFocused}>
            {props.label} {props.required && '*'}
          </StyledLabel>
        </Box>
      )}

      <FormControl variant="outlined" fullWidth={true}>
        <StyledInput
          fullWidth={true}
          error={status === 'error'}
          color={status}
          value={value}
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
          endAdornment={
            props.type === AtTextFieldType.Password &&
            value.length > 0 && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <HiOutlineEye size={15} />
                  ) : (
                    <HiOutlineEyeOff size={15} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
        />

        {status === 'error' && props.helperText ? (
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
  helperText?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  type?: AtTextFieldType;
  label?: string;
}

export default AtTextField;
