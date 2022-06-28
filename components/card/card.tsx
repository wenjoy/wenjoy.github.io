import styles from './card.module.css'

export type Point = number | string

export interface Card {
  id: string
  point?: Point
}

export interface CardProps {
  point?: Point
  size?: 'small' | 'large'
  isBack?: boolean
  owner?: string
  clickHandler?: (p: Point) => void
}

export const Card: React.FC<CardProps> = ({
  point = 0,
  size = 'small',
  isBack,
  owner,
  clickHandler = () => {},
}) => {
  return (
    <div
      className={[styles.container, styles[size]].join(' ')}
      onClick={() => clickHandler(point)}
    >
      <div
        className={[
          styles.card,
          isBack ? styles.backface : styles.frontface,
        ].join(' ')}
      >
        {' '}
        {isBack ? '' : point}
      </div>
      <div className={styles.owner} title={owner}>
        {owner}
      </div>
    </div>
  )
}
