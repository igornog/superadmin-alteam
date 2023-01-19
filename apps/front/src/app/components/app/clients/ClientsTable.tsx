import { Box } from '@mui/material'
import React, { useState } from 'react'
import { grey, grey3 } from '../../../utils/colors'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { Client } from '../../../utils/redux/types/clients.type'
import { Column } from '../../../utils/redux/types/settings.type'
import moment from 'moment'
import AtRightClick from '../../AtRightClick/AtRightClick'
import ClientMenu from '../../AtRightClick/ContextMenus/ClientMenu'
import AtTable from '../../AtTable/AtTable'
import AtTableBody from '../../AtTable/AtTableBody'
import AtTableCell from '../../AtTable/AtTableCell'
import AtTableHead from '../../AtTable/AtTableHead'
import { AtTableRow } from '../../AtTable/AtTableRow'
import AtTypography from '../../AtTypography/AtTypography'
import ClientLogo from './ClientLogo'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import { stringMatch } from '../../../utils/helpers'

const ClientsTable: React.FunctionComponent<ClientTableProps> = (
  props: ClientTableProps,
) => {
  const [position, setPosition] = useState<number | null>(null)
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const settings = useAppSelector((state) => state.settings)

  const haveToDisplay = (column: Column) => {
    return props.tableColumns?.includes(column)
  }

  return (
    <AtTable>
      <AtTableHead>
        <AtTableRow>
          {haveToDisplay(Column.Client) && <AtTableCell>Client</AtTableCell>}

          {haveToDisplay(Column.Received) && (
            <AtTableCell>Received</AtTableCell>
          )}

          {haveToDisplay(Column.Listings) && (
            <AtTableCell>Listings</AtTableCell>
          )}

          {haveToDisplay(Column.Assignees) && (
            <AtTableCell>Assignees</AtTableCell>
          )}

          {haveToDisplay(Column.Email) && <AtTableCell>Email</AtTableCell>}

          {haveToDisplay(Column.Phone) && <AtTableCell>Phone</AtTableCell>}

          {haveToDisplay(Column.CompanyUrl) && (
            <AtTableCell align="right">Company Url</AtTableCell>
          )}
        </AtTableRow>
      </AtTableHead>
      <AtTableBody position={position}>
        {props.clients.map((client: Client) => (
          <AtRightClick
            disabled={activeTab.clientRightClick.length === 0}
            contextMenu={<ClientMenu />}
          >
            <AtTableRow
              key={client.id}
              $hover={true}
              onClick={() => client.id && props.openClient(client.id)}
              $setPosition={setPosition}
            >
              {haveToDisplay(Column.Client) && (
                <AtTableCell>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    textOverflow={'ellipsis'}
                    whiteSpace={'nowrap'}
                  >
                    <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                      <Box width={'28px'} height={'28px'}>
                        <ClientLogo logo={client.logo} />
                      </Box>

                      <Box display={'flex'} flexDirection={'column'}>
                        <AtTypography variant={'body1'}>
                          {stringMatch(
                            client.companyName,
                            settings.filters.searchName ?? '',
                          )}
                        </AtTypography>
                        <AtTypography variant={'caption'} color={grey}>
                          {client.industry}
                        </AtTypography>
                      </Box>
                    </Box>
                  </Box>
                </AtTableCell>
              )}

              {haveToDisplay(Column.Received) && (
                <AtTableCell>
                  <AtTypography>
                    {moment(client.received).format('DD.MM.YYYY')}
                  </AtTypography>
                </AtTableCell>
              )}

              {haveToDisplay(Column.Listings) && (
                <AtTableCell>
                  {/* <AtTypography>{client.listings?.length ?? 0}</AtTypography> */}
                </AtTableCell>
              )}

              {haveToDisplay(Column.Assignees) && (
                <AtTableCell>
                  <AtTypography>
                    <Box display={'flex'} gap={'10px'}>
                      <AtTypography color={grey3}>Nobody assigned</AtTypography>

                      <AtButton
                        kind={AtButtonKind.Default}
                        variant={AtButtonVariant.Text}
                        name={'Assign now'}
                        fontSize={'14px'}
                      />
                    </Box>
                  </AtTypography>
                </AtTableCell>
              )}

              {haveToDisplay(Column.Email) && (
                <AtTableCell>
                  <AtTypography>{client.email}</AtTypography>
                </AtTableCell>
              )}

              {haveToDisplay(Column.Phone) && (
                <AtTableCell>
                  <AtTypography>{client.phoneNumber}</AtTypography>
                </AtTableCell>
              )}

              {haveToDisplay(Column.CompanyUrl) && (
                <AtTableCell align={'right'}>{client.companyUrl}</AtTableCell>
              )}
            </AtTableRow>
          </AtRightClick>
        ))}
      </AtTableBody>
    </AtTable>
  )
}

interface ClientTableProps {
  clients: Client[]
  openClient: (id: number) => void
  tableColumns?: Column[]
}

export default ClientsTable
