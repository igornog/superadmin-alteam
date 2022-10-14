import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import AtTextField from './AtTextField';

const Story: ComponentMeta<typeof AtTextField> = {
  component: AtTextField,
  title: 'Input',
  argTypes: {
    size: {
      control: { disable: true },
    },
  },
};

export default Story;

const Template: ComponentStory<typeof AtTextField> = (args: any) => (
  <Box width={'250px'}>
    <AtTextField
      placeholder={'Search in most recent'}
      isError={args.isError}
      isSuccess={args.isSuccess}
      label={args.label}
      size={args.size}
      required={args.required}
      disabled={args.disabled}
      startIcon={args.startIcon ? <SearchNormal1 /> : null}
      endIcon={args.endIcon ? <CloseCircle /> : null}
    />
  </Box>
);

export const InputMedium = Template.bind({});
InputMedium.args = {
  label: 'Email',
  required: true,
  disabled: false,
  size: 'medium',
  startIcon: false,
  endIcon: false,
};

export const InputSuccess = Template.bind({});
InputSuccess.args = {
  isSuccess: true,
  label: 'Email',
  required: true,
  disabled: false,
  startIcon: false,
  endIcon: false,
};

export const InputError = Template.bind({});
InputError.args = {
  isError: true,
  label: 'Email',
  required: true,
  disabled: false,
  startIcon: false,
  endIcon: false,
};

export const InputSmall = Template.bind({});
InputSmall.args = {
  label: 'Email',
  required: true,
  disabled: false,
  size: 'small',
  startIcon: false,
  endIcon: false,
};

export const InputSmallSuccess = Template.bind({});
InputSmallSuccess.args = {
  isSuccess: true,
  label: 'Email',
  required: true,
  disabled: false,
  size: 'small',
  startIcon: false,
  endIcon: false,
};

export const InputSmallError = Template.bind({});
InputSmallError.args = {
  label: 'Email',
  required: true,
  disabled: false,
  isError: true,
  size: 'small',
  startIcon: false,
  endIcon: false,
};
