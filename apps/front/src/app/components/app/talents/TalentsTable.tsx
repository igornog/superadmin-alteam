import { Box, Tooltip } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { grey, grey3 } from '../../../utils/colors';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import { Column } from '../../../utils/redux/types/settings.type';
import { Talent, Skill } from '../../../utils/redux/types/talents.type';
import AtGroupTag from '../../AtGroupTag/AtGroupTag';
import AtRightClick from '../../AtRightClick/AtRightClick';
import TalentMenu from '../../AtRightClick/ContextMenus/TalentMenu';
import AtTable from '../../AtTable/AtTable';
import AtTableBody from '../../AtTable/AtTableBody';
import AtTableCell from '../../AtTable/AtTableCell';
import AtTableHead from '../../AtTable/AtTableHead';
import { AtTableRow } from '../../AtTable/AtTableRow';
import AtTag from '../../AtTag/AtTag';
import AtTypography from '../../AtTypography/AtTypography';

const StyledTag = styled(AtTag)`
  max-width: 150px;
`;

const StyledTagClients = styled(AtTag)`
  border-radius: 5px;
`;

const TalentsTable: React.FunctionComponent<TalentsTableProps> = (
  props: TalentsTableProps
) => {
  const [position, setPosition] = useState<number | null>(null);
  const [maxItemPerLine, setMaxItemPerLine] = useState(0);
  const skillsRef = useRef<any>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    setMaxItemPerLine(Math.floor(skillsRef.current?.clientWidth / 150));
  }, [windowSize]);

  const haveToDisplay = (column: Column) => {
    return props.tableColumns?.includes(column);
  };

  return (
    <AtTable>
      <AtTableHead>
        <AtTableRow>
          {haveToDisplay(Column.Talent) && <AtTableCell>Talent</AtTableCell>}
          {haveToDisplay(Column.Applied) && <AtTableCell>Applied</AtTableCell>}
          {haveToDisplay(Column.Availability) && (
            <AtTableCell>Availability</AtTableCell>
          )}
          {haveToDisplay(Column.AssignedTo) && (
            <AtTableCell>Assigned to</AtTableCell>
          )}

          {haveToDisplay(Column.Skills) && (
            <AtTableCell align="right">Skills</AtTableCell>
          )}
        </AtTableRow>
      </AtTableHead>
      <AtTableBody position={position}>
        {props.talents.map((talent: Talent) => (
          <AtRightClick
            contextMenu={
              <TalentMenu
                talent={talent}
                openShortlist={props.openShortlist}
                openAccepted={props.openAccepted}
                openEmailToTalent={props.openEmailToTalent}
              />
            }
          >
            <AtTableRow
              key={talent.id}
              hover={true}
              onClick={() => props.openTalent(talent.id)}
              setPosition={setPosition}
            >
              {haveToDisplay(Column.Talent) && (
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
              )}
              {haveToDisplay(Column.Applied) && (
                <AtTableCell>
                  <AtTypography>{talent.applied}</AtTypography>
                </AtTableCell>
              )}
              {haveToDisplay(Column.Availability) && (
                <AtTableCell>
                  <AtTypography>{talent.jobType}</AtTypography>
                </AtTableCell>
              )}
              {haveToDisplay(Column.AssignedTo) && (
                <AtTableCell>
                  <Tooltip
                    title={
                      <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={'5px'}
                      >
                        5 more
                      </Box>
                    }
                    arrow={true}
                  >
                    <span>
                      <StyledTagClients
                        variant={'outlined'}
                        label={`5 clients`}
                      />
                    </span>
                  </Tooltip>
                </AtTableCell>
              )}
              {haveToDisplay(Column.Skills) && (
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
                          arrow={true}
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
              )}
            </AtTableRow>
          </AtRightClick>
        ))}
      </AtTableBody>
    </AtTable>
  );
};

interface TalentsTableProps {
  talents: Talent[];
  openTalent: (id: number) => void;
  openShortlist: () => void;
  openAccepted: () => void;
  openEmailToTalent: () => void;
  tableColumns?: Column[];
}

export default TalentsTable;