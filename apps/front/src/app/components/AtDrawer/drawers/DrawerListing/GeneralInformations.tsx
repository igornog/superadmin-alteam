import { Box, Grid } from '@mui/material'
import React from 'react'
import { grey, grey2 } from '../../../../utils/colors'
import AtTypography from '../../../AtTypography/AtTypography'
import moment from 'moment'
import { plurialize } from '../../../../utils/helpers'
import { Edit } from 'iconsax-react'
import AtFrame from '../../../AtFrame/AtFrame'

const GeneralInformations: React.FunctionComponent<GeneralProps> = (
  props: GeneralProps,
) => {
  return (
    <AtFrame
      title={'General Information'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => undefined}
      backgroundColor={'#FBFCFF'}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Number of Individuals: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.selectedListing.nbIndividual}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Work Type: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <Box display={'flex'} gap={'15px'}>
              <AtTypography color={grey}>
                {props.selectedListing.workType}:
              </AtTypography>

              <AtTypography color={grey2} variant={'caption'}>
                {props.selectedListing.hours} hours per week
              </AtTypography>
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
              <AtTypography color={grey}>
                {props.selectedListing.rateType}:
              </AtTypography>

              <AtTypography color={grey2} variant={'caption'}>
                £{props.selectedListing.rateFrom} - £
                {props.selectedListing.rateTo}
              </AtTypography>
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
              {props.selectedListing.learning}
            </AtTypography>
          </Grid>
        </Grid>
      </Box>
    </AtFrame>
  )
}

interface GeneralProps {
  selectedListing: any
}

export default GeneralInformations
