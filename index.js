require('dotenv').config();

const express = require('express'),
      WebSocket = require('ws'),
      Slack = require('slack'),
      bodyParser = require('body-parser'),
      http = require('http');

const port = process.env.PORT || 8080;
const token = process.env.SLACK_BOT_TOKEN

// creates http server and websocket server
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// create slack bot
const slackBot = new Slack({token})

// middleware
app.use(express.static(__dirname+'/frontend/build'));
app.use(bodyParser.json());

// GET /api/bot/users/
app.get('/api/bot/users/', (req, res) => {
  slackBot.users.list()
    .then(result => {
      res.json({
        ok: true, 
        users: result.members
          .map(user => {
            return {
              id: user.id,
              name: user.real_name,
              first_name: user.profile.first_name,
              last_name: user.profile.last_name,
              image_url: user.profile.image_192,
              is_bot: user.is_bot
            }
          })
          .filter(user => ( !user.is_bot && user.id !== 'USLACKBOT' ))
      })
    })
    .catch(err => {
      res.status(500).json({ok: false, msg: 'Internal Error'});
    })
})

// POST /api/bot/messages/
app.post('/api/bot/messages/', (req, res) => {
  const { user_id, message } = req.body;
  slackBot.im.open({user: user_id})
    .then( result => {
      return slackBot.chat.postMessage(
        {
          channel:result.channel.id, 
          text:message
        }
      );
    })
    .then( result => {
      res.json({ok: true});
    })
    .catch( err => {
      res.status(500).json({ok: false, msg: 'Internal Error'});
    });
})

// GET *
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
})

// websocket broadcase function
wss.broadcast = data => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// starts server 
server.listen(port, function listening() {
  console.log('Listening on %d...', server.address().port);

  // starts slack rtm
  slackBot.rtm.start()
    .then(result => {
      const ws = new WebSocket(result.url);
        
      ws.on('open', function open() {
        console.log('Slack RTM open');
      });

      ws.on('close', function close() {
        console.log('Slack RTM close');
      });
      
      // passes messages to clients
      ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
        if (message.type === 'message' && message.subtype !== "bot_message") {
          wss.broadcast(data);
        }
      });

    })
    .catch(err => {
      console.log('Slack RTM:', err);
    })  
});
