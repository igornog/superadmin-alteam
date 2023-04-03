import React from 'react'
import { Card } from '@mui/material'
import styled from 'styled-components'
import AtTypography from '../AtTypography/AtTypography'
import { grey } from '@mui/material/colors'

const StyledCard = styled(Card)`
  width: 100%;
  height: auto;
  box-shadow: none;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 5px;

  p {
    color: ${grey}
    line-height: 22.4px;
  }
`

const CustomCard: React.FC<Props> = (props: Props) => {
  return (
    <StyledCard>
      <img src={props.icon} alt={'logo'} width={40} />
      <AtTypography variant='h5'>{props.number}. {props.title}</AtTypography>
      <AtTypography >{props.text}</AtTypography>
    </StyledCard>
  )
}

interface Props {
  number: number,
  icon: string,
  title: string,
  text: string
}

export default CustomCard

