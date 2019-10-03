import { transparentize } from 'polished';

import styled, { extensionsHook } from '../styled-components';
import { PropertyNameCell } from './fields-layout';
import { ShelfIcon } from './shelfs';

export const ClickablePropertyNameCell = styled(PropertyNameCell)`
  cursor: pointer;

  ${ShelfIcon} {
    height: ${({ theme }) => theme.schema.arrow.size};
    width: ${({ theme }) => theme.schema.arrow.size};
    polygon {
      fill: ${({ theme }) => theme.schema.arrow.color};
    }
  }
`;

export const FieldLabel = styled.span`
  vertical-align: middle;
  font-size: 0.929em;
  line-height: 20px;
`;

export const TypePrefix = styled(FieldLabel)`
  color: ${props => transparentize(0.2, props.theme.schema.typeNameColor)};
`;

export const TypeName = styled(FieldLabel)`
  color: ${props => props.theme.schema.typeNameColor};
`;

export const TypeTitle = styled(FieldLabel)`
  color: ${props => props.theme.schema.typeTitleColor};
`;

export const TypeFormat = TypeName;

export const RequiredLabel = styled(FieldLabel.withComponent('div'))`
  color: ${props => props.theme.schema.requireLabelColor};
  font-size: ${props => props.theme.schema.labelsTextSize};
  font-weight: normal;
  margin-left: 20px;
  line-height: 1;
  text-transform: uppercase;
  font-size: 9px;
  font-weight: 600;
  border: solid 1px;
  padding: 4px 8px;
  border-radius: 30px;
  background: #E09C64;
  color: #ffffff;
  position: absolute;
`;

export const ConditionalLabel = styled(FieldLabel.withComponent('div'))`
  color: ${props => props.theme.schema.requireLabelColor};
  font-size: ${props => props.theme.schema.labelsTextSize};
  font-weight: normal;
  margin-left: 20px;
  line-height: 1;
  text-transform: uppercase;
  font-size: 9px;
  font-weight: 600;
  border: solid 1px;
  padding: 4px 8px;
  border-radius: 30px;
  background: rgb(176, 196, 50);
  color: #ffffff;
  position: absolute;
`;

export const RecursiveLabel = styled(FieldLabel)`
  color: ${({ theme }) => theme.colors.warning.main};
  font-size: 13px;
`;

export const NullableLabel = styled(FieldLabel)`
  color: #3195a6;
  font-size: 13px;
`;

export const PatternLabel = styled(FieldLabel)`
  color: #3195a6;
  &::before,
  &::after {
    content: '/';
    font-weight: bold;
  }
`;

export const ExampleValue = styled(FieldLabel)`
  border-radius: 20px;
  ${() => `
    background-color: #eef4fb;
    color: #0E5FC2;
    margin: 5px;
    padding: 1px 5px;
    border: 1px solid #5e95d8;
}`};
  & + & {
    margin-left: 0;
  }
  ${extensionsHook('ExampleValue')};
`;

export const ConstraintItem = styled(FieldLabel)`
  border-radius: 2px;
  ${({ theme }) => `
    background-color: ${transparentize(0.95, theme.colors.primary.light)};
    color: ${transparentize(0.1, theme.colors.primary.main)};

    margin: 0 ${theme.spacing.unit}px;
    padding: 0 ${theme.spacing.unit}px;
    border: 1px solid ${transparentize(0.9, theme.colors.primary.main)};
}`};
  & + & {
    margin-left: 0;
  }
  ${extensionsHook('ConstraintItem')};
`;
