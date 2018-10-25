import { observer } from 'mobx-react';
import * as React from 'react';

import { OperationModel } from '../../services/models';

import { Blinker, RightPanelHeader, Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import { PayloadSamples } from '../PayloadSamples/PayloadSamples';

export interface ResponseSamplesProps {
  operation: OperationModel;
}

@observer
export class ResponseSamples extends React.Component<ResponseSamplesProps> {
  operation: OperationModel;

  render() {
    const { operation } = this.props;
    const responses = operation.responses.filter(response => {
      return response.content && response.content.hasSample;
    });

    return (
      (responses.length > 0 && (
        <div>
          <RightPanelHeader> Response samples $<Blinker>_</Blinker></RightPanelHeader>

          <Tabs defaultIndex={0}>
            <TabList>
              {responses.map((response, index) => (
                <Tab key={`tab-${index}-${response.code}`} className={'tab-' + response.type}>
                  {response.code}
                </Tab>
              ))}
            </TabList>
            {responses.map((response, index) => (
              <TabPanel key={`tab-${index}-${response.code}`}>
                <div>
                  <PayloadSamples content={response.content!} />
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )) ||
      null
    );
  }
}
