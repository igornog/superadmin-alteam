import { Box } from '@mui/material'
import { CloseSquare, ArrowRight2, TickSquare } from 'iconsax-react'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useAppDispatch } from '../../../../../utils/hooks/reduxHook'
import { handleCreateTalent } from '../../../../../utils/redux/actions/talents.action'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../AtButton/AtButton'
import { Asset, Availability, Experience, TalentStatus } from '@yjcapp/app'
import AtTabs from '../../../../AtTabs/AtTabs'
import ModalCreateTalentStep1 from './steps/ModalCreateTalentStep1'
import ModalCreateTalentStep2 from './steps/ModalCreateTalentStep2'
import ModalCreateTalentStep3 from './steps/ModalCreateTalentStep3'
import { isValidEmail } from '../../../../../utils/emails'
import atAxios from '../../../../../utils/services/axios'

const CreateTalent: React.FunctionComponent<CreateTalentProps> = (
  props: CreateTalentProps,
) => {
  const dispatch = useAppDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [salaryExpectation, setSalaryExpectation] = useState('')
  const [role, setRole] = useState('')
  const [experience, setExperience] = useState<Experience>()
  const [availability, setAvailability] = useState<Availability>()
  const [portfolio, setPortfolio] = useState('')
  const [skills, setSkills] = useState<Array<string>>([])
  const [assets, setAssets] = useState<Array<File | Asset>>([])
  const [about, setAbout] = useState('')

  const handleClose = useCallback(() => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhoneNumber('')
    setSalaryExpectation('')
    setRole('')
    setSkills([])
    setAssets([])
    setExperience(undefined)
    setAvailability(undefined)
    setPortfolio('')
    setAbout('')
    props.handleClose()
    props.setStep(0)
  }, [props])

  const createTalent = async () => {
    if (
      firstName &&
      lastName &&
      role &&
      experience &&
      availability &&
      isValidEmail(email) &&
      skills.length > 0
    ) {
      const talentIdCreated = await dispatch(
        handleCreateTalent({
          firstName,
          lastName,
          role,
          phoneNumber,
          salaryExpectation,
          experience: experience,
          availability: availability,
          email,
          about: about,
          skills: skills,
          portfolio,
          status: TalentStatus.Inbound,
        }),
      )

      // saving asset on AWS S3
      if (talentIdCreated.payload) {
        const payload = talentIdCreated.payload as any
        atAxios.postForm(`/talent/solo/${payload.id}/assets`, {
          file: assets[0]
        });
      }
    }

    handleClose()
  }

  useEffect(() => {
    if (props.clearForm) {
      handleClose()
      props.setClearForm(false)
    }
  }, [handleClose, props, props.clearForm])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <AtTabs
        tabs={[
          {
            id: 0,
            content: (
              <ModalCreateTalentStep1
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                salaryExpectation={salaryExpectation}
                setSalaryExpectation={setSalaryExpectation}
                role={role}
                setRole={setRole}
                experience={experience}
                setExperience={setExperience}
                availability={availability}
                setAvailability={setAvailability}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
              />
            ),
          },
          {
            id: 1,
            content: (
              <ModalCreateTalentStep2
                skills={skills}
                setSkills={setSkills}
                about={about}
                setAbout={setAbout}
              />
            ),
          },
          {
            id: 2,
            content: <ModalCreateTalentStep3
              assets={assets[0] as File}
              setAssets={setAssets}
            />,
          },
        ]}
        step={props.step}
      />

      <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
        <AtButton
          onClick={handleClose}
          kind={AtButtonKind.Danger}
          variant={AtButtonVariant.Text}
          name={'Cancel'}
          endIcon={<CloseSquare size={16} />}
        />

        {props.step === 2 ? (
          <>
            <AtButton
              onClick={createTalent}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Outlined}
              name={'Skip & Done'}
              endIcon={<CloseSquare size={16} />}
            />
            <AtButton
              onClick={createTalent}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Done'}
              endIcon={<TickSquare />}
            />
          </>
        ) : props.step === 0 ? (
          <AtButton
            onClick={() => props.setStep(props.step + 1)}
            kind={AtButtonKind.Success}
            disabled={
              firstName === '' ||
              lastName === '' ||
              !isValidEmail(email) ||
              role === '' ||
              experience === undefined ||
              availability === undefined
            }
            variant={AtButtonVariant.Contained}
            name={'Next Step'}
            endIcon={<ArrowRight2 size={16} />}
          />
        ) : (
          <AtButton
            onClick={() => props.setStep(props.step + 1)}
            disabled={skills.length === 0}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Next Step'}
            endIcon={<ArrowRight2 size={16} />}
          />
        )}
      </Box>
    </Box>
  )
}

interface CreateTalentProps {
  handleClose: () => void
  clearForm: boolean
  setClearForm: Dispatch<SetStateAction<boolean>>
  step: number
  setStep: Dispatch<SetStateAction<number>>
}

export default CreateTalent
