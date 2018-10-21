import { Tabs as ReactTabs } from 'react-tabs';
import styled from '../styled-components';

export { Tab, TabList, TabPanel } from 'react-tabs';

export const Tabs = styled(ReactTabs)`
  > ul {
    list-style: none;
    padding: 0;
    margin: 5px;
    text-align: center;
    > li {
      padding: 5px 10px;
      display: inline-block;

      background-color: rgba(255,255,255,0.1);
      cursor: pointer;
      text-align: center;
      outline: none;
      color: #ccc;
      margin: 5px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      min-width: 60px;
      font-size: 0.9em;
      font-weight: bold;

      &:first-child {
        margin: 5px 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:last-child {
        margin: 5px 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
      }

      &:not(:first-child):not(:last-child){
        margin: 5px 0;
        border-radius: 0;
        border-left: 0;
      }

      &.react-tabs__tab--selected {
        color: ${props => props.theme.colors.text.primary};
        background: rgba(255,255,255, 0.6);
      }

      &:only-child {
        flex: none;
        min-width: 100px;
        margin: 5px;
        border-radius: 4px;
      }

      &.tab-success {
        color: ${props => props.theme.colors.responses.success.color};
      }

      &.tab-redirect {
        color: ${props => props.theme.colors.responses.redirect.color};
      }

      &.tab-info {
        color: ${props => props.theme.colors.responses.info.color};
      }

      &.tab-error {
        color: ${props => props.theme.colors.responses.error.color};
      }
    }
  }
  > .react-tabs__tab-panel {
    background: rgba(0,0,0,0);
    border-radius: 4px;
    & > div,
    & > pre {
      padding: 20px;
      margin: 0;
    }
  }
`;

export const SmallTabs = styled(Tabs)`
  > ul {
    display: block;
    > li {
      padding: 2px 5px;
      min-width: auto;
      margin: 0 15px 0 0;
      font-size: 13px;
      font-weight: normal;
      border-bottom: 1px dashed;
      color: #787b7d;
      border-radius: 0;
      background: none;

      &:last-child {
        margin-right: 0;
      }

      &.react-tabs__tab--selected {
        color: #babcbf;
        background: none;
      }
    }
  }
  > .react-tabs__tab-panel {
    & > div,
    & > pre {
      padding: 10px 0;
      margin: 0;
    }
  }
`;
