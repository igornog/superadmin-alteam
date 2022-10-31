import { Box } from '@mui/material';
import { AddCircle, Edit } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import AtCopyTo from '../../../../components/AtCopyTo/AtCopyTo';
import AtLine from '../../../../components/AtLine/AtLine';
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { black, grey4 } from '../../../../utils/colors';
import { getCorrectNetwork } from '../../../../utils/helpers';
import { useAppDispatch } from '../../../../utils/hooks/reduxHook';
import { handleModal } from '../../../../utils/redux/actions/settings.action';
import { ModalVariant } from '../../../../utils/redux/types/settings.type';
import { Link, Talent } from '../../../../utils/redux/types/talents.type';

export const StyledLink = styled(Box)<{ padding?: string }>`
  border: 1px solid ${grey4};
  border-radius: 5px;
  padding: ${({ padding }) => (padding ? padding : '20px')};
  display: flex;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    border-color: ${black};
    cursor: pointer;
    transition: 0.3s;
  }
`;

const TalentLinks: React.FunctionComponent<TalentLinksProps> = (
  props: TalentLinksProps
) => {
  const dispatch = useAppDispatch();

  const handleAddLink = () => {
    dispatch(handleModal(ModalVariant.Link));
  };

  return props.talent.links && props.talent?.links.length > 0 ? (
    <AtTalentFrame
      title={'Additional Links'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={handleAddLink}
      gap={0}
    >
      {props.talent.links.map((item: Link) => (
        <>
          <AtLine spacing={15} />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} alignItems={'center'} gap={'10px'}>
              {getCorrectNetwork(item.link)}
              <AtTypography>{item.link}</AtTypography>
            </Box>
            <AtCopyTo text={item.link} />
          </Box>
        </>
      ))}
    </AtTalentFrame>
  ) : (
    <StyledLink onClick={handleAddLink}>
      <AtTypography>
        <AddCircle size={20} /> Add links
      </AtTypography>
    </StyledLink>
  );
};

interface TalentLinksProps {
  talent: Talent;
}

export default TalentLinks;
