import { createAsyncThunk } from '@reduxjs/toolkit';

export const handleLoadTree = createAsyncThunk('tree/loadTree', async () => {
  const tree = {
    id: 'Parent',
    name: 'Create Parent Folder',
    children: [
      {
        id: '1',
        name: 'Development',
        children: [
          {
            id: '2',
            name: 'Front-end',
          },
        ],
      },
      {
        id: '3',
        name: 'Solo60',
        children: [
          {
            id: '4',
            name: 'Child - 4',
          },
          {
            id: '5',
            name: 'Child - 5',
            children: [
              {
                id: '6',
                name: 'Child - 7',
              },
              {
                id: '7',
                name: 'Child - 8',
              },
              {
                id: '8',
                name: 'Child - 9',
              },
            ],
          },
          {
            id: '9',
            name: 'Child - 6',
            children: [
              {
                id: '10',
                name: 'Child - 4',
              },
              {
                id: '11',
                name: 'Child - 10',
                children: [
                  {
                    id: '12',
                    name: 'Child - 7',
                  },
                  {
                    id: '13',
                    name: 'Child - 8',
                  },
                  {
                    id: '14',
                    name: 'Child - 9',
                  },
                  {
                    id: '15',
                    name: 'Child - 11',
                  },
                  {
                    id: '16',
                    name: 'Child - 12',
                  },
                  {
                    id: '17',
                    name: 'Child - 13',
                  },
                ],
              },
            ],
          },
          {
            id: '18',
            name: 'Child - 14',
          },
        ],
      },
    ],
  };

  return tree;
});

export const handleAddFolder = createAsyncThunk(
  'tree/addFolder',
  async (props: { folderName: string; targetId: string }) => {
    return props;
  }
);
