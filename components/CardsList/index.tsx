import Card from '../Card'
import styles from './index.module.css'

interface Card {
  id: string
  point: string
}

interface CardsListProps {
  items: Card[]
}

export default function CardsList({ items }: CardsListProps) {
  return (
    <div className={styles.container}>
      {items.map((item) => <div className={styles.itemWrapper} key={item.id}>
        <Card {...item} />
      </div>)}
      </div>
  )

}