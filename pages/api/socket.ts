import { NextApiRequest, NextApiResponse } from 'next';
import { WebSocketServer } from 'ws';
import { parse } from 'url';

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

    const users: string[] = []
    wss.on('connection', function connection(ws: any) {
      ws.on('message', function message(data: any) {
        console.log('received: %s', typeof data, data);
        const [type, content] = String(data).split(':');

        if(type === 'join') {
          users.push(content);

          wss.clients.forEach(function each(client: any) {
            if (client.readyState === ws.OPEN) {
              client.send(JSON.stringify(users));
            }
          });
        }
      });

      ws.send('connected');
    });
  } else {
    console.log('already running');
  }

  res.status(200).json('ok')
}