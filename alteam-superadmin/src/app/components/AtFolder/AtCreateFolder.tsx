import { FolderAdd } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { grey5, grey3, black } from '../../utils/colors'
import { useAppSelector } from '../../utils/hooks/reduxHook'
import { getActiveGroup } from '../../utils/redux/selectors/group.selector'
import ModalAddFolder from '../AtModal/modals/ModalAddFolder'
import AtTypography from '../AtTypography/AtTypography'

const StyledFolder = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: 1px dashed ${grey5};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: ${grey3};
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    color: ${black};
  }
`

const AtCreateFolder: React.FunctionComponent = () => {
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const activeFolder = useAppSelector((state) => getActiveGroup(state))

  return (
    <>
      <StyledFolder onClick={() => setOpenCreateFolder(true)}>
        <FolderAdd size={40} />
        <AtTypography variant={'h5'}>Create Folder</AtTypography>
      </StyledFolder>

      <ModalAddFolder
        folder={activeFolder}
        isOpen={openCreateFolder}
        onClose={() => setOpenCreateFolder(false)}
      />
    </>
  )
}

export default AtCreateFolder
