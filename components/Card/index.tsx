import styles from './index.module.css'

export type Point = number | string

export interface ICardProps {
  id: string
  point?: Point
  size?: 'small' | 'large'
  isBack?: boolean
  owner?: string,
  clickHandler?: (p: Point) => void
}

export default function Card({ point = 0, size = 'small', isBack, owner, clickHandler = (point: Point) => { } }: ICardProps) {
  return (
    <div className={[
      styles.container,
      styles[size],
    ].join(' ')}
      onClick={() => clickHandler(point)}>
      <div
      className={[
        styles.card,
        isBack ?  styles.backface : styles.frontface
      ].join(' ')}
      > {isBack ? '' : point}</div>
      <div className={styles.owner} title={owner}>{owner}</div>
    </div>
  )
}