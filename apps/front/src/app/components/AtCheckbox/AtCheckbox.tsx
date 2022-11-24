import React from 'react'
import styled, { css } from 'styled-components'
import { green, grey, grey4 } from '../../utils/colors'
import check from '../../assets/images/icons/check.svg'
import minus from '../../assets/images/icons/minus.svg'

const sharedCheck = css<{ indeterminate?: boolean }>`
  position: relative;
  background: ${green};
  border-color: ${green};

  &:before {
    content: url(${({ indeterminate }) => (indeterminate ? minus : check)});
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${grey4};
    font-size: 13px;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const StyledCheckbox = styled.input<{ indeterminate?: boolean }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;

  border: 1.5px solid ${grey4};
  border-radius: 2px;
  width: 16px;
  height: 16px;
  content: none;

  ${({ indeterminate }) =>
    indeterminate
      ? css<{ indeterminate?: boolean }>`
          ${sharedCheck}
        `
      : css`
          &:checked {
            ${sharedCheck}
          }
        `}

  &:hover {
    cursor: pointer;
    border-color: ${grey};
  }
`

const AtCheckbox: React.FunctionComponent<AtCheckboxProps> = (
  props: AtCheckboxProps,
) => {
  return (
    <StyledCheckbox
      type={'checkbox'}
      ref={props.checkboxRef}
      checked={props.checked}
      indeterminate={props.indeterminate}
      onChange={props.onChange}
    />
  )
}

interface AtCheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (e: any) => void
  checkboxRef?: any
}

export default AtCheckbox
