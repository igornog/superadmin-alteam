import {
  Box,
  ClickAwayListener,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  inputAdornmentClasses,
  inputBaseClasses,
  OutlinedInput,
  outlinedInputClasses,
} from '@mui/material'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
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
} from '../../utils/colors'
import { ArrowDown2, Eye, EyeSlash } from 'iconsax-react'
import AtTypography from '../AtTypography/AtTypography'
import {
  StyledContentPopover,
  StyledDropdownElement,
} from '../AtDropdown/AtDropdown'
import { capitalizeFirstLetter } from '../../utils/helpers'

export enum AtTextFieldType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Number = 'number',
}

const StyledLabel = styled.label<{
  $isError?: boolean
  $isSuccess?: boolean
  $focused: boolean
  isDisabled?: boolean
  labelDropdown?: LabelDropdown[]
}>`
  background-color: ${({ $isError, $isSuccess, isDisabled }) =>
    isDisabled ? grey2 : $isError ? red : $isSuccess ? green : grey2};
  font-family: Inter;
  font-size: 10px;
  padding: 3px 5px;
  border-radius: 5px;
  color: ${white};
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 0;
  
  ${({ labelDropdown }) =>
    labelDropdown &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
}
`

const StyledInput = styled(OutlinedInput)<{
  $isError?: boolean
  $isSuccess?: boolean
  $focused: boolean
  disabled?: boolean
  size?: string
  $dropdown?: boolean
  $bgColor?: string
  $maxWidth?: number
  multiline?: boolean
}>`
  &.${outlinedInputClasses.root} {
    ${({ multiline }) =>
      !multiline &&
      css`
        padding: 0 20px;
      `}
    justify-content: space-between;
    ${({ $bgColor }) =>
      $bgColor
        ? css<{ $bgColor?: string }>`
            background-color: ${({ $bgColor }) =>
              $bgColor === 'black' ? black : white};
          `
        : css<{ $focused: boolean; $isError?: boolean; $isSuccess?: boolean }>`
            background-color: ${({ $focused, $isError, $isSuccess }) =>
              $focused
                ? $isError
                  ? red1
                  : $isSuccess
                  ? green5
                  : white
                : white};
          `};

    & > input {
      max-width: ${({ $maxWidth }) => $maxWidth && $maxWidth + 'ch'};
      color: ${({ disabled, $bgColor }: any) =>
        $bgColor === 'black' ? white : disabled ? grey3 : black};
      font-size: ${({ size }) => (size === 'medium' ? '16px' : '14px')};

      &::placeholder {
        color: ${grey3};
      }

      &:hover {
        cursor: pointer;
        &::placeholder {
          color: ${grey2};
        }
      }
      padding: ${({ size }) => (size === 'medium' ? '18px 0' : '10px 0')};

      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    & textarea {
      &::placeholder {
        color: ${grey3};
      }
    }
    &.${inputBaseClasses.adornedStart} {
      & > input {
        padding-left: 10px;
      }
    }
    &.${inputBaseClasses.adornedEnd} {
      & > input {
        padding-right: 10px;
      }
      & > svg {
        ${({ $dropdown }) =>
          $dropdown &&
          css`
            &:hover {
              cursor: pointer;
            }
          `}
        width: 20px;
        color: ${({ disabled, $bgColor }) =>
          $bgColor === 'black' ? white : disabled ? grey3 : black};
      }
    }
    .${inputAdornmentClasses.positionStart} {
      width: ${({ size }) => (size === 'medium' ? '20px' : '15px')};
      color: ${({ $isError, $isSuccess, disabled }) =>
        disabled ? grey3 : $isError ? red : $isSuccess ? green : grey2};
      margin-right: 0;
    }
  }
  &.${outlinedInputClasses.root},
    &.${outlinedInputClasses.root}.${outlinedInputClasses.focused},
    &.${outlinedInputClasses.root}.Mui-disabled {
    fieldset {
      transition: 0.3s;
      border-width: 1px;
      border-color: ${({ $isError, $isSuccess, $bgColor }) =>
        $bgColor === 'black'
          ? null
          : $isError
          ? red
          : $isSuccess
          ? green
          : grey5};
    }
  }
  &.${outlinedInputClasses.root}:hover: not(.Mui-disabled) {
    fieldset {
      transition: 0.3s;
      border-color: ${({ $isError, $isSuccess }) =>
        $isError ? red : $isSuccess ? green : grey3};
    }
  }
`

const StyledArrow = styled(ArrowDown2)<{ open?: boolean }>`
  transition: 0.3s;
  transform: rotate(${({ open }) => (open ? '180' : '0')}deg);
`

const StyledCharCounter = styled.label`
  position: absolute;
  padding: 10px;
  bottom: 0px;
  right: 0;
}
`

const AtTextField: React.FunctionComponent<AtTextFieldProps> = (
  props: AtTextFieldProps,
) => {
  const [showPassword, setShowPassword] = useState(false)

  const [showDropdownLabel, setShowDropdownLabel] = useState(false)
  const dropdownLabelRef = useRef<any>(null)

  const [value, setValue] = useState(props.defaultValue || '')
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const returnValue = (value: string) => {
    props.onValueChange?.(value)
    setValue(value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickLabel = (value: LabelDropdown) => {
    setShowDropdownLabel(false)
    props.onClickDropdownLabel?.(value)
  }

  const handlePressEnter = (e: any) => {
    if (props.onPressEnter) {
      if (e.keyCode === 13 || e.keyCode === 9) {
        props.onPressEnter?.(e.target.value)
        setValue('')
      }
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.type === AtTextFieldType.Number) {
      const value = e.target.value
      if (isNaN(Number(value))) {
        return
      }
    }

    returnValue(e.target.value)
  }

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value)
    }
  }, [props.value])

  return (
    <Box
      position={'relative'}
      style={{ opacity: props.disabled ? 0.5 : 1, width: '100%' }}
    >
      {props.label && (
        <ClickAwayListener onClickAway={() => setShowDropdownLabel(false)}>
          <Box>
            <Box
              position={'absolute'}
              top={'-9px'}
              zIndex={1}
              paddingLeft={'20px'}
              ref={dropdownLabelRef}
            >
              <StyledLabel
                $focused={isFocused}
                $isError={props.isError}
                $isSuccess={props.isSuccess}
                isDisabled={props.disabled}
                labelDropdown={props.labelDropdown}
                onClick={() => setShowDropdownLabel(!showDropdownLabel)}
              >
                {capitalizeFirstLetter(props.label)} {props.required && '*'}
                {props.labelDropdown && (
                  <StyledArrow open={showDropdownLabel} size={10} />
                )}
              </StyledLabel>
            </Box>
            {props.labelDropdown && (
              <StyledContentPopover
                in={showDropdownLabel}
                $minWidth={dropdownLabelRef?.current?.offsetWidth}
                left={20}
                top={10}
              >
                {props.labelDropdown?.map((labelDropdown: LabelDropdown) => {
                  return (
                    <StyledDropdownElement
                      onClick={() => {
                        handleClickLabel(labelDropdown)
                      }}
                      color={
                        labelDropdown.value === props.label ? black : grey2
                      }
                    >
                      {labelDropdown.label}
                    </StyledDropdownElement>
                  )
                })}
              </StyledContentPopover>
            )}
          </Box>
        </ClickAwayListener>
      )}

      <FormControl variant="outlined" fullWidth={true}>
        <StyledInput
          fullWidth={true}
          onClick={props.onClick}
          onKeyDown={handlePressEnter}
          $dropdown={props.dropdown}
          $maxWidth={props.maxWidth}
          $bgColor={props.bgColor}
          readOnly={props.readonly}
          $isError={props.isError}
          $isSuccess={props.isSuccess}
          $focused={isFocused}
          multiline={props.multiline}
          rows={props.rows}
          inputProps={{
            maxlength: props.maxLength,
            ...props.inputProps,
          }}
          disabled={props.disabled}
          value={props.dropdown ? props.value : value}
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
          onChange={handleChange}
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
            props.dropdown ? (
              <StyledArrow open={props.open} size={15} />
            ) : (
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
            )
          }
        />
        {props.charCounter ? (
          <StyledCharCounter>
            <AtTypography variant={'caption'} color={grey3}>
              {Object.keys(value ?? value).length}/{props.maxLength}
            </AtTypography>
          </StyledCharCounter>
        ) : null}

        {props.isError && props.helperText ? (
          <FormHelperText>
            <AtTypography color={red}>{props.helperText}</AtTypography>
          </FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  )
}

export interface AtTextFieldProps {
  charCounter?: boolean
  maxLength?: number
  fullWidth?: boolean
  required?: boolean
  defaultValue?: string
  value?: string
  multiline?: boolean
  rows?: number
  inputProps?: any

  isSuccess?: boolean
  isError?: boolean
  helperText?: string
  disabled?: boolean
  readonly?: boolean

  startIcon?: React.ReactNode
  endIcon?: React.ReactNode

  onClick?: () => void
  dropdown?: boolean
  open?: boolean

  maxWidth?: number
  bgColor?: 'black' | 'white'
  size?: 'small' | 'medium'
  onValueChange?: (value: any) => void
  onPressEnter?: (value: string) => void
  placeholder?: string
  type?: AtTextFieldType

  label?: string
  labelDropdown?: LabelDropdown[]
  onClickDropdownLabel?: (value: LabelDropdown) => void
}

export interface LabelDropdown {
  value: string
  label: string | React.ReactNode
}

export default AtTextField
