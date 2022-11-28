import { createAsyncThunk } from '@reduxjs/toolkit'

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
            idParent: '1',
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
            idParent: '3',
            name: 'Child - 4',
          },
          {
            id: '5',
            idParent: '3',
            name: 'Child - 5',
            children: [
              {
                id: '6',
                idParent: '5',
                name: 'Child - 7',
              },
              {
                id: '7',
                idParent: '5',
                name: 'Child - 8',
              },
              {
                id: '8',
                idParent: '5',
                name: 'Child - 9',
              },
            ],
          },
          {
            id: '9',
            idParent: '3',
            name: 'Child - 6',
            children: [
              {
                id: '10',
                idParent: '9',
                name: 'Child - 4',
              },
              {
                id: '11',
                idParent: '9',
                name: 'Child - 10',
                children: [
                  {
                    id: '12',
                    idParent: '11',
                    name: 'Child - 7',
                  },
                  {
                    id: '13',
                    idParent: '11',
                    name: 'Child - 8',
                  },
                  {
                    id: '14',
                    idParent: '11',
                    name: 'Child - 9',
                  },
                  {
                    id: '15',
                    idParent: '11',
                    name: 'Child - 11',
                  },
                  {
                    id: '16',
                    idParent: '11',
                    name: 'Child - 12',
                  },
                  {
                    id: '17',
                    idParent: '11',
                    name: 'Child - 13',
                  },
                  {
                    id: '231',
                    idParent: '11',
                    name: 'Child - 14',
                  },
                  {
                    id: '123312',
                    idParent: '11',
                    name: 'Child - 15',
                  },
                  {
                    id: '4321',
                    idParent: '11',
                    name: 'Child - 16',
                  },
                  {
                    id: '12123',
                    idParent: '11',
                    name: 'Child - 17',
                  },
                ],
              },
            ],
          },
          {
            id: '18',
            idParent: '3',
            name: 'Child - 14',
          },
        ],
      },
    ],
  }

  return tree
})

export const handleAddFolder = createAsyncThunk(
  'tree/addFolder',
  async (props: { folderName: string; targetId: string }) => {
    return props
  },
)

export const handleSelectFolder = createAsyncThunk(
  'tree/selectFolder',
  async (idFolder: string | undefined) => {
    return idFolder
  },
)
