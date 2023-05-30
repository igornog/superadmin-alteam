import { ArrowLeft2, ArrowRight, TickCircle } from 'iconsax-react'
import { Dispatch, useState } from 'react'
import {
  ClientStatus,
  EmailStatus,
  ListingState,
  ListingType,
  Role,
  WorkType,
} from '@yjcapp/app'
import { grey2 } from '../../../../../utils/colors'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../../Button/Button'
import AtTabs from '../../../../Tabs/Tabs'
import AtTypography from '../../../../Typography/Typography'
import TeamStep1 from './steps/Step1'
import { Listing } from '../../../../../utils/redux/types/listings.type'
import { Grid, Box } from '@mui/material'
import { useAppDispatch } from '../../../../../utils/hooks/reduxHook'
import TeamStep2 from './steps/Step2'
import TeamStep3 from './steps/Step3'
import TeamStep4 from './steps/Step4'
import TeamStep5 from './steps/Step5'
import { handleCreateListing } from '../../../../../utils/redux/actions/listing.action'
import { StyledDot, StyledStepper, StyledFormStepper } from '..'
import Preview from './steps/Preview'
import { Client } from '../../../../../utils/redux/types/clients.type'

const CreateTeam: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  const [team, setTeam] = useState<Listing>(new Listing({}))
  const [knownTotalPrice, setKnownTotalPrice] = useState<boolean>(false)

  const tabs = [
    {
      id: 0,
      content: (
        <TeamStep1
          setTeam={setTeam}
          isSmallScreen={props.isSmallScreen}
          team={team}
          knownTotalPrice={knownTotalPrice}
          setKnownTotalPrice={setKnownTotalPrice}
        />
      ),
    },
    {
      id: 1,
      content: (
        <TeamStep2
          setTeam={setTeam}
          team={team}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 2,
      content: (
        <TeamStep3
          setTeam={setTeam}
          team={team}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 3,
      content: (
        <TeamStep4
          setTeam={setTeam}
          team={team}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 4,
      content: (
        <TeamStep5
          setTeam={setTeam}
          team={team}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 5,
      content: (
        <Preview
          setTeam={setTeam}
          team={team}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
  ]

  const isDisabled = () => {
    const fieldsConfig: any = {
      step1: {
        requiredFields: [
          'listingName',
          'individuals',
          'workType',
          'timeZone',
          'availability',
          'projectLength',
          'startDate',
          'exactRate',
          'difficulty',
        ],
        workTypeDependant: 'timeZone',
        totalPriceDependant: 'exactRate',
      },
      step3: {
        requiredFields: ['jobDescription'],
      },
      step4: {
        requiredFields: ['skills'],
      },
    }

    let fieldsToCheck = fieldsConfig[`step${props.step + 1}`]?.requiredFields

    if (
      fieldsConfig[`step${props.step + 1}`]?.workTypeDependant ||
      fieldsConfig[`step${props.step + 1}`]?.totalPriceDependant
    ) {
      if (team.workType === WorkType.OnSite)
        fieldsToCheck = fieldsToCheck.filter(
          (field: any) =>
            field !== fieldsConfig[`step${props.step + 1}`].workTypeDependant,
        )

      if (!knownTotalPrice)
        fieldsToCheck = fieldsToCheck.filter(
          (field: any) =>
            field !== fieldsConfig[`step${props.step + 1}`].totalPriceDependant,
        )
    }

    if (props.step === 1) {
      return !team.roles.every((obj: Role) => obj.roleName && obj.price)
    } else if (props.step === 3) {
      return !(team.skills?.length > 0)
    } else if (props.step <= 2) {
      return !fieldsToCheck?.every(
        (field: any) =>
          team[field as keyof Listing] !== '' &&
          team[field as keyof Listing] !== undefined &&
          team[field as keyof Listing] !== 0,
      )
    } else {
      return false
    }
  }

  const handleSubmitListing = (status: ListingState) => {
    if (props.step + 1 === tabs.length) {
      dispatch(
        handleCreateListing({
          ...team,
          soloClient: {
            id: props.client.id,
            companyName: props.client.companyName,
            status: ClientStatus.Active,
            emailStatus: EmailStatus.Confirmed
          },
          listingType: ListingType.Team,
          status: status,
        }),
      )
    }

    props.setStep(props.step + 1)
  }

  const isLastStep = props.step + 1 === tabs.length

  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid
          item
          xs={10}
          display={'flex'}
          flexDirection={'column'}
          gap={'20px'}
          maxWidth={'-webkit-fill-available'}
        >
          <Box position={'relative'} zIndex={0}>
            <form>
              <AtTabs tabs={tabs} step={props.step} />
            </form>
          </Box>

          <Box display={'flex'} gap={'12px'} justifyContent={'center'}>
            {[...Array(tabs.length).keys()].map((item: number) => (
              <StyledDot key={item} isActive={props.step === item} />
            ))}
          </Box>
        </Grid>
      </Grid>

      <StyledStepper>
        <StyledFormStepper>
          {props.step > 0 && (
            <AtButton
              variant={AtButtonVariant.Contained}
              startIcon={<ArrowLeft2 />}
              kind={AtButtonKind.Default}
              onClick={() => props.setStep(props.step - 1)}
            />
          )}
          <AtTypography color={grey2}>
            Step{' '}
            <span>
              {props.step + 1}/
              {tabs.length}
            </span>
          </AtTypography>

          <AtButton
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={isLastStep ? 'Post' : 'Next Step'}
            disabled={isDisabled()}
            onClick={() => handleSubmitListing(ListingState.Active)}
            endIcon={isLastStep ? <TickCircle /> : <ArrowRight />}
          />
        </StyledFormStepper>
      </StyledStepper>
    </>
  )
}

interface Props {
  client: Client
  step: number
  setStep: Dispatch<React.SetStateAction<number>>
  isSmallScreen?: boolean
}

export default CreateTeam
