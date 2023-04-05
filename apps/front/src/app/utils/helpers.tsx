import { Be, Dribbble, Global, Instagram, Youtube } from 'iconsax-react'
import Github from '../assets/images/icons/Github.svg'
import Linkedin from '../assets/images/icons/Linkedin.svg'
import Stackoverflow from '../assets/images/icons/Stackoverflow.svg'
import Twitter from '../assets/images/icons/Twitter.svg'
import { green } from './colors'
import { SortTypes } from './redux/types/settings.type'
import { Currency } from '@yjcapp/app'

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100
  }

  return `rgba(${r},${g},${b},${opacity})`
}

export const capitalizeFirstLetter = (value: string) => {
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1)

  return capitalized
}

export const availableNetworks: any = {
  LinkDomain: <Be size={20} />,
  dribble: <Dribbble size={20} />,
  github: <img src={Github} alt={'linkedin icon'} width={20} />,
  instagram: <Instagram size={20} />,
  linkedin: <img src={Linkedin} alt={'linkedin icon'} width={20} />,
  stackoverflow: (
    <img src={Stackoverflow} alt={'stackoverflow icon'} width={20} />
  ),
  twitter: <img src={Twitter} alt={'stackoverflow icon'} width={20} />,
  youtube: <Youtube size={20} />,
}

export const getCorrectNetwork = (
  url?: string,
  returnValue: 'icon' | 'key' = 'icon',
) => {
  const item = Object.keys(availableNetworks).find((key) => url?.includes(key))

  return item ? (
    returnValue === 'key' ? (
      item
    ) : (
      availableNetworks[item]
    )
  ) : returnValue === 'key' ? (
    'Not Defined Link'
  ) : (
    <Global size={20} />
  )
}

export const getText = (elem: any): string => {
  if (!elem) {
    return ''
  }
  if (typeof elem === 'string') {
    return elem
  }

  const children = elem.props && elem.props.children
  if (children instanceof Array) {
    return children.map(getText).join('')
  }

  return getText(children)
}

export const plurialize = (
  count: number,
  word: string,
  hideNumber?: boolean,
) => {
  return (!hideNumber ? count + ' ' : '') + (count > 1 ? word + 's' : word)
}

export const stringMatch = (fullString: string, toMatch: string) => {
  const startIndex = fullString.indexOf(toMatch)
  const endIndex = startIndex + toMatch.length

  if (startIndex === -1) {
    return fullString
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          fullString.slice(0, startIndex) +
          `<span style="color: ${green}">${toMatch}</span>` +
          fullString.slice(endIndex),
      }}
    />
  )
}

const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

export const sortByStatus = (array: any[]) => {
  const listTalentsByGroup: string | any[] = []
  const statusGroup = groupBy(array, 'status')

  return listTalentsByGroup.concat(statusGroup.inbound, statusGroup.shortlisted, statusGroup.accepted)
}

export const sortBy = (sort: string, talents: any[]) => {
  let arrayForSort = []
  let listSorted = []

  switch (sort) {
    case SortTypes.Alphabetical:
      arrayForSort = [...talents]
      listSorted = arrayForSort.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
      break;
    case SortTypes.MostRecent:
      arrayForSort = [...talents]
      listSorted = arrayForSort.sort((a: any, b: any) => (a.appliedDate < b.appliedDate) ? 1 : -1)
      break;
  }

  listSorted.filter(item => item)
  return listSorted
}
export const getCurrencySymbol = (label?: Currency) => {
  switch (label) {
    case Currency.Dollars:
      return '$'

    case Currency.Euros:
      return '€'

    case Currency.Pounds:
      return '£'

    default:
      return '£'
  }
}
