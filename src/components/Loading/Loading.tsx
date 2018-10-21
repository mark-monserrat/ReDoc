import * as React from 'react';
// import styled, { withProps } from '../../styled-components';

import { Spinner } from './Spinner.svg';

// const LoadingMessage = withProps<{ color: string }>(styled.div)`
//   font-family: helvetica, sans;
//   width: 100%;
//   text-align: center;
//   font-size: 25px;
//   margin: 30px 0 20px 0;
//   color: ${props => props.color};
// `;

export interface LoadingProps {
  color: string;
}

export class Loading extends React.PureComponent<LoadingProps> {
  render() {
    return (
      <div style={{ height: '100vh', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner  />
      </div>
    );
  }
}
