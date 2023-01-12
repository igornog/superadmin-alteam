import { Grid, Box } from '@mui/material'
import { ArrowLeft2, ArrowRight } from 'iconsax-react'
import { Dispatch, useState } from 'react'
import { ClientProject, RateType, WorkType } from '@yjcapp/app'
import { grey2, black } from '../../../../../utils/colors'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../../AtButton/AtButton'
import AtTabs from '../../../../AtTabs/AtTabs'
import AtTypography from '../../../../AtTypography/AtTypography'
import { StyledDot, StyledStepper, StyledFormStepper } from '../../../AtDrawer'
import ProjectStep1 from './steps/Step1'
import ProjectStep2 from './steps/Step2'
import ProjectStep3 from './steps/Step3'
import ProjectStep4 from './steps/Step4'
import { Project } from '../../../../../utils/redux/types/listings.type'
import { useAppDispatch } from '../../../../../utils/hooks/reduxHook'
import { handleCreateProject } from '../../../../../utils/redux/actions/listing.action'

const CreateProject: React.FunctionComponent<CreateProjectProps> = (
  props: CreateProjectProps,
) => {
  const [rateType, setRateType] = useState<RateType>()
  const dispatch = useAppDispatch()

  const [project, setProject] = useState<ClientProject>(new Project({}))

  const tabs = [
    {
      id: 0,
      content: (
        <ProjectStep1
          setProject={setProject}
          project={project}
          rateType={rateType}
          setRateType={setRateType}
        />
      ),
    },
    {
      id: 1,
      content: <ProjectStep2 setProject={setProject} project={project} />,
    },
    {
      id: 2,
      content: <ProjectStep3 setProject={setProject} project={project} />,
    },
    {
      id: 3,
      content: <ProjectStep4 setProject={setProject} project={project} />,
    },
  ]

  const isDisabled = () => {
    // TODO: Remove this and use something like react-hook-form
    const fieldsConfig: any = {
      step1: {
        requiredFields: [
          'projectName',
          'individuals',
          'workType',
          'timeZone',
          'availability',
          'projectLength',
          'startDate',
          'rateFrom',
          'rateTo',
          'difficulty',
          'learningLink',
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
          project[field as keyof ClientProject] !== '' &&
          project[field as keyof ClientProject] !== undefined &&
          project[field as keyof ClientProject] !== 0,
      )
    } else {
      return false
    }
  }

  const handleSubmitProject = () => {
    if (props.step + 1 === tabs.length) {
      dispatch(handleCreateProject(project))
    } else {
      props.setStep(props.step + 1)
    }
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

interface CreateProjectProps {
  step: number
  setStep: Dispatch<React.SetStateAction<number>>
}

export default CreateProject
