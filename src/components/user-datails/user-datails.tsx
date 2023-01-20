import React from 'react';
import {maskString, patternPhone} from '../../libs/utils/mask';
import {UserItemResponseNodes} from '../../modules/users/graphql/type-query';
import {UserTextInfo} from '../user-text-info/user-text-info.styles';
import * as Styled from './user-details.styles';

export function UserDetails(user: UserItemResponseNodes) {
  return (
    <Styled.ContainerUserDetails>
      <UserTextInfo>name: {user.name}</UserTextInfo>
      <UserTextInfo>email: {user.email}</UserTextInfo>
      <UserTextInfo>id: {user.id}</UserTextInfo>
      <UserTextInfo>role: {user.role}</UserTextInfo>
      <UserTextInfo>
        phone: {maskString.apply(user.phone, patternPhone)}
      </UserTextInfo>
      <UserTextInfo>bithDate: {user.birthDate}</UserTextInfo>
    </Styled.ContainerUserDetails>
  );
}
