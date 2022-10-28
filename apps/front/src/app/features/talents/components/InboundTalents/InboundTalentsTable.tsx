import AtTableBody from '../../../../components/AtTable/AtTableBody';
import AtTableCell from '../../../../components/AtTable/AtTableCell';
import AtTableHead from '../../../../components/AtTable/AtTableHead';
import { AtTableRow } from '../../../../components/AtTable/AtTableRow';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey, grey3 } from '../../../../utils/colors';
import React, { useState } from 'react';
import AtTable from '../../../../components/AtTable/AtTable';
import { Skill, Talent } from '../../../../utils/redux/types/talents.type';
import { Box } from '@mui/material';
import AtTag from '../../../../components/AtTag/AtTag';
import AtGroupTag from '../../../../components/AtGroupTag/AtGroupTag';

const InboundTalentsTable: React.FunctionComponent<InboundTalentsTableProps> = (
  props: InboundTalentsTableProps
) => {
  const [position, setPosition] = useState<number | null>(null);

  return (
    <AtTable>
      <AtTableHead>
        <AtTableRow>
          <AtTableCell>Talent</AtTableCell>
          <AtTableCell>Applied</AtTableCell>
          <AtTableCell>Availability</AtTableCell>
          <AtTableCell align="right">Skills</AtTableCell>
        </AtTableRow>
      </AtTableHead>
      <AtTableBody position={position}>
        {props.talents.map((talent: Talent) => (
          <AtTableRow
            key={talent.id}
            hover={true}
            onClick={() => props.onClick(talent.id)}
            setPosition={setPosition}
          >
            <AtTableCell>
              <Box display={'flex'} flexDirection={'column'}>
                <Box display={'flex'} gap={'5px'} alignItems={'center'}>
                  <AtTypography variant={'body1'} bold={true}>
                    {talent.fullName}
                  </AtTypography>
                  {talent.group && <AtGroupTag label={talent.group} />}
                </Box>
                <AtTypography variant={'caption'} color={grey}>
                  {talent.jobName}
                </AtTypography>
              </Box>
            </AtTableCell>
            <AtTableCell>
              <AtTypography>{talent.applied}</AtTypography>
            </AtTableCell>
            <AtTableCell>
              <AtTypography>{talent.jobType}</AtTypography>
            </AtTableCell>
            <AtTableCell align={'right'}>
              {talent.skills && talent.skills.length > 0 ? (
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  gap={'10px'}
                  justifyContent={'flex-end'}
                >
                  {talent.skills?.map((skill: Skill, index: number) => (
                    <AtTag label={skill.label} delete={false} key={index} />
                  ))}
                </Box>
              ) : (
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <AtTypography color={grey3}>
                    No skills been added by {talent.fullName}
                  </AtTypography>
                </Box>
              )}
            </AtTableCell>
          </AtTableRow>
        ))}
      </AtTableBody>
    </AtTable>
  );
};

interface InboundTalentsTableProps {
  talents: Talent[];
  onClick: (id: number) => void;
}

export default InboundTalentsTable;
