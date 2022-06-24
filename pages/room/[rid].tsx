import type { NextPage } from 'next'
import styles from './room.module.css'
import { User, Role, Status } from '../../components/user';
import { List } from '../../components/list';
import Card, { ICardProps } from '../../components/Card';
import CardsList from '../../components/CardsList';
import { useEffect, useRef } from 'react';
import { getSocket } from '../../socket';
import { getStore } from '../../store';
import { useRouter } from 'next/router';

const Room: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    const joinRoom = async () => {
      const ws = await getSocket()
      const accessInfo = getStore('accessInfo')

      if(!accessInfo) {
        router.push('/antechamber')
        return
      }

      ws.send({
        type: 'join',
        data: JSON.parse(accessInfo)
      })
    } 
    
    joinRoom();
  }, [])

  const users = [
    { id: 1, name: 'David', role: Role.Moderator, status: Status.Voted },
    { id: 2, name: 'Tom', role: Role.Player, status: Status.Pending },
    { id: 3, name: 'Volta', role: Role.Player, status: Status.Pending }
  ]

  const cardsOnDesk = [
    { id: '1', owner: 'David long long' },
    { id: '2', owner: 'Tom' },
    { id: '3', owner: 'Green' },
    { id: '4', owner: 'Lim' },
  ]

  const cards: ICardProps[] = [
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
          <CardsList items={cardsOnDesk}>
            {(item) => <Card isBack={true} size="large" {...item} />}
          </CardsList>
        </div>
        <div className={styles.footer}>
          <CardsList items={cards} />
        </div>
      </section>
      <section className={styles.aside}>
        <List data={users}>
          { /*can I just User here?*/}
          {(item) => <User {...item} />}
        </List>
        <div className='story'></div>
      </section>
    </div>
  )
}

export default Room
