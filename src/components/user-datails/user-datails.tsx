import React from 'react';
import {maskString, patternPhone} from '../../libs/utils/mask';
import {UserItemResponseNodes} from '../../modules/users/graphql/type-query';
import * as Styled from './user-details.styles';

export function UserDetails(user: UserItemResponseNodes) {
  return (
    <Styled.Container>
      <Styled.Text>name: {user.name}</Styled.Text>
      <Styled.Text>email: {user.email}</Styled.Text>
      <Styled.Text>id: {user.id}</Styled.Text>
      <Styled.Text>role: {user.role}</Styled.Text>
      <Styled.Text>
        phone: {maskString.apply(user.phone, patternPhone)}
      </Styled.Text>
      <Styled.Text>bithDate: {user.birthDate}</Styled.Text>
    </Styled.Container>
  );
}
