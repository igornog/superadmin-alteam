import { ModalVariant, ModalSize } from '../../utils/redux/types/settings.type';
import ModalAbout from './modals/ModalAbout';
import ModalAddNote from './modals/ModalAddNote';
import ModalDecline from './modals/ModalDecline';
import ModalEditNote from './modals/ModalEditNote';
import ModalGeneralInformations from './modals/ModalGeneralInformations';
import ModalLink from './modals/ModalLink';
import ModalSkills from './modals/ModalSkills';
import ModalShortlist from './modals/ModalShortlist';

export const modals = {
  [ModalVariant.Skills]: {
    size: ModalSize.Small,
    content: <ModalSkills />,
  },
  [ModalVariant.GeneralInformations]: {
    size: ModalSize.Medium,
    content: <ModalGeneralInformations />,
  },
  [ModalVariant.About]: {
    size: ModalSize.Medium,
    content: <ModalAbout />,
  },
  [ModalVariant.Attachments]: {
    size: ModalSize.Medium,
    content: <ModalSkills />,
  },
  [ModalVariant.DeclineTalent]: {
    size: ModalSize.Medium,
    content: <ModalDecline />,
  },
  [ModalVariant.Link]: {
    size: ModalSize.Small,
    content: <ModalLink />,
  },
  [ModalVariant.AddNote]: {
    size: ModalSize.Small,
    content: <ModalAddNote />,
  },
  [ModalVariant.EditNote]: {
    size: ModalSize.Small,
    content: <ModalEditNote />,
  },
  [ModalVariant.Shortlist]: {
    size: ModalSize.Small,
    content: <ModalShortlist />,
  },
};
