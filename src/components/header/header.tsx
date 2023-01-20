import React from 'react';
import * as Styled from './header.styles';
import {SeparatorItem} from '../separator-item/separator-item';

export const Header = () => {
  return (
    <Styled.ContainerHeader>
      <Styled.TitleHome>User List</Styled.TitleHome>
      <SeparatorItem />
    </Styled.ContainerHeader>
  );
};
