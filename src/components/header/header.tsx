import React from 'react';
import {ContainerHeader, TitleHome} from './header.styles';
import {SeparatorItem} from '../separator-item/separator-item';

export const Header = () => {
  return (
    <ContainerHeader>
      <TitleHome>User List</TitleHome>
      <SeparatorItem />
    </ContainerHeader>
  );
};
