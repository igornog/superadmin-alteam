import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import AtPager from './AtPager'
import { useMeasure } from '../../utils/hooks/useMeasure'

const TabContainer = styled.div`
  overflow-y: hidden;
  box-shadow: none;
`

const TabList = styled.div`
  display: block;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

const TabItem = styled(motion.button)<{ isActive: boolean }>`
  white-space: nowrap;
  -webkit-appearance: none;
  box-sizing: border-box;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  padding: 10px 1rem;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  text-size-adjust: none;
  text-overflow: ellipsis;
  line-height: 1.5;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(p) => (p.isActive ? 'rgb(25, 113, 194)' : 'rgb(95, 104, 113)')};
  margin: 0px;
  overflow: hidden;
`

const Slider = styled(motion.div)`
  height: 4px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  margin-left: 2px;
  margin-right: 2px;
  bottom: 0;
  position: absolute;
  background: #08e;
`

const AtTabs: React.FunctionComponent<AtTabsProps> = (props: AtTabsProps) => {
  const [value, setValue] = useState(0)
  const childRefs = useRef(new Map())
  const tabListRef = useRef<any>()
  const [slider, setSlider] = useState({ hasValue: false, left: 0, right: 0 })
  const { bounds, ref } = useMeasure()
  const step = props.step ?? value

  useEffect(() => {
    const target = childRefs.current.get(value)
    const container = tabListRef.current

    if (target) {
      const cRect = container.getBoundingClientRect()

      if (cRect.width === 0) {
        return
      }

      const tRect = target.getBoundingClientRect()
      const left = tRect.left - cRect.left
      const right = cRect.right - tRect.right

      setSlider({
        hasValue: true,
        left: left + 8,
        right: right + 8,
      })
    }
  }, [value, bounds])

  return (
    <>
      {props.menu && (
        <TabContainer ref={ref}>
          <TabList ref={tabListRef}>
            {props.tabs.map((tab, i) => (
              <TabItem
                key={tab.id}
                isActive={i === step}
                whileHover={{ backgroundColor: '#f1f3f5' }}
                transition={{ duration: 0.1 }}
                whileTap={{ backgroundColor: '#e9ecef' }}
                ref={(el) => childRefs.current.set(i, el)}
                onClick={() => setValue(i)}
              >
                {tab.name}
              </TabItem>
            ))}
            {slider.hasValue && (
              <Slider
                transition={{
                  bounceDamping: 3,
                }}
                initial={false}
                style={{
                  left: slider.left,
                  right: slider.right,
                }}
              />
            )}
          </TabList>
        </TabContainer>
      )}
      <AtPager value={step}>
        {props.tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {tab.content}
          </div>
        ))}
      </AtPager>
    </>
  )
}

interface AtTabsProps {
  tabs: Tab[]
  menu?: boolean
  step?: number
}

interface Tab {
  id: number
  name?: string
  content: React.ReactNode
}

export default AtTabs
