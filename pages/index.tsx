import type { NextPage } from 'next'
import styles from './home.module.css'
import { User, Role, Status } from '../components/user';
import { List } from '../components/list';
import CardsList, { Card } from '../components/CardsList';

const Home: NextPage = () => {
  const data = [
    { id: 1, name: 'David', role: Role.Moderator, status: Status.Voted },
    { id: 2, name: 'Tom', role: Role.Player, status: Status.Pending },
    { id: 3, name: 'Volta', role: Role.Player, status: Status.Pending }
  ]

  const cards: Card[] = [
    { id: '1', point: '0' },
    { id: '2', point: '0.5' },
    { id: '3', point: '1' },
    { id: '4', point: '2' },
    { id: '5', point: '3' },
    { id: '6', point: '5' },
    { id: '7', point: '8' },
    { id: '8', point: '13' },
    { id: '9', point: '20' },
    { id: '10', point: '40' },
    { id: '11', point: '100' },
    { id: '12', point: '?' },
    { id: '13', point: '☕' },
  ]

  return (
    <div className={styles.container}>
      <section className={styles.center}>
        <div className={styles.content}>
          content
        </div>
        <div className={styles.footer}>
          <CardsList items={cards} />
        </div>
      </section>
      <section className={styles.aside}>
        <List data={data}>
          { /*can I just User here?*/}
          {(item) => <User {...item} />}
        </List>
        <div className='story'></div>
      </section>
    </div>
  )
}

export default Home
