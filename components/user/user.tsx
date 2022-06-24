import React from 'react';
import styles from './user.module.css';

export interface Props {
  name: string;
  status: Status;
  role: Role;
};

export enum Status {
  Pending,
  Voted,
}

export enum Role {
  Player = 'player',
  Observer = 'observer',
  Moderator = 'moderator',
}

const statusIndicatorDict = {
  [Status.Pending]: '🤔',
  [Status.Voted]: '✔️'
}

export const User = ({ name, status, role }: Props) => {
return(
  <div>{statusIndicatorDict[status]} {name} ({role}) </div>
  );
};
