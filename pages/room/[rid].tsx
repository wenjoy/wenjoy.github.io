import type { NextPage } from 'next'
import styles from './room.module.css'
import { User, Props } from '../../components/user'
import { List } from '../../components/list'
import { Card, Point } from '../../components/card/card'
import { CardsList } from '../../components/cards-list/cards-list'
import { useEffect, useRef, useState } from 'react'
import { getSocket } from '../../socket'
import { getStore } from '../../store'
import { useRouter } from 'next/router'

const Room: NextPage = () => {
  const hasBeenCalled = useRef(false)
  const router = useRouter()
  const [users, setUsers] = useState<Props[]>([])
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const joinRoom = async () => {
      hasBeenCalled.current = true
      const ws = await getSocket()
      const accessInfo = getStore('accessInfo')

      if (!accessInfo) {
        router.push('/antechamber')
        return
      }

      ws.send({
        type: 'join',
        data: JSON.parse(accessInfo),
      })

      ws.listen('message', (event) => {
        console.log('event', event)

        const { type, data } = JSON.parse(event.data)

        if (type === 'users') {
          setUsers(data)
        }

        if (type === 'cards') {
          setCards(data.map((item: any) => ({ ...item, owner: item.name })))
        }
      })
    }

    if (hasBeenCalled.current) {
      return
    }

    joinRoom()
  }, [])

  const act = async (point: Point) => {
    const ws = await getSocket()
    const accessInfo = JSON.parse(getStore('accessInfo'))

    if (!accessInfo) {
      router.push('/antechamber')
      return
    }

    ws.send({
      type: 'act',
      data: {
        point,
        ...accessInfo,
      },
    })
  }

  const deck: Card[] = [
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
          <CardsList items={cards} autoWrap={true}>
            {(item) => <Card isBack={true} size="large" {...item} />}
          </CardsList>
        </div>
        <div className={styles.footer}>
          <CardsList items={deck}>
            {(item) => <Card clickHandler={act} {...item} />}
          </CardsList>
        </div>
      </section>
      <section className={styles.aside}>
        <List data={users}>
          {/*can I just User here?*/}
          {(item) => <User {...item} />}
        </List>
        <div className="story"></div>
      </section>
    </div>
  )
}

export default Room
