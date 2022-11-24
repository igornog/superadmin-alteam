import { Box } from '@mui/material';
import React, { useState } from 'react';
import { grey2 } from '../../../../../../utils/colors';
import AtTextFieldDropdown, {
  DropdownItem,
} from '../../../../../AtDropdown/AtTextFieldDropdown';
import AtTextField from '../../../../../AtTextField/AtTextField';
import AtTypography from '../../../../../AtTypography/AtTypography';

const ModalCreateTalentStep1: React.FunctionComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState<DropdownItem>();
  const [availability, setAvailability] = useState<DropdownItem>();
  const [portfolio, setPortfolio] = useState('');

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <AtTypography color={grey2}>
        Please fill the forms above and press the button to invite talent. We
        will send the link to the talent and as soon as the talent will apply
        the profile will appear on the inbound talent link
      </AtTypography>

      <AtTextField
        placeholder={'Enter First Name'}
        value={firstName}
        required={true}
        label={'First Name'}
        onValueChange={setFirstName}
      />

      <AtTextField
        placeholder={'Enter Last Name'}
        value={lastName}
        required={true}
        label={'Last Name'}
        onValueChange={setLastName}
      />

      <AtTextField
        placeholder={'Enter Role'}
        value={role}
        required={true}
        label={'Role'}
        onValueChange={setRole}
      />

      <AtTextFieldDropdown
        fullWidth={true}
        handleSelect={(e) => setExperience(e)}
        value={experience ? experience.label : ''}
        placeholder={'Select Experience Level'}
        required={true}
        listItems={[
          {
            id: 0,
            label: 'Junior',
          },
          {
            id: 1,
            label: 'Senior',
          },
        ]}
        label={'Experience Level'}
      />

      <AtTextFieldDropdown
        fullWidth={true}
        handleSelect={(e) => setAvailability(e)}
        value={availability ? availability.label : ''}
        placeholder={'Select Availability'}
        required={true}
        listItems={[
          {
            id: 0,
            label: 'Availability 1',
          },
          {
            id: 1,
            label: 'Availability 2',
          },
        ]}
        label={'Avaialbility'}
      />

      <AtTextField
        placeholder={'Enter Portfolio Link'}
        value={portfolio}
        label={'Portfolio Link'}
        onValueChange={setPortfolio}
      />
    </Box>
  );
};

export default ModalCreateTalentStep1;
