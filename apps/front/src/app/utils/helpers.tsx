import { Be, Dribbble, Global, Instagram, Youtube } from 'iconsax-react';
import Github from '../assets/images/icons/Github.svg';
import Linkedin from '../assets/images/icons/Linkedin.svg';
import Stackoverflow from '../assets/images/icons/Stackoverflow.svg';
import Twitter from '../assets/images/icons/Twitter.svg';

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

export const capitalizeFirstLetter = (value: string) => {
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);

  return capitalized;
};

export const availableNetworks: any = {
  behance: <Be size={20} />,
  dribble: <Dribbble size={20} />,
  github: <img src={Github} alt={'linkedin icon'} width={20} />,
  instagram: <Instagram size={20} />,
  linkedin: <img src={Linkedin} alt={'linkedin icon'} width={20} />,
  stackoverflow: (
    <img src={Stackoverflow} alt={'stackoverflow icon'} width={20} />
  ),
  twitter: <img src={Twitter} alt={'stackoverflow icon'} width={20} />,
  youtube: <Youtube size={20} />,
};

export const getCorrectNetwork = (
  url?: string,
  returnValue: 'icon' | 'key' = 'icon'
) => {
  const item = Object.keys(availableNetworks).find((key) => url?.includes(key));

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
  );
};
