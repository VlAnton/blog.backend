const wsClients = new Set()

function setupWebSocket(wss: any) {
  wss.on('connection', (ws: any) => {
    console.log('Клиент подключился')
    wsClients.add(ws)

    ws.on('close', () => {
      wsClients.delete(ws)
      console.log('Клиент отключился')
    })
  })
}

function broadcastNewPost(post: any) {
  const data = JSON.stringify({
    type: 'new_post',
    payload: post,
  })

  wsClients.forEach((ws: any) => {
    if (ws.readyState === 1) {
      ws.send(data)
    }
  })
}

function broadcastDeletePost(postId: string) {
  const data = JSON.stringify({
    type: 'delete_post',
    payload: postId,
  })
  wsClients.forEach((ws: any) => {
    if (ws.readyState === 1) {
      ws.send(data)
    }
  })
}

export default {
  setupWebSocket,
  broadcastNewPost,
  broadcastDeletePost,
}
