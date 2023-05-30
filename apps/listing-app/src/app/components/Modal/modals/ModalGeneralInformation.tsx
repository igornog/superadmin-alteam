import { Box } from '@mui/material'
import { Availability, ClientListing, Currency, Difficulty, RateType, WorkType } from '@yjcapp/app'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { useAppDispatch } from '../../../utils/hooks/reduxHook'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import CustomButton, { AtButtonKind, AtButtonVariant } from '../../Button/Button'
import AtLine from '../../Line/Line'
import AtTypography from '../../Typography/Typography'
import AtModal from '../AtModal'
import { useParams } from 'react-router-dom'
import AtTextFieldDropdown from '../../Dropdown/TextFieldDropdown'
import AtTextField, { AtTextFieldType } from '../../TextField/TextField'
import styled from 'styled-components'
import { black, white } from '../../../utils/colors'
import { convertHexToRGBA, getCurrencySymbol, plurialize } from '../../../utils/helpers'
import AtTextFieldDate from '../../TextField/TextFieldDate'
import moment from 'moment'
import { handleUpdateListing } from '../../../utils/redux/actions/listing.action'

const StyledPeriod = styled.div`
  background-color: ${black};
  color: ${white};
  border-radius: 5px;
  padding: 2px 5px;
`

const ModalGeneralInformation: React.FunctionComponent<
  ModalGeneralInformationProps
> = (props: ModalGeneralInformationProps) => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const [individuals, setIndividuals] = useState<number>(props.listing.individuals)
  const [workType, setWorkType] = useState<WorkType>()
  const [availability, setAvailability] = useState<Availability>()
  const [projectLength, setProjectLength] = useState<number>()
  const [startDate, setStartDate] = useState<Date>()
  const [currency, setCurrency] = useState<Currency>()
  const [rateFrom, setRateFrom] = useState<number>()
  const [rateTo, setRateTo] = useState<number>()
  const [rateType, setRateType] = useState<RateType>()
  const [exactRate, setExactRate] = useState<number>()
  const [difficulty, setDifficulty] = useState<Difficulty>()
  const [learningLink, setLearningLink] = useState<string>()

  const handleSave = async () => {
    if (id) {
      await dispatch(handleUpdateListing(
        {
          id: parseInt(id),
          individuals: individuals,
          workType: workType,
          availability: availability,
          projectLength: projectLength,
          startDate: startDate,
          currency: currency,
          exactRate: exactRate ?? undefined,
          rateFrom: rateFrom,
          rateTo: rateTo,
          difficulty: difficulty,
          learningLink: learningLink,
        }
      ))

      props.onClose?.()
    }
    window.location.reload()
  }

  return (
    <AtModal
      isOpen={props.open}
      size={ModalSize.Small}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit General Information</AtTypography>
        <CustomButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>
        <AtTextFieldDropdown
          fullWidth
          required
          value={props.listing.individuals?.toString()}
          placeholder={'Select Number of Individuals'}
          $listItems={Array.from(Array(10).keys()).map((key) => ({
            id: key + 1,
            label: (key + 1).toString(),
          }))}
          handleSelect={(e) =>
            setIndividuals(parseInt(e.label))
          }
          label={'Number of Individuals'}
        />

        <AtTextFieldDropdown
          fullWidth
          required
          value={props.listing.workType}
          placeholder={'Select Work Type'}
          $listItems={Object.values(WorkType).map(
            (label: WorkType, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          handleSelect={(e) =>
            setWorkType(e.label as WorkType)
          }
          label={'Work Type'}
        />

        <AtTextFieldDropdown
          fullWidth
          required
          value={props.listing.availability}
          placeholder={'Select Availability'}
          $listItems={Object.values(Availability).map(
            (label: Availability, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          handleSelect={(e) =>
            setAvailability(e.label as Availability)
          }
          label={'Availability'}
        />


        <AtTextField
          label={'Project Length'}
          type={AtTextFieldType.Number}
          required
          value={props.listing.projectLength?.toString()}
          placeholder={'Enter Project Length'}
          maxLength={30}
          minValue={1}
          onValueChange={(e) =>
            setProjectLength(parseInt(e))
          }
          endIcon={
            <StyledPeriod>
              <AtTypography variant={'caption'}>
                {plurialize(props.listing.projectLength ?? 0, 'Month', true)}
              </AtTypography>
            </StyledPeriod>
          }
        />

        <AtTextFieldDate
          required
          value={moment(props.listing.startDate).format('MM.DD.YYYY') as string}
          label={'Start Date'}
          onValueChange={(e) =>
            setStartDate(moment(e).format('MM.DD.YYYY') as any)
          }
        />

        <AtTextFieldDropdown
          fullWidth
          placeholder={'Select Your Currency'}
          value={`${props.listing.currency} (${getCurrencySymbol(props.listing.currency)})`}
          $listItems={Object.values(Currency).map(
            (label: Currency, index: number) => ({
              id: index,
              key: label,
              label: label + ` (${getCurrencySymbol(label)})`,
            }),
          )}
          handleSelect={(e) =>
            setCurrency(e.key as Currency)
          }
          label={'Currency'}
        />

        <AtTextFieldDropdown
          fullWidth
          required
          value={props.listing.exactRate ? RateType.Fixed : RateType.Variable}
          placeholder={'Select Rate'}
          $listItems={Object.values(RateType).map(
            (label: RateType, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          handleSelect={(e) => setRateType(e.label as RateType)}
          label={'Rate'}
        />

        {rateType && (
          <AtTextField
            placeholder={
              rateType === RateType.Variable
                ? 'Rate From'
                : 'Enter Exact Rate'
            }
            startIcon={
              <AtTypography color={convertHexToRGBA(black, 0.5)}>
                {getCurrencySymbol(currency)}
              </AtTypography>
            }
            maxLength={30}
            minValue={1}
            type={AtTextFieldType.Number}
            value={props.listing.rateFrom?.toString()}
            onValueChange={(e) =>
              rateType === RateType.Variable ?
                setRateFrom(parseFloat(e)) :
                setExactRate(parseFloat(e))
            }
          />
        )}

        {rateType === RateType.Variable && (
          <AtTextField
            placeholder={'Rate To'}
            maxLength={30}
            minValue={
              props.listing.rateFrom ? props.listing.rateFrom + 1 : 2
            }
            type={AtTextFieldType.Number}
            startIcon={
              <AtTypography color={convertHexToRGBA(black, 0.5)}>
                {getCurrencySymbol(currency)}
              </AtTypography>
            }
            value={props.listing.rateTo?.toString()}
            onValueChange={(e) => setRateTo(parseFloat(e))
            }
          />
        )}

        <AtTextFieldDropdown
          fullWidth
          required
          value={props.listing.difficulty}
          placeholder={'Select Difficulty'}
          $listItems={Object.values(Difficulty).map(
            (label: Difficulty, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          handleSelect={(e) =>
            setDifficulty(e.label as Difficulty)
          }
          label={'Difficulty'}
        />

        <AtTextField
          label={'Learning'}
          value={props.listing.learningLink}
          placeholder={'Enter Learning Link'}
          onValueChange={(e) =>
            setLearningLink(e)
          }
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <CustomButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <CustomButton
            onClick={handleSave}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalGeneralInformationProps {
  listing: ClientListing;
  open: boolean
  onClose?: () => void
}

export default ModalGeneralInformation
