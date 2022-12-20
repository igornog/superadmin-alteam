import React, { Children, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const PagerContainer = styled.div<{ isPreviousStep: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: ${({ isPreviousStep }) => (isPreviousStep ? 'hidden' : 'visible')};
  width: 100%;
  z-index: 1300;
`

const PagerAnimtedContainer = styled(motion.div)`
  flex-direction: row;
  direction: ltr;
  will-change: transform;
  min-height: 0;
  flex: 1;
  display: flex;
`

const Page = styled.div<{ tabIndex: number; $active: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: stretch;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 100%;
  overflow: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  outline: none;
  max-height: ${({ tabIndex }) => (tabIndex === -1 ? 0 : 'auto')};
  transition: max-height 0.3s ease;
`

const AtPager: React.FunctionComponent<AtPagerProps> = (
  props: AtPagerProps,
) => {
  const [initialValue, setInitialValue] = useState(props.value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialValue(props.value)
    }, 500)
    return () => clearTimeout(timer)
  }, [props.value])

  return (
    <PagerContainer isPreviousStep={initialValue !== props.value}>
      <PagerAnimtedContainer
        transition={{
          tension: 190,
          friction: 70,
          mass: 0.4,
        }}
        initial={false}
        animate={{ x: props.value * -100 + '%' }}
      >
        {Children.map(props.children, (child, i) => (
          <Page
            key={i}
            $active={props.value === i}
            aria-hidden={props.value !== i}
            tabIndex={props.value === i ? 0 : -1}
          >
            {child}
          </Page>
        ))}
      </PagerAnimtedContainer>
    </PagerContainer>
  )
}

interface AtPagerProps {
  children: React.ReactNode
  value: number
}

export default AtPager
