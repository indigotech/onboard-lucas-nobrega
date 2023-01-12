import {ApolloProvider} from '@apollo/client';
import React, {FunctionComponent, PropsWithChildren} from 'react';
import {client} from '../libs/apollo-client';

export function AppProviders({children}: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function withProviders<P>(Component: FunctionComponent<P>) {
  return () => (props: any) => {
    return (
      <AppProviders>
        <Component {...props} />
      </AppProviders>
    );
  };
}
