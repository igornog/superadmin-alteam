import { Grid, Box } from '@mui/material'
import { ArrowLeft2, ArrowRight } from 'iconsax-react'
import { Dispatch, useState } from 'react'
import { ListingState, ListingType, Role, WorkType } from '@yjcapp/app'
import { grey2, black } from '../../../../../utils/colors'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../../AtButton/AtButton'
import AtTabs from '../../../../AtTabs/AtTabs'
import AtTypography from '../../../../AtTypography/AtTypography'
import { StyledDot, StyledStepper, StyledFormStepper } from '../../../AtDrawer'
import TeamStep1 from './steps/Step1'
import TeamStep2 from './steps/Step2'
import TeamStep3 from './steps/Step3'
import TeamStep4 from './steps/Step4'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../../utils/redux/selectors/clients.selector'
import TeamStep5 from './steps/Step5'
import { Client } from '../../../../../utils/redux/types/clients.type'
import { Listing } from '../../../../../utils/redux/types/listings.type'
import { handleCreateListing } from '../../../../../utils/redux/actions/listing.action'

const CreateTeam: React.FunctionComponent<CreateTeamProps> = (
  props: CreateTeamProps,
) => {
  const dispatch = useAppDispatch()
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const [team, setTeam] = useState<Listing>(new Listing({}))
  const [knownTotalPrice, setKnownTotalPrice] = useState<boolean>(false)

  const tabs = [
    {
      id: 0,
      content: (
        <TeamStep1
          setTeam={setTeam}
          team={team}
          knownTotalPrice={knownTotalPrice}
          setKnownTotalPrice={setKnownTotalPrice}
        />
      ),
    },
    {
      id: 1,
      content: <TeamStep2 setTeam={setTeam} team={team} />,
    },
    {
      id: 2,
      content: <TeamStep3 setTeam={setTeam} team={team} />,
    },
    {
      id: 3,
      content: <TeamStep4 setTeam={setTeam} team={team} />,
    },
    {
      id: 4,
      content: <TeamStep5 setTeam={setTeam} team={team} />,
    },
  ]

  const isDisabled = () => {
    // TODO: Remove this and use something like react-hook-form
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

  const handleSubmitProject = () => {
    if (props.step + 1 === tabs.length) {
      dispatch(
        handleCreateListing({
          ...team,
          soloClient: { id: selectedClient.id } as Client,
          listingType: ListingType.Team,
          status: ListingState.Draft,
        }),
      )
    }

    props.setStep(props.step + 1)
  }

  return (
    <>
      <Grid container={true} justifyContent={'center'}>
        <Grid xs={10} display={'flex'} flexDirection={'column'} gap={'20px'}>
          <Box position={'relative'} zIndex={0}>
            <form>
              <AtTabs tabs={tabs} step={props.step} />
            </form>
          </Box>

          <Box display={'flex'} gap={'12px'} justifyContent={'center'}>
            {[...Array(tabs.length).keys()].map((item: number) => (
              <StyledDot isActive={props.step === item} />
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
            <Box>
              <span style={{ color: black }}>{props.step + 1}</span>/
              {tabs.length}
            </Box>
          </AtTypography>
          <AtButton
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Next Step'}
            disabled={isDisabled()}
            onClick={handleSubmitProject}
            endIcon={<ArrowRight />}
          />
        </StyledFormStepper>
      </StyledStepper>
    </>
  )
}

interface CreateTeamProps {
  step: number
  setStep: Dispatch<React.SetStateAction<number>>
}

export default CreateTeam
