import React from 'react';
import {UserItemResponseNodes} from '../../modules/users/graphql/type-query';
import {CustomButtonLink} from '../custom-button-link/custom-button-link';
import {UserTextInfo} from '../user-text-info/user-text-info.styles';
import * as Styled from './user-item.styles';

interface UserItemProps {
  user: UserItemResponseNodes;
  onTap?: () => void;
}

export function UserItem({user, onTap}: UserItemProps) {
  return (
    <Styled.ContainerUserItem>
      <UserTextInfo>name: {user.name}</UserTextInfo>
      <UserTextInfo>email: {user.email}</UserTextInfo>
      <CustomButtonLink onPress={onTap}>Mostrar detalhes</CustomButtonLink>
    </Styled.ContainerUserItem>
  );
}
