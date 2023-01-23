import React from 'react';
import * as Styled from './header.styles';
import {SeparatorItem} from '../separator-item/separator-item';

export const Header = () => {
  return (
    <Styled.Container>
      <Styled.Title>User List</Styled.Title>
      <SeparatorItem />
    </Styled.Container>
  );
};
