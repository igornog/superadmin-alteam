import React from 'react';
import styled from 'styled-components';
import { green, grey, grey4 } from '../../utils/colors';
import check from '../../assets/images/icons/check.svg';

const StyledCheckbox = styled.input`
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;

  border: 1.5px solid ${grey4};
  border-radius: 2px;
  width: 16px;
  height: 16px;
  content: none;

  &:checked {
    background: ${green};
    position: relative;
    border-color: ${green};

    &:before {
      font-family: FontAwesome;
      content: url(${check});
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${grey4};
      font-size: 13px;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  &:hover {
    cursor: pointer;
    border-color: ${grey};
  }
`;

const AtCheckbox: React.FunctionComponent<AtCheckboxProps> = (
  props: AtCheckboxProps
) => {
  return <StyledCheckbox type={'checkbox'} checked={props.checked} />;
};

interface AtCheckboxProps {
  checked?: boolean;
}

export default AtCheckbox;
