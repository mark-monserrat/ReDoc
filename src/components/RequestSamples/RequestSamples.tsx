import { observer } from 'mobx-react';
import * as React from 'react';
import { OperationModel } from '../../services/models';
import { PayloadSamples } from '../PayloadSamples/PayloadSamples';
import { SourceCodeWithCopy } from '../SourceCode/SourceCode';

import { Blinker, RightPanelHeader, Tab, TabList, TabPanel, Tabs } from '../../common-elements';

export interface RequestSamplesProps {
  operation: OperationModel;
}

@observer
export class RequestSamples extends React.Component<RequestSamplesProps> {
  operation: OperationModel;

  render() {
    const { operation } = this.props;
    const requestBodyContent = operation.requestBody && operation.requestBody.content;
    const hasBodySample = requestBodyContent && requestBodyContent.hasSample;
    const samples = operation.codeSamples;

    const hasSamples = hasBodySample || samples.length > 0;
    return (
      (hasSamples && (
        <div>
          <RightPanelHeader> Request samples $<Blinker>_</Blinker></RightPanelHeader>

          <Tabs defaultIndex={0}>
            <TabList>
              {hasBodySample && <Tab key="payload"> Payload </Tab>}
              {samples.map((sample, index) => (
                <Tab key={`tab-${index}-${sample.lang}`}>
                  {sample.label !== undefined ? sample.label : sample.lang}
                </Tab>
              ))}
            </TabList>
            {hasBodySample && (
              <TabPanel key="payload">
                <div>
                  <PayloadSamples content={requestBodyContent!} />
                </div>
              </TabPanel>
            )}
            {samples.map((sample, index) => (
              <TabPanel key={`tab-${index}-${sample.lang}`}>
                <SourceCodeWithCopy lang={sample.lang} source={sample.source} />
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )) ||
      null
    );
  }
}
