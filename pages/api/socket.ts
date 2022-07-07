import { NextApiRequest, NextApiResponse } from 'next'
import { WebSocketServer } from 'ws'
import { parse } from 'url'
import { Status } from '../../components/user'

type Dict = Record<string, any[]>

function setData(
  dict: Dict,
  key: string,
  value: any,
  updateExist: boolean = false
) {
  const data = dict[key]

  if (data) {
    const index = data.findIndex((item) => item.id === value.id)

    if (index > -1) {
      if (updateExist) {
        data[index] = { ...data[index], ...value }
      }
    } else {
      data.push(value)
    }
  } else {
    dict[key] = [value]
  }
}

function broadcast(chanel: any[], msg: any) {
  chanel.forEach(function each(client: any) {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(msg))
    }
  })
}

export default function socket(req: NextApiRequest, res: NextApiResponse) {
  const { pathname } = parse(req.url as string)

  let wss: WebSocketServer
  // @ts-ignore
  if (!res.socket.server.wss) {
    wss = new WebSocketServer({ noServer: true })
    // @ts-ignore
    res.socket.server.wss = wss

    // @ts-ignore
    const server = res.socket.server

    server.on('upgrade', (request: any, socket: any, head: any) => {
      const pathname = parse(request.url as string).pathname
      if (pathname === '/api/socket') {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request)
        })
      }
    })

    const users: Dict = {}
    const actions: Dict = {}
    const clients: Dict = {}

    wss.on('connection', function connection(ws: any) {
      ws.on('message', function message(raw: string) {
        const { type, data } = JSON.parse(raw)

        if (type === 'join') {
          const { room, ...userData } = data

          setData(users, room, { ...userData, status: Status.Pending })
          setData(
            clients,
            room,
            {
              id: userData.id,
              send: (...args: any[]) => {
                ws.send(...args)
              },
              readyState: ws.readyState,
              OPEN: ws.OPEN,
            },
            true
          )

          broadcast(clients[room], { type: 'users', data: users[room] })
          broadcast(clients[room], { type: 'cards', data: actions[room] ?? [] })
        }

        if (type === 'act') {
          const { room, id } = data
          setData(actions, room, data, true)

          const target = users[room].find((item) => item.id === id)
          target.status = Status.Voted
          broadcast(clients[room], { type: 'users', data: users[room] })
          broadcast(clients[room], { type: 'cards', data: actions[room] })
        }
      })

      ws.send(JSON.stringify({ type: 'system', data: 'connected' }))
    })
  } else {
    console.log('already running')
  }

  res.status(200).json('ok')
}
