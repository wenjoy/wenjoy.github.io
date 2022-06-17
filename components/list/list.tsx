import React from 'react';
import styles from './list.module.css';

interface Props {
  data: any[];
};

export const List = ({ data = [] }: Props) => {

  return data.length < 1 ? <div data-testid='no-result'>Nothing can be displayed</div> : (
    <div>
      {data.map(({ name, id }, index) => <div key={id ?? index}>{name}</div>)}
    </div>
  );
};
