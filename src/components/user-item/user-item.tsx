import React from 'react';
import {UserItemResponseNodes} from '../../modules/users/graphql/type-query';
import {CustomButtonLink} from '../custom-button-link/custom-button-link';
import * as Styled from './user-item.styles';

interface UserItemProps {
  user: UserItemResponseNodes;
  onTap?: () => void;
}

export function UserItem({user, onTap}: UserItemProps) {
  return (
    <Styled.Container>
      <Styled.Text>name: {user.name}</Styled.Text>
      <Styled.Text>email: {user.email}</Styled.Text>
      <CustomButtonLink onPress={onTap}>Mostrar detalhes</CustomButtonLink>
    </Styled.Container>
  );
}
