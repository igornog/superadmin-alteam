import { Box, Grid } from '@mui/material'
import React from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtTypography from '../../../../../../Typography/Typography'
import { black, grey2 } from '../../../../../../../utils/colors'
import { getCurrencySymbol, plurialize } from '../../../../../../../utils/helpers'
import { WorkType } from '@yjcapp/app'

const GeneralInformations: React.FunctionComponent<GeneralProps> = (
  props: GeneralProps,
) => {
  return (
    <AtFrame
      title={'General Information'}
      onClick={() => undefined}
      backgroundColor={'#FBFCFF'}
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
              {props.listing.startDate}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Rate: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <Box display={'flex'} gap={'15px'}>

              <AtTypography>
                {getCurrencySymbol(props.listing.currency)}
                {props.listing.roles.reduce((acc: any, role: { price: any }) => {
                  if (role.price) {
                    return acc + role.price
                  }

                  return acc
                }, 0)}</AtTypography>
              {props.listing.exactRate &&
                <>
                  <span>{'/'}</span>
                  <AtTypography >
                    {getCurrencySymbol(props.listing.currency)}
                    {props.listing.exactRate}
                  </AtTypography>
                </>
              }
              <AtTypography color={grey2} variant={'caption'}>
                monthly
              </AtTypography>
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
    </AtFrame>
  )
}

interface GeneralProps {
  listing: any
}

export default GeneralInformations
