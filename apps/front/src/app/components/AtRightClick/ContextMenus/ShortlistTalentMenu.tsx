import { Edit, Share, Sms, TrushSquare } from 'iconsax-react';
import React from 'react';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action';
import AtTypography from '../../AtTypography/AtTypography';
import { AtContextMenuItem } from '../AtRightClick';
import Arrow2 from '../../../assets/images/icons/arrow2.svg';

const ShortlistTalentMenu: React.FunctionComponent<ShortlistTalentMenuProps> = (
  props: ShortlistTalentMenuProps
) => {
  const dispatch = useAppDispatch();

  const moveToShortlisted = () => {
    dispatch(handleSelectTalent(props.idTalent));
    props.openShortlist();
  };

  return (
    <>
      <AtContextMenuItem onSelect={moveToShortlisted}>
        <AtTypography>
          <img src={Arrow2} alt={'Arrow'} width={20} />
          Move to Accepted
        </AtTypography>
      </AtContextMenuItem>
      <AtContextMenuItem>
        <AtTypography>
          <Edit size={20} />
          Edit Talent Folders
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

interface ShortlistTalentMenuProps {
  idTalent: number;
  openShortlist: () => void;
}

export default ShortlistTalentMenu;
