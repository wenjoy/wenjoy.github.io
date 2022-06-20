import type { NextPage } from 'next'
import styles from './home.module.css'
import { User, Role, Status } from '../components/user';
import { List } from '../components/list';

const Home: NextPage = () => {
  const data = [
    { id: 1, name: 'David', role: Role.Moderator, status: Status.Voted },
    { id: 2, name: 'Tom', role: Role.Player, status: Status.Pending },
    { id: 3, name: 'Volta', role: Role.Player, status: Status.Pending }
  ]

  return (
    <div className={styles.container}>
      <section className={styles.center}>
        <div className={styles.content}>
          content
        </div>
        <div className={styles.footer}>
          footer
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
