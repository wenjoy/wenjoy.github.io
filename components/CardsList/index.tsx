import cls from 'classnames'
import Card, { ICardProps } from '../Card'
import styles from './index.module.css'

interface CardsListProps {
  children?: (item: ICardProps) => JSX.Element
  items: ICardProps[]
  autoWrap?: boolean
}

export default function CardsList({ items, children, autoWrap }: CardsListProps) {
  const ItemComp = children || ((item: ICardProps) => <Card {...item} />);
  return (
    <div className={cls(styles.container, autoWrap && styles.wrap)}>
      {items.map((item) => <div className={styles.itemWrapper} key={item.id}>
        <ItemComp {...item} />
      </div>)}
      </div>
  )

}