import AtTypography from '../../AtTypography/AtTypography';
import {
  ModalVariant,
  ModalSize,
} from '../../../utils/redux/types/settings.type';
import ModalAbout from './ModalAbout';
import ModalAddNote from './ModalAddNote';
import ModalDecline from './ModalDecline';
import ModalEditNote from './ModalEditNote';
import ModalGeneralInformations from './ModalGeneralInformations';
import ModalLink from './ModalLink';
import ModalSkills from './ModalSkills';

export const modals = {
  [ModalVariant.Skills]: {
    size: ModalSize.Small,
    content: <ModalSkills />,
    title: <AtTypography variant={'h4'}>Edit Skills</AtTypography>,
  },
  [ModalVariant.GeneralInformations]: {
    size: ModalSize.Medium,
    content: <ModalGeneralInformations />,
    title: <AtTypography variant={'h4'}>Edit General Information</AtTypography>,
  },
  [ModalVariant.About]: {
    size: ModalSize.Medium,
    content: <ModalAbout />,
    title: <AtTypography variant={'h4'}>Edit About Talent</AtTypography>,
  },
  [ModalVariant.Attachments]: {
    size: ModalSize.Medium,
    content: <ModalSkills />,
    title: <AtTypography variant={'h4'}>Edit Skills</AtTypography>,
  },
  [ModalVariant.DeclineTalent]: {
    size: ModalSize.Medium,
    content: <ModalDecline />,
    title: <AtTypography variant={'h4'}>Decline Talent</AtTypography>,
  },
  [ModalVariant.Link]: {
    size: ModalSize.Small,
    content: <ModalLink />,
    title: <AtTypography variant={'h4'}>Add Links</AtTypography>,
  },
  [ModalVariant.AddNote]: {
    size: ModalSize.Small,
    content: <ModalAddNote />,
    title: <AtTypography variant={'h4'}>Add Note</AtTypography>,
  },
  [ModalVariant.EditNote]: {
    size: ModalSize.Small,
    content: <ModalEditNote />,
    title: <AtTypography variant={'h4'}>Edit Note</AtTypography>,
  },
};
