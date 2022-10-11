import { Box } from '@mui/material';
import React, { useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import styled from 'styled-components';
import AtButton from '../../../components/AtButton';
import AtTextField, { AtTextFieldType } from '../../../components/AtTextField';
import AtTypography from '../../../components/AtTypography';
import { grey5 } from '../../../utils/colors';
import { isValidEmail } from '../../../utils/emails';

const StyledBackground = styled.div`
  padding: 0 50px;
  background-image: linear-gradient(90deg, ${grey5} 1px, transparent 0.2px);
  background-size: 50%;
  background-origin: content-box;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const AuthForm: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <StyledBackground>
      <Box
        paddingX={'20px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'30px'}
        width={'100%'}
      >
        <AtTypography variant={'h2'}>Login</AtTypography>

        <AtTextField
          label={'Email'}
          required={true}
          placeholder={'Enter email'}
          type={AtTextFieldType.Email}
          helperText={'Something went wrong'}
          onValueChange={setEmail}
        />

        <AtTextField
          label={'Password'}
          placeholder={'Enter password'}
          required={true}
          type={AtTextFieldType.Password}
          onValueChange={setPassword}
        />

        <Box display={'flex'} justifyContent={'flex-end'}>
          <AtButton
            name={'Login'}
            color={'success'}
            onClick={handleSubmit}
            endIcon={<HiChevronRight size={16} />}
            disabled={!(isValidEmail(email) && password.length > 0)}
          />
        </Box>
      </Box>
    </StyledBackground>
  );
};

export default AuthForm;
