import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './index.module.css'
import cls from 'classnames'
import { Role } from '../../components/user'
import { getStore, setStore } from '../../store'

export default function () {
  const router = useRouter()
  const roles = Object.keys(Role)

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [role, setRole] = useState(roles[0])
  const [hint, setHint] = useState('')
  const accessInfo = JSON.parse(getStore('accessInfo') ?? null)

  if (accessInfo) {
    router.push(`/room/${accessInfo.room}`)
  }

  const access = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!room) {
      setHint('Please input room')
      return
    }

    if (!username) {
      setHint('Please input username')
      return
    }

    if (!role) {
      setHint('Please select role')
      return
    }


    const dataStr = JSON.stringify(accessInfo)
    setStore('accessInfo', dataStr)

    router.push(`/room/${room}`)
  }

  const updateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHint('')
    setUsername(e.target.value)
  }

  const updateRoom= (e: React.ChangeEvent<HTMLInputElement>) => {
    setHint('')
    setRoom(e.target.value)
  }

  const updateRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value)
  }

  return <div className={styles.container}>
    <div className={styles.panel}>
      <form>
        <div className={styles.item}>
          <label htmlFor='username'>Room : </label>
          <input value={room} onChange={updateRoom} className={styles.input} id="room" name="room" />
        </div>

        <div className={styles.item}>
          <label htmlFor='username'>Name : </label>
          <input value={username} onChange={updateUserName} className={styles.input} id="username" name="username" />
        </div>

        <div className={styles.item}>
          <fieldset className={styles.fieldset}>
            <legend>Specify your role</legend>
            {
              roles.map((item) => <>
                <input defaultChecked={item === role} type="radio" id={item} name={item.toLowerCase()} onChange={updateRole} />
                <label htmlFor={item}>{item}</label><br />
              </>)
            }
          </fieldset>
        </div>

        <div className={cls(styles.item, styles.hint)}>{hint}</div>
        <div className={cls(styles.item, styles.center)}>
          <button className={styles.button} onClick={access}> access </button>
        </div>
      </form>
    </div>

  </div>
}
