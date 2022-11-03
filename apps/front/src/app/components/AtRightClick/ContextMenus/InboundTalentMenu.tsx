import { ArrowSwapHorizontal, Share, Sms, TrushSquare } from 'iconsax-react';
import React from 'react';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleModal } from '../../../utils/redux/actions/settings.action';
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action';
import { ModalVariant } from '../../../utils/redux/types/settings.type';
import AtTypography from '../../AtTypography/AtTypography';
import { AtContextMenuItem } from '../AtRightClick';

const InboundTalentMenu: React.FunctionComponent<InboundTalentMenuProps> = (
  props: InboundTalentMenuProps
) => {
  const dispatch = useAppDispatch();

  const moveToShortlisted = () => {
    dispatch(handleSelectTalent(props.idTalent));
    dispatch(handleModal(ModalVariant.Shortlist));
  };

  return (
    <>
      <AtContextMenuItem onSelect={moveToShortlisted}>
        <AtTypography>
          <ArrowSwapHorizontal size={20} />
          Move to Shortlisted
        </AtTypography>
      </AtContextMenuItem>
      <AtContextMenuItem>
        <AtTypography>
          <Sms size={20} />
          Send Email to Talent
        </AtTypography>
      </AtContextMenuItem>
      <AtContextMenuItem>
        <AtTypography>
          <Share size={20} />
          Share Talent
        </AtTypography>
      </AtContextMenuItem>
      <AtContextMenuItem variant="danger">
        <AtTypography>
          <TrushSquare size={20} />
          Move to Declined
        </AtTypography>
      </AtContextMenuItem>
    </>
  );
};

interface InboundTalentMenuProps {
  idTalent: number;
}

export default InboundTalentMenu;
