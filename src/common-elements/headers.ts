import styled, { css, extensionsHook, keyframes } from '../styled-components';

const headerFontSize = {
  1: '1.85714em',
  2: '1.57143em',
  3: '1.27em',
};

export const headerCommonMixin = level => css`
  font-family: ${props => props.theme.typography.headings.fontFamily};
  font-weight: 400;
  font-size: ${headerFontSize[level]};
`;

export const H1 = styled.h1`
  ${headerCommonMixin(1)};
  color: ${props => props.theme.colors.primary.main};

  ${extensionsHook('H1')};
`;

export const H2 = styled.h2`
  ${headerCommonMixin(2)};
  color: black;

  ${extensionsHook('H2')};
`;

export const H3 = styled.h2`
  ${headerCommonMixin(3)};
  color: black;

  ${extensionsHook('H3')};
`;

export const blinkKeyframe = keyframes`
  from, to {
    color: transparent;
  }
  50% {
    color: #FFFFFF;
  }
`;

export const Blinker = styled.span`
  color: #FFFFFF;
  display: inline-block;
  font-weight: 800;
  font-size: 15px;
  font-family: Courier,monospace;
  color: #2E3D48;
  -webkit-animation: 1s ${blinkKeyframe}  step-end infinite;
  -moz-animation: 1s ${blinkKeyframe}  step-end infinite;
  -ms-animation: 1s ${blinkKeyframe}  step-end infinite;
  -o-animation: 1s ${blinkKeyframe}  step-end infinite;
  animation: 1s ${blinkKeyframe} step-end infinite;
`;

export const RightPanelHeader = styled.h3`
  color: ${({ theme }) => theme.rightPanel.textColor};
  text-align: center;
  text-transform: uppercase;
  padding: 10px 0;
  background-color: rgba(0,0,0,0.2);
  margin-top: 0;
  font-weight: 500;
  font-size: 12px;
  ${extensionsHook('RightPanelHeader')};
  font-family: Courier,monospace;
`;

export const UnderlinedHeader = styled.h5`
  border-bottom: 1px solid rgba(38, 50, 56, 0.3);
  margin: 1em 0 1em 0;
  color: rgba(38, 50, 56, 0.5);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.929em;
  line-height: 20px;
  padding: 10px 5px;
  ${extensionsHook('UnderlinedHeader')};
`;
