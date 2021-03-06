import * as React from 'react';
import { ResponseModel } from '../../services/models';
import styled from '../../styled-components';
import { ResponseView } from './Response';
import { Markdown } from '../Markdown/Markdown';

const ResponsesHeader = styled.h3`
  font-size: 18px;
  padding: 0.2em 0;
  margin: 3em 0 1.1em;
  color: #253137;
  font-weight: normal;
`;

const ResponseContainer = styled.div`
 padding-bottom: 40px;
`;

export interface ResponseListProps {
  responses: ResponseModel[];
  description: string;
}

export class ResponsesList extends React.PureComponent<ResponseListProps> {
  render() {
    const { responses, description } = this.props;

    if (!responses || responses.length === 0) {
      return null;
    }

    return (
      <ResponseContainer>
        <ResponsesHeader> Responses </ResponsesHeader>
        <Markdown source={description} />
        {responses.map((response, index) => {
          return <ResponseView key={`response-view-${index}-${response.code}`} response={response} />;
        })}
      </ResponseContainer>
    );
  }
}
