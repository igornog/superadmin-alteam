import { ArrowSwapHorizontal, Share, Sms, TrushSquare } from 'iconsax-react';
import React from 'react';
import AtTypography from '../../AtTypography/AtTypography';
import { AtContextMenuItem } from '../AtRightClick';

const InboundCardMenu: React.FunctionComponent = () => {
  return (
    <>
      <AtContextMenuItem>
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

export default InboundCardMenu;
