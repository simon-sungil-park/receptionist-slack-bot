import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar'
import moment from 'moment'
import Employee from './Employee'
import { addMessage, clearReadMessages } from '../actions'
import { postMessage } from '../web-apis'

const styles = {
  chatbox: {
    height:200, 
    overflowY:'scroll', 
    border:"1px solid rgba(0,0,0,.125)", 
    borderRadius:".25rem"
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => {
      dispatch( addMessage(message) )
    },
    clearReadMessages: user_id => {
      dispatch( clearReadMessages(user_id) )
    }
  }
}

class LiveChat extends React.Component {

  constructor() {
    super();

    this.state = {
      inputMsg: ''
    }
  }

  componentDidMount() {
    try {
      this.refs.chatbox.scrollTop = this.refs.chatbox.scrollHeight;
    }
    catch(err) {
    }
  }
  
  componentDidUpdate() {
    this.refs.chatbox.scrollTop = this.refs.chatbox.scrollHeight;
  }

  componentWillUnmount() {
    this.props.clearReadMessages(this.props.match.params.userid);
  }

  handleTextChange = (evt) => {
    this.setState({
      inputMsg: evt.target.value
    });
  }

  handleSumbit = (evt) => {
    evt.preventDefault();

    this.sendMessage(this.state.inputMsg);

    this.setState({inputMsg: ''})
    this.refs.messageText.focus();
  }

  sendMessage = (text) => {
    postMessage(this.props.match.params.userid, 'The visitor said "' + text +'"')
      .then(result => {
        this.props.addMessage({
          isReceived: false,  
          user_id: this.props.match.params.userid,
          text: text,
          timestamp: moment()
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    const user = 
      this.props.users.find(u => u.id === this.props.match.params.userid);

    if (!user) {
      return <div></div>
    }

    const messages = 
      this.props.messages.filter(m => m.user_id === this.props.match.params.userid);

    const chatsJSX = messages.map( (m, i) => {
      return (
        <p key={i} 
           className={"my-0" + (m.isReceived ? " text-primary" : " text-secondary")} 
           style={{fontSize: '1.2em'}}
        > 
          <strong>{m.isReceived ? user.name : 'Visitor'}:</strong>
          <span className="ml-2">{m.text}</span>
        </p>
      )
    })

    return (
      <div style={{height:340, position:'relative'}}>
        <Navbar history={this.props.history} />
        <div style={{height:15}}></div>
        <div className="container" > 
          <div className="row">
            <div className="col-sm-3">
              <Employee employee={user} />
              <button className="btn btn-secondary btn-lg" 
                      style={{width:'100%'}} 
                      onClick={()=>{this.props.history.push("/")}}
              >
                Exit
              </button>
            </div>

            <div className="col-sm-9">
              <div className="p-2 div-shadow ios-touch" 
                   style={styles.chatbox} 
                   ref="chatbox"
              >
                {chatsJSX}
              </div>
            </div>
          </div>
        </div>
        <div style={{position:'absolute', bottom:0, left:0, width:'100%'}}>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <button className="btn btn-outline-primary btn-lg" 
                        style={{width:'45%', marginRight:'10%'}} 
                        onClick={()=>{this.sendMessage('Okay'); this.refs.messageText.focus();}}
                >
                  Okay
                </button>
                <button className="btn btn-outline-primary btn-lg" 
                        style={{width:'45%'}} 
                        onClick={()=>{this.sendMessage('Yes'); this.refs.messageText.focus();}}
                >Yes
                </button>
              </div>
              <div className="col-9">
                <form className="form-row" onSubmit={this.handleSumbit} >
                  <div className="col-10">
                    <input type="text" 
                          ref="messageText"
                          name="message"
                          className="form-control form-control-lg" 
                          placeholder="Message" 
                          onChange={this.handleTextChange}
                          value={this.state.inputMsg}
                          autoFocus
                    />
                  </div>
                  <div className="col-2">
                    <input type="submit" className="btn btn-primary btn-lg" 
                                style={{width:"100%", backgroundColor:"#008aff"}}
                                value="Send"
                                disabled={ this.state.inputMsg.length < 1 }                                  
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LiveChat));
