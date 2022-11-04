import AtTableBody from '../../../../components/AtTable/AtTableBody';
import AtTableCell from '../../../../components/AtTable/AtTableCell';
import AtTableHead from '../../../../components/AtTable/AtTableHead';
import { AtTableRow } from '../../../../components/AtTable/AtTableRow';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey, grey3 } from '../../../../utils/colors';
import React, { useEffect, useRef, useState } from 'react';
import AtTable from '../../../../components/AtTable/AtTable';
import { Skill, Talent } from '../../../../utils/redux/types/talents.type';
import { Box, Tooltip } from '@mui/material';
import AtTag from '../../../../components/AtTag/AtTag';
import AtGroupTag from '../../../../components/AtGroupTag/AtGroupTag';
import styled from 'styled-components';
import useWindowSize from '../../../../utils/hooks/useWindowSize';
import AtRightClick from '../../../../components/AtRightClick/AtRightClick';
import InboundTalentMenu from '../../../../components/AtRightClick/ContextMenus/InboundTalentMenu';

const StyledTag = styled(AtTag)`
  max-width: 150px;
`;

const InboundTalentsTable: React.FunctionComponent<InboundTalentsTableProps> = (
  props: InboundTalentsTableProps
) => {
  const [position, setPosition] = useState<number | null>(null);
  const skillsRef = useRef<any>(null);
  const [maxItemPerLine, setMaxItemPerLine] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    setMaxItemPerLine(Math.floor(skillsRef.current?.clientWidth / 150));
  }, [windowSize]);

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
          <AtRightClick
            contextMenu={
              <InboundTalentMenu
                idTalent={talent.id}
                openShortlist={props.openShortlist}
              />
            }
          >
            <AtTableRow
              key={talent.id}
              hover={true}
              onClick={() => props.onClick(talent.id)}
              setPosition={setPosition}
            >
              <AtTableCell>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  textOverflow={'ellipsis'}
                  whiteSpace={'nowrap'}
                >
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
                    ref={skillsRef}
                  >
                    {talent.skills
                      ?.slice(0, maxItemPerLine)
                      .map((skill: Skill, index: number) => (
                        <StyledTag
                          label={skill.label}
                          delete={false}
                          key={index}
                        />
                      ))}
                    {talent.skills.slice(maxItemPerLine).length > 0 && (
                      <Tooltip
                        title={
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            gap={'5px'}
                          >
                            {talent.skills
                              .slice(maxItemPerLine)
                              .map((skill: Skill, index: number) => (
                                <AtTypography key={index}>
                                  {skill.label}
                                </AtTypography>
                              ))}
                          </Box>
                        }
                        arrow
                      >
                        <span>
                          <StyledTag
                            hover={true}
                            variant={'outlined'}
                            label={`${
                              talent.skills.slice(maxItemPerLine).length
                            } more`}
                          />
                        </span>
                      </Tooltip>
                    )}
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
          </AtRightClick>
        ))}
      </AtTableBody>
    </AtTable>
  );
};

interface InboundTalentsTableProps {
  talents: Talent[];
  onClick: (id: number) => void;
  openShortlist: () => void;
}

export default InboundTalentsTable;
