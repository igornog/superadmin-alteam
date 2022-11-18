import { Edit, Share, Sms, TickCircle, TrushSquare } from 'iconsax-react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook';
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action';
import AtTypography from '../../AtTypography/AtTypography';
import { AtContextMenuItem } from '../AtRightClick';
import Arrow2 from '../../../assets/images/icons/arrow2.svg';
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector';
import { RightClick } from '../../../utils/types';
import { Talent } from '../../../utils/redux/types/talents.type';
import { grey2 } from '../../../utils/colors';

const TalentMenu: React.FunctionComponent<TalentMenuProps> = (
  props: TalentMenuProps
) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => getActiveTab(state));
  const [linkCopied, setLinkCopied] = useState(false);

  const isCurrentTabAllowed = (rightclickFunc: RightClick) => {
    return activeTab.content.talentRightClick.includes(rightclickFunc);
  };

  const moveToAccepted = () => {
    dispatch(handleSelectTalent(props.talent.id));
    props.openAccepted();
  };

  const moveToShortlist = () => {
    dispatch(handleSelectTalent(props.talent.id));
    props.openShortlist();
  };

  const sendEmailToTalent = () => {
    dispatch(handleSelectTalent(props.talent.id));
    props.openEmailToTalent();
  };

  const copyLinkToClipboard = (e: Event) => {
    e.preventDefault();
    navigator.clipboard.writeText(props.talent.fullName);
    setLinkCopied(true);
  };

  return linkCopied ? (
    <AtContextMenuItem>
      <AtTypography color={grey2}>
        <TickCircle size={20} />
        Talent link copied to clipboard
      </AtTypography>
    </AtContextMenuItem>
  ) : (
    <>
      {isCurrentTabAllowed(RightClick.MoveToAccepted) && (
        <AtContextMenuItem onSelect={moveToAccepted}>
          <AtTypography>
            <img src={Arrow2} alt={'Arrow'} width={20} />
            Move to Accepted
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.MoveToShortlisted) && (
        <AtContextMenuItem onSelect={moveToShortlist}>
          <AtTypography>
            <img src={Arrow2} alt={'Arrow'} width={20} />
            Move to Shortlisted
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.EditTalentFolders) && (
        <AtContextMenuItem>
          <AtTypography>
            <Edit size={20} />
            Edit Talent Folders
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.SendEmailToTalent) && (
        <AtContextMenuItem onSelect={sendEmailToTalent}>
          <AtTypography>
            <Sms size={20} />
            Send Email to Talent
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.ShareTalent) && (
        <AtContextMenuItem onSelect={(e: Event) => copyLinkToClipboard(e)}>
          <AtTypography>
            <Share size={20} />
            Copy Public Link
          </AtTypography>
        </AtContextMenuItem>
      )}

      {isCurrentTabAllowed(RightClick.MoveToDesclined) && (
        <AtContextMenuItem variant="danger">
          <AtTypography>
            <TrushSquare size={20} />
            Move to Declined
          </AtTypography>
        </AtContextMenuItem>
      )}
    </>
  );
};

interface TalentMenuProps {
  talent: Talent;
  openAccepted: () => void;
  openShortlist: () => void;
  openEmailToTalent: () => void;
}

export default TalentMenu;
