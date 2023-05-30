import { Grid, Box } from '@mui/material'
import { ArrowLeft2, ArrowRight, TickCircle } from 'iconsax-react'
import { Dispatch, useState } from 'react'
import {
  ClientStatus,
  EmailStatus,
  ListingState,
  ListingType,
  RateType,
  WorkType,
} from '@yjcapp/app'
import { grey2 } from '../../../../../utils/colors'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../../Button/Button'
import AtTabs from '../../../../Tabs/Tabs'
import AtTypography from '../../../../Typography/Typography'
import { Listing } from '../../../../../utils/redux/types/listings.type'
import ProjectStep1 from './steps/Step1'
import ProjectStep2 from './steps/Step2'
import ProjectStep3 from './steps/Step3'
import ProjectStep4 from './steps/Step4'
import Preview from './steps/Preview'
import { handleCreateListing } from '../../../../../utils/redux/actions/listing.action'
import { useAppDispatch } from '../../../../../utils/hooks/reduxHook'
import { StyledDot, StyledFormStepper, StyledStepper } from '..'
import { Client } from '../../../../../utils/redux/types/clients.type'

const CreateProject: React.FC<CreateProjectProps> = (
  props: CreateProjectProps,
) => {
  const [rateType, setRateType] = useState<RateType>()
  const dispatch = useAppDispatch()

  const [project, setProject] = useState<Listing>(new Listing({}))

  const tabs = [
    {
      id: 0,
      content: (
        <ProjectStep1
          setProject={setProject}
          project={project}
          rateType={rateType}
          setRateType={setRateType}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 1,
      content: (
        <ProjectStep2
          setProject={setProject}
          project={project}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 2,
      content: (
        <ProjectStep3
          setProject={setProject}
          project={project}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 3,
      content: (
        <ProjectStep4
          setProject={setProject}
          project={project}
          isSmallScreen={props.isSmallScreen}
        />
      ),
    },
    {
      id: 0,
      content: (
        <Preview
          setProject={setProject}
          project={project}
          isSmallScreen={props.isSmallScreen}
        />
      ),
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
          'difficulty',
        ],
        workTypeDependant: 'timeZone',
        rateToDependant: rateType === RateType.Variable,
      },
      step2: {
        requiredFields: ['jobDescription'],
      },
      step3: {
        requiredFields: ['skills'],
      },
    }

    let fieldsToCheck = fieldsConfig[`step${props.step + 1}`]?.requiredFields

    if (fieldsConfig[`step${props.step + 1}`]?.workTypeDependant) {
      if (project.workType === WorkType.OnSite)
        fieldsToCheck = fieldsToCheck.filter(
          (field: any) =>
            field !== fieldsConfig[`step${props.step + 1}`].workTypeDependant,
        )
    }

    if (fieldsConfig[`step${props.step + 1}`]?.rateToDependant !== undefined) {
      if (rateType === RateType.Fixed)
        fieldsToCheck = fieldsToCheck.filter((field: any) => field !== 'rateTo')
    }

    if (props.step === 2) {
      return !(project.skills?.length > 0)
    } else if (props.step <= 1) {
      return !fieldsToCheck?.every(
        (field: any) =>
          project[field as keyof Listing] !== '' &&
          project[field as keyof Listing] !== undefined &&
          project[field as keyof Listing] !== 0,
      )
    } else {
      return false
    }
  }

  const handleSubmitListing = (status: ListingState) => {
    if (props.step + 1 === tabs.length) {
      dispatch(
        handleCreateListing({
          ...project,
          soloClient: {
            id: props.client.id,
            companyName: props.client.companyName,
            status: ClientStatus.Active,
            emailStatus: EmailStatus.Confirmed,
          },
          listingType: ListingType.Project,
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

export default CreateProject
interface CreateProjectProps {
  client: Client
  step: number
  setStep: Dispatch<React.SetStateAction<number>>
  isSmallScreen?: boolean
}
