import React from 'react';
import styles from './list.module.css';

interface Props {
  children?: (item: any) => JSX.Element;
  data: any[];
};

export const List = ({ data = [], children }: Props) => {
  if (data.length === 0) {
    return <div data-testid='no-result'>Nothing can be displayed</div>
  }

  const ItemComp = children || ((item: any) => <>{item.name}</>);

  return <div>
    {data.map((item, index) =>
      <div key={item.id ?? index}>
        <ItemComp {...item} />
      </div>)}
  </div>
};
