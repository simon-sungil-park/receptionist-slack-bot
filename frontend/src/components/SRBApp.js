import React from 'react';
import moment from 'moment'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setUsers, setReasons, addMessage } from '../actions'
import { fetchUsers } from '../web-apis/'
import Intro from './Intro';
import Reception from './Reception';
import LiveChat from './LiveChat';

const mapDispatchToProps = dispatch => {
  return {
    setUsers: users => { 
      dispatch( setUsers(users) )
    },
    setReasons: reasons => {
      dispatch( setReasons(reasons) )
    },
    addMessage: message => {
      dispatch( addMessage(message) )
    }
  }
}

class SRBApp extends React.Component {

  constructor() {
    super();

    this.connectWebSocket();
  }
  
  componentDidMount() {
    fetchUsers()
      .then(users => {
        this.props.setUsers( 
          users.sort((a,b) => a.name.localeCompare(b.name))
        );
      })
      .catch(err => {
        console.log(err);
      })

    // timers for keeping websocket connection
    this.timerForCheck = setInterval(this.checkConnection, 1000*14);
    this.timerForPing = setInterval(this.pingConnection, 1000*9);
  }

  componentWillUnmount() {
    if (this.timerForCheck) {
      clearInterval(this.timerForCheck);
    }

    if (this.timerForPing) {
      clearInterval(this.timerForPing);
    }

    if (this.connection) {
      this.connection.close();
    }
  }

  connectWebSocket = () => {
    this.connection = 
      new WebSocket(
        ((window.location.protocol === "https:") ? "wss://" : "ws://") + 
        ((window.location.host === 'localhost:3000') ? 'localhost:8080': window.location.host)
      ); // changes connection url depending on test and production environment

    this.connection.onmessage = evt => { 
      // receives messages
      const slackMsg = JSON.parse(evt.data);

      // stores messages
      this.props.addMessage({
        isReceived: true,  
        user_id: slackMsg.user,
        text: slackMsg.text,
        timestamp: moment()
      });
    };

    // keeps connection
    this.connection.onclose = evt => { 
      setTimeout(this.connectWebSocket, 500);
    };
  }
  
  // keeps connection
  checkConnection = () => {
    if (!this.connection || this.connection.readyState !== 1) {
      this.connectWebSocket();
    }
  }

  // keeps connection
  pingConnection = () => {
    if (this.connection) {
      this.connection.send('Ping:'+Math.random());
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={()=><Intro />} />
          <Route path="/reception" render={()=><Reception />} />
          <Route path="/livechat/:userid" render={()=><LiveChat />} />
          <Route render={()=><Redirect to="/" />} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SRBApp));