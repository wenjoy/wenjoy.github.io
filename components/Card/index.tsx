import styles from './index.module.css'

type Point = number | string
interface ICardProps {
    point?: Point
    size?: 'small' | 'large'
    clickHandler?: (p: Point)=> void
}

export default function Card({ point = 0, size = 'small', clickHandler = (point: Point) => { } } : ICardProps) {
    return (
        <div className={[styles.container, styles[size]].join(' ')} onClick={() => clickHandler(point)}>
            {point}
        </div>
    )
}