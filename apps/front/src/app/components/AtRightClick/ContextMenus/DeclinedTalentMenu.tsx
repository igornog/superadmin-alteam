import { RefreshCircle, Share, Sms } from 'iconsax-react';
import React from 'react';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action';
import AtTypography from '../../AtTypography/AtTypography';
import { AtContextMenuItem } from '../AtRightClick';
import Arrow2 from '../../../assets/images/icons/arrow2.svg';

const DeclinedTalentMenu: React.FunctionComponent<DeclinedTalentMenuProps> = (
  props: DeclinedTalentMenuProps
) => {
  const dispatch = useAppDispatch();

  const moveToAccepted = () => {
    dispatch(handleSelectTalent(props.idTalent));
    props.openAccepted();
  };

  const moveToShortlist = () => {
    dispatch(handleSelectTalent(props.idTalent));
    props.openShortlist();
  };

  return (
    <>
      <AtContextMenuItem onSelect={moveToAccepted}>
        <AtTypography>
          <img src={Arrow2} alt={'Arrow'} width={20} />
          Move to Accepted
        </AtTypography>
      </AtContextMenuItem>
      <AtContextMenuItem onSelect={moveToShortlist}>
        <AtTypography>
          <RefreshCircle size={20} />
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
    </>
  );
};

interface DeclinedTalentMenuProps {
  idTalent: number;
  openAccepted: () => void;
  openShortlist: () => void;
}

export default DeclinedTalentMenu;
