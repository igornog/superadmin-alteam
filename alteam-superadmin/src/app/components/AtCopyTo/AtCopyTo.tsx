import { Box } from '@mui/material'
import { Copy, CopySuccess } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { green } from '../../utils/colors'
import AtTypography from '../AtTypography/AtTypography'

const StyledBox = styled(Box)<{ copied: boolean }>`
  transition: 0.3s;
  display: flex;
  gap: 5px;
`

const StyledTypography = styled(AtTypography)<{ copied: boolean }>`
  transition: opacity 0.3s;
  opacity: 0;

  ${({ copied }) =>
    copied &&
    css`
      transition: opacity 0.3s;
      opacity: 1;
    `}
`

const StyledCopy = styled(Copy)<{ copied: boolean }>`
  ${({ copied }) =>
    !copied &&
    css`
      &:hover {
        cursor: pointer;
        transition: 0.3s;
        color: ${green};
      }
    `}
`

const AtCopyTo: React.FunctionComponent<AtCopyToProps> = (
  props: AtCopyToProps,
) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(props.text)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const timeout = setInterval(() => {
        setCopied(false)
      }, 2000)
      return () => clearInterval(timeout)
    }

    return
  }, [copied])

  return (
    <StyledBox copied={copied}>
      <StyledTypography variant={'caption'} copied={copied}>
        Copied to clipboard
      </StyledTypography>
      {copied ? (
        <CopySuccess size={20} />
      ) : (
        <StyledCopy size={20} onClick={handleCopy} copied={copied} />
      )}
    </StyledBox>
  )
}

interface AtCopyToProps {
  text: string
}

export default AtCopyTo
