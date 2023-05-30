import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import { grey, grey2 } from '../../../../utils/colors'
import AtTypography from '../../../AtTypography/AtTypography'
import moment from 'moment'
import { getCurrencySymbol, plurialize } from '../../../../utils/helpers'
import { Edit } from 'iconsax-react'
import AtFrame from '../../../AtFrame/AtFrame'
import { ListingType, WorkType } from '@yjcapp/app'
import ModalGeneralInformation from '../../../AtModal/modals/listings/ModalGeneralInformation'

const GeneralInformations: React.FunctionComponent<GeneralProps> = (
  props: GeneralProps,
) => {
  const [openModal, setOpenModal] = useState(false)
  
  return (
    <AtFrame
      title={'General Information'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
      backgroundColor={'#FBFCFF'}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>{props.selectedListing.listingType === ListingType.Project ? 'Number of Individuals' : 'Team Size:'} </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.selectedListing.individuals}
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
                {props.selectedListing.workType}
              </AtTypography>

              {props.selectedListing.workType !== WorkType.OnSite &&
                <AtTypography color={grey2} variant={'caption'}>
                  GMT {props.selectedListing.timeZone}
                </AtTypography>}
            </Box>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Availability: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.selectedListing.availability}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Project Lenght: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {plurialize(props.selectedListing.projectLength, 'month')}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Start Date: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {moment(props.selectedListing.startDate).format('DD.MM.YYYY')}
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
                {props.selectedListing.exactRate ? 'Fixed' : 'Variable'}
              </AtTypography>

              {props.selectedListing.exactRate ?
                <AtTypography color={grey2} variant={'caption'}>
                  {getCurrencySymbol(props.selectedListing.currency)}
                  {props.selectedListing.exactRate}
                </AtTypography>
                :
                <AtTypography color={grey2} variant={'caption'}>
                  {!props.selectedListing.rateTo && 'From '}
                  {props.selectedListing.rateFrom ? getCurrencySymbol(props.selectedListing.currency) + props.selectedListing.rateFrom : 'Not defined'}
                  {props.selectedListing.rateTo && ' - ' + getCurrencySymbol(props.selectedListing.currency) + props.selectedListing.rateTo}
                </AtTypography>}
            </Box>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Difficulty: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.selectedListing.difficulty}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Learning: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.selectedListing.learningLink}
            </AtTypography>
          </Grid>
        </Grid>
      </Box>

      <ModalGeneralInformation
        open={openModal}
        listing={props.selectedListing}
        onClose={() => setOpenModal(false)}
      />
      
    </AtFrame>
  )
}

interface GeneralProps {
  selectedListing: any
}

export default GeneralInformations
