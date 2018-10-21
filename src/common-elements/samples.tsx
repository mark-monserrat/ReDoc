import styled from '../styled-components';

export const SampleControls = styled.div`
  opacity: 0.4;
  transition: opacity 0.3s ease;
  text-align: center;
  margin: 5px 0 10px 0;

  > span {
    display: inline-block;
    padding: 2px 12px;
    min-width: 80px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.1);

    &:first-child {
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      margin-right: 1px;
    }

    &:last-child {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
      margin-left: 1px;
    }

    :hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const SampleControlsWrap = styled.div`
  &:hover ${SampleControls} {
    opacity: 1;
  }
`;
