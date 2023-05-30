import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtTypography from '../../../../../../Typography/Typography'
import { black, grey2 } from '../../../../../../../utils/colors'
import { getCurrencySymbol, plurialize } from '../../../../../../../utils/helpers'
import { ClientListing, WorkType } from '@yjcapp/app'
import { Edit } from 'iconsax-react'
import ModalGeneralInformation from '../../../../../../Modal/modals/ModalGeneralInformation'
import moment from 'moment'

const GeneralInformation: React.FunctionComponent<GeneralProps> = (
  props: GeneralProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'General Information'}
      padding={props.isSmallScreen ? '0px' : '20px'}
      backgroundColor={'#FBFCFF'}
      icon={props.isAuthenticated &&
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Number of Individuals: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography>
              {props.listing.individuals}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Work Type: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <Box display={'flex'} gap={'15px'}>
              <AtTypography >
                {props.listing.workType}
              </AtTypography>

              {props.listing.workType !== WorkType.OnSite &&
                <AtTypography color={grey2} variant={'caption'}>
                  GMT {props.listing.timeZone}
                </AtTypography>}
            </Box>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Availability: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography >
              {props.listing.availability}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Project Length: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography >
              {plurialize(props.listing.projectLength, 'month')}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Start Date: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography >
              {moment(props.listing.startDate).format('DD.MM.YYYY')}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Rate: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <Box display={'flex'} gap={'15px'}>
              <AtTypography >
                {props.listing.exactRate ? 'Fixed' : 'Variable'}
              </AtTypography>

              {props.listing.exactRate ?
                <AtTypography color={grey2} variant={'caption'}>
                  {getCurrencySymbol(props.listing.currency)}
                  {props.listing.exactRate}
                </AtTypography>
                :
                <AtTypography color={grey2} variant={'caption'}>
                  {!props.listing.rateTo && 'From '}
                  {props.listing.rateFrom ? getCurrencySymbol(props.listing.currency) + props.listing.rateFrom : 'Not defined'}
                  {props.listing.rateTo && ' - ' + getCurrencySymbol(props.listing.currency) + props.listing.rateTo}
                </AtTypography>}
            </Box>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Difficulty: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography >
              {props.listing.difficulty}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Learning: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={!props.listing.learningLink ? grey2 : black} variant={props.listing.learningLink ? 'body2' : 'caption'}>
              {props.listing.learningLink ?? 'No links attached'}
            </AtTypography>
          </Grid>
        </Grid>
      </Box>

      <ModalGeneralInformation
        open={openModal}
        listing={props.listing}
        onClose={() => setOpenModal(false)}
      />

    </AtFrame>
  )
}

interface GeneralProps {
  listing: ClientListing
  isAuthenticated?: boolean
  isSmallScreen?: boolean
}

export default GeneralInformation
