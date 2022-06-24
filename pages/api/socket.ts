import { NextApiRequest, NextApiResponse } from 'next';
import { WebSocketServer } from 'ws';
import { parse } from 'url';

type Dict = Record<string, any[]>

function setData(dict: Dict, key: string, value: any) {
  if (dict[key]) {
    dict[key].push(value)
  } else {
    dict[key] = [value]
  }
}

function broadcast(chanel: any[], msg: any) {
  chanel.forEach(function each(client: any) {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
}

export default function socket(req: NextApiRequest, res: NextApiResponse) {
  const { pathname } = parse(req.url as string);

  // avoid effect webpack/hmr??
  if (pathname !== '/api/socket') {
    return
  }

  let wss: WebSocketServer;
  // @ts-ignore
  if (!req.socket.server.wss) {
    // @ts-ignore
    // wss = new WebSocketServer({ server: req.socket.server })
    wss = new WebSocketServer({ port: 8888 })
    // @ts-ignore
    req.socket.server.wss = wss

    const users: Dict = {}
    const actions: Dict = {}
    const clients: Dict = {}

    wss.on('connection', function connection(ws: any) {
      ws.on('message', function message(raw: string) {
        console.log('received: ', typeof raw, raw);
        const { type, data } = JSON.parse(raw);

        data.status = 0

        if (type === 'join') {
          const { room } = data

          setData(users, room, data)
          setData(clients, room, ws)

          broadcast(clients[room], { type: 'users', data: users[room] })
        }

        if (type === 'act') {
          const { room, name } = data
          setData(actions, room, data)

          const target = users[room].find((item) => item.name === name)
          target.status = 1
          broadcast(clients[room], { type: 'users', data: users[room] })
          broadcast(clients[room], { type: 'cards', data: actions[room]})
        }
      });

      ws.send(JSON.stringify({ type: 'system', data: 'connected' }));
    });
  } else {
    console.log('already running');
  }

  res.status(200).json('ok')
}