import cls from 'classnames'
import { Card } from '../card/card'
import styles from './cards-list.module.css'

interface CardsListProps {
  children?: (item: Card) => JSX.Element
  items: Card[]
  autoWrap?: boolean
}

export const CardsList = ({ items, children, autoWrap }: CardsListProps) => {
  const ItemComp = children || ((item: Card) => <Card {...item} />)
  return (
    <div className={cls(styles.container, autoWrap && styles.wrap)}>
      {items.map((item) => (
        <div className={styles.itemWrapper} key={item.id}>
          <ItemComp {...item} />
        </div>
      ))}
    </div>
  )
}
