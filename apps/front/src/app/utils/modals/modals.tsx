import AtTypography from '../../components/AtTypography/AtTypography';
import { ModalVariant, ModalSize } from '../redux/types/settings.type';
import ModalSkills from './ModalSkills';

export const modals = {
  [ModalVariant.Skills]: {
    size: ModalSize.Small,
    content: <ModalSkills />,
    title: <AtTypography variant={'h4'}>Edit Skills</AtTypography>,
  },
  [ModalVariant.GeneralInformations]: {
    size: ModalSize.Medium,
    content: <ModalSkills />,
    title: <AtTypography variant={'h4'}>Edit General Information</AtTypography>,
  },
  [ModalVariant.About]: {
    size: ModalSize.Medium,
    content: <ModalSkills />,
    title: <AtTypography variant={'h4'}>Edit About Talent</AtTypography>,
  },
  [ModalVariant.Attachments]: {
    size: ModalSize.Medium,
    content: <ModalSkills />,
    title: 'Edit Skills',
  },
  [ModalVariant.Notes]: {
    size: ModalSize.Medium,
    content: <ModalSkills />,
    title: 'Edit Skills',
  },
};
