import { Grid } from '@mui/material';
import React from 'react';
import AtCreateFolder from '../../../../components/AtFolder/AtCreateFolder';
import AtFolder from '../../../../components/AtFolder/AtFolder';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../utils/hooks/reduxHook';
import { handleSelectFolder } from '../../../../utils/redux/actions/tree.action';
import { getActiveFolder } from '../../../../utils/redux/selectors/tree.selector';
import { StatusType } from '../../../../utils/redux/types/status.type';
import { Tree, TreeInterface } from '../../../../utils/redux/types/tree.type';

const ShortlistFolderListing: React.FunctionComponent = () => {
  const tree = useAppSelector((state) => state.tree);
  const dispatch = useAppDispatch();
  const folder = useAppSelector((state) => getActiveFolder(state));
  const selectedFolder = folder ?? new Tree(tree.data);

  console.log(selectedFolder);
  const selectFolder = (idFolder: string) => {
    dispatch(handleSelectFolder(idFolder));
  };

  return (
    <Grid container={true} spacing={2.5}>
      {tree.status === StatusType.Succeeded ? (
        selectedFolder.children && selectedFolder?.children?.length > 0 ? (
          selectedFolder.children?.map((item: TreeInterface) => {
            return (
              <Grid item={true} xs={3}>
                <AtFolder
                  name={item.name}
                  onClick={() => selectFolder(item.id)}
                />
              </Grid>
            );
          })
        ) : (
          <Grid item={true} xs={3}>
            <AtCreateFolder />
          </Grid>
        )
      ) : (
        <Grid item={true} xs={3}>
          <AtFolder loading={true} />
        </Grid>
      )}
    </Grid>
  );
};

export default ShortlistFolderListing;
