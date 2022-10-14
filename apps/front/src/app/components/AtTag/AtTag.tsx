import { Chip } from '@mui/material';
import React from 'react';
import { TrushSquare } from 'iconsax-react';

const AtTag: React.FunctionComponent<AtTagProps> = (props: AtTagProps) => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Chip
      label="Prototyping"
      deleteIcon={<TrushSquare />}
      onDelete={handleDelete}
    />
  );
};

interface AtTagProps {
  label: string;
}

export default AtTag;
