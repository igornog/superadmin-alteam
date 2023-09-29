import { Box } from '@mui/material'
import { Availability, ClientListing, Currency, Difficulty, ListingType, ProjectRole, RateType, WorkType } from '@yjcapp/app'
import { black, white } from '../../../../utils/colors'
import { plurialize, getCurrencySymbol, convertHexToRGBA } from '../../../../utils/helpers'
import { useAppDispatch } from '../../../../utils/hooks/reduxHook'
import { handleUpdateListing } from '../../../../utils/redux/actions/listing.action'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import moment from 'moment'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../AtButton/AtButton'
import AtTextFieldDropdown from '../../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../../AtLine/AtLine'
import AtTextField, { AtTextFieldType } from '../../../AtTextField/AtTextField'
import AtTextFieldDate from '../../../AtTextField/AtTextFieldDate'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'

const StyledPeriod = styled.div`
  background-color: ${black};
  color: ${white};
  border-radius: 5px;
  padding: 2px 5px; 
  text-wrap: nowrap;
`

const ModalGeneralInformation: React.FunctionComponent<
  ModalGeneralInformationProps
> = (props: ModalGeneralInformationProps) => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const [individuals, setIndividuals] = useState<number>(props.listing.individuals)
  const [workType, setWorkType] = useState<WorkType>()
  const [projectRole, setProjectRole] = useState<ProjectRole>()
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

  const handleSave = () => {
    dispatch(handleUpdateListing({
      id: props.listing?.id,
      projectRole: projectRole,
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
    }))
    props.onClose?.()
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
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>

        {props.listing.listingType === ListingType.Project ?
          <AtTextFieldDropdown
            fullWidth
            required
            value={props.listing.projectRole?.toString()}
            placeholder={'Select Project Role'}
            $listItems={Object.values(ProjectRole).map((label: ProjectRole, index: number) => ({
              id: index,
              label: label,
            }))}
            handleselect={(e) =>
              setProjectRole(e.label as ProjectRole)
            }
            label={'Role'}
          /> : null}

        <AtTextFieldDropdown
          fullWidth
          required
          value={props.listing.individuals?.toString()}
          placeholder={'Select Number of Individuals'}
          $listItems={Array.from(Array(10).keys()).map((key) => ({
            id: key + 1,
            label: key === 9 ? '10+' : (key + 1).toString(),
          }))}
          handleselect={(e) =>
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
          handleselect={(e) =>
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
          handleselect={(e) =>
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
          value={moment.utc(props.listing.startDate).format('DD.MM.YYYY') as string}
          label={'Start Date'}
          onValueChange={(e) =>
            setStartDate(moment.utc(e).format('DD.MM.YYYY') as any)
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
          handleselect={(e) =>
            setCurrency(e.key as Currency)
          }
          label={'Currency'}
        />

        <AtTextFieldDropdown
          fullWidth
          required
          value={props.listing.exactRate ? RateType.Fixed : RateType.Variable}
          placeholder={'Select Day Rate'}
          $listItems={Object.values(RateType).map(
            (label: RateType, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          handleselect={(e) => setRateType(e.label as RateType)}
          label={'Day Rate'}
        />

        {rateType && (
          <AtTextField
            placeholder={
              rateType === RateType.Variable
                ? 'Day Rate From'
                : 'Enter Exact Day Rate'
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
            placeholder={'Day Rate To'}
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
          handleselect={(e) =>
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
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
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
