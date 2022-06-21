import Card, { ICardProps } from '../Card'
import styles from './index.module.css'

interface CardsListProps {
  children?: (item: ICardProps) => JSX.Element
  items: ICardProps[]
}

export default function CardsList({ items, children }: CardsListProps) {
  const ItemComp = children || ((item: ICardProps) => <Card {...item} />);
  return (
    <div className={styles.container}>
      {items.map((item) => <div className={styles.itemWrapper} key={item.id}>
        <ItemComp {...item} />
      </div>)}
      </div>
  )

}