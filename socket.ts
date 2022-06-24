interface socket {
  send: (data: any) => void
  listen: (msg: string, handler: (data: any) => void) => void
}

let ws: socket

const url = 'ws://localhost:8888'

export async function getSocket(): Promise<socket> {
  if (ws) {
    return ws
  }

  return fetch('/api/socket').then(() => {
    // ws = new WebSocket('ws://localhost:3000/api/socket');
    return new Promise((res, rej) => {

      const connect = new WebSocket(url);

      connect.onopen = function () {
        console.log('connected');
        ws = {
          send(data) {
            connect.send(JSON.stringify(data))
          },
          listen(msg, handler) {
            connect.addEventListener(msg, handler)
          }
        }

        res(ws)
      }

      connect.onmessage = function (event) {
        console.log('message is: ', event.data);
      }

      connect.onclose = function (event) {
        console.log('connection closed', event);
        rej(Error('websocket has been closed'))
      }
    })
  })
}