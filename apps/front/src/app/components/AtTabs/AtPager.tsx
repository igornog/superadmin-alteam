import React, { Children } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

const PagerAnimtedContainer = styled(motion.div)`
  flex-direction: row;
  direction: ltr;
  will-change: transform;
  min-height: 0;
  flex: 1;
  display: flex;
`;

const Page = styled.div<{ tabIndex: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: stretch;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  outline: none;
  max-height: ${({ tabIndex }) => (tabIndex === -1 ? 0 : '100vh')};
  transition: max-height 0.3s ease;
`;

const AtPager: React.FunctionComponent<AtPagerProps> = (
  props: AtPagerProps
) => {
  return (
    <PagerContainer>
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
            aria-hidden={props.value !== i}
            tabIndex={props.value === i ? 0 : -1}
          >
            {child}
          </Page>
        ))}
      </PagerAnimtedContainer>
    </PagerContainer>
  );
};

interface AtPagerProps {
  children: React.ReactNode;
  value: number;
}

export default AtPager;
