import { DocumentText1, Import } from 'iconsax-react'
import React, { useState } from 'react'
import AtLine from '../../../../components/AtLine/AtLine'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { green, grey2, grey3 } from '../../../../utils/colors'
import { useAppDispatch } from '../../../../utils/hooks/reduxHook'
import Box from '@mui/material/Box'
import { Asset, Talent } from '@yjcapp/app'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    color: ${green};
  }
`

const TalentAttachments: React.FunctionComponent<TalentAttachmentsProps> = (
  props: TalentAttachmentsProps,
) => {
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState<File[] | []>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile([...selectedFile, file]);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setImageUrl(result)
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <AtFrame
      title={'Attachments'}
      // icon={
      //   !props.notEditable && (
      //     <AtTypography>
      //       <Import size={16} />
      //       Download all
      //     </AtTypography>
      //   )
      // }
      gap={0}
    >
      <AtLine spacing={15} />

      {/* <Button
        variant={AtButtonVariant.Outlined}
        component="label"
        sx={{
          color: black,
          borderColor: black,
          '&:hover': {
            color: grey2,
            border: `1px solid ${grey2}`,
            backgroundColor: 'transparent',

          }
        }}
      >
        Add attachment
        <AddCircle size={16} style={{
          marginLeft: '10px'
        }} />
        <input
          type="file"
          hidden
          onChange={(e: any) => handleFileChange(e)}
        />
      </Button> */}

      <Box margin={'20px 0 0'} >
        {/* {selectedFile.length || props.talent.assets?.length?
          selectedFile.map((file: File, index: number) => {
            return (
              <>
                {index != 0 ? <AtLine spacing={5} /> : null}
                <Box display={'flex'} gap={'10px'} position={'relative'}>
                  <DocumentText1 size={20} color={grey2} />
                  <AtTypography variant={'caption'} color={grey2}>{file.name}</AtTypography>
                  <Box position={'absolute'} right={'0'}>
                    <Import size={20} />
                  </Box>
                </Box>
              </>
            )
          }) */}

        {props.talent?.assets?.length ?
          props.talent.assets.map((file: Partial<Asset>, index: number) => {
            return (
              <>
                {index != 0 ? <AtLine spacing={5} /> : null}
                <Box display={'flex'} gap={'10px'} position={'relative'}>
                  <DocumentText1 size={20} color={grey2} />
                  <AtTypography variant={'caption'} color={grey2}>{file.name}</AtTypography>
                  <StyledBox position={'absolute'} right={'0'}>
                    <Import
                      size={20}
                      onClick={() => window.open(file.link, '_blank')}
                    />
                  </StyledBox>
                </Box>
              </>
            )
          })
          :
          <AtTypography variant="body2" color={grey3}>No Attachments added.</AtTypography>
        }</Box>


      {/* <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'10px'}>
          <DocumentText1 />
          <AtTypography color={grey}>Filenamecanbethislong.pdf</AtTypography>
        </Box>

        <Import />
      </Box>

      <AtLine spacing={15} />

      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'10px'}>
          <DocumentText1 />
          <AtTypography color={grey}>Filenamecanbethislong.jpg</AtTypography>
        </Box>

        <Import />
      </Box>

      <AtLine spacing={15} />

      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'10px'}>
          <DocumentText1 />
          <AtTypography color={grey}>Filenamecanbethislong.png</AtTypography>
        </Box>

        <Import />
      </Box> */}
    </AtFrame>
  )
}

interface TalentAttachmentsProps {
  notEditable?: boolean
  talent?: Talent
}

export default TalentAttachments
