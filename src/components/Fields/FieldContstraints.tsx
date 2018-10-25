import * as React from 'react';
import { ConstraintItem } from '../../common-elements/fields';

export interface ConstraintsViewProps {
  constraints: any[];
}

export class ConstraintsView extends React.PureComponent<ConstraintsViewProps> {
  render() {
    if (this.props.constraints.length === 0) {
      return null;
    }
    return (
      <span>
        {' '}
        {this.props.constraints.map((constraint, index) => (
          <ConstraintItem key={`constraint-item-${index}-${constraint}`}> {constraint} </ConstraintItem>
        ))}
      </span>
    );
  }
}
