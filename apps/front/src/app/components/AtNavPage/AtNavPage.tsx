import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { handleActiveTab } from '../../utils/redux/actions/settings.action';
import { Page } from '../../utils/redux/types/settings.type';
import AtTab from '../AtTab/AtTab';

const StyledNavPage = styled.div`
  background-color: #0f152708;
  display: flex;
  gap: 10px;
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
`;

const AtNavPage: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const handleClick = (page: Page) => {
    dispatch(handleActiveTab(page));
  };

  return (
    <StyledNavPage>
      {settings.tabs.map((page: Page, index: number) => (
        <AtTab
          label={page.title}
          badge={page.badge}
          key={index}
          active={page.active}
          onClick={() => handleClick(page)}
        />
      ))}
    </StyledNavPage>
  );
};

export default AtNavPage;
