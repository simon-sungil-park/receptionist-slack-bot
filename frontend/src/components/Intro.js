import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSelectedEmployee, setSelectedReason } from '../actions'
import Employee from './Employee';

const styles = {
  intro: {
    width: '100vw',
    height: '100vh',
    background: "url(/images/intro.jpg) no-repeat center center fixed",
    backgroundSize: "cover"
  },
  startBtn: {
    width:"10em", 
    backgroundColor:"#008aff"
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
    initSelection: () => { 
      dispatch(setSelectedEmployee(null));
      dispatch(setSelectedReason(null));
    }
  }
}

class Intro extends React.Component {

  handleClcikStart = () => {
    this.props.initSelection();
    this.props.history.push("/reception/directory");
  }
  
  render() {

    const notifiedEmployees = 
      this.props.messages.reduce((a, m) => {
        if (a[m.user_id]) {
          a[m.user_id]++;
        }
        else {
          a[m.user_id] = 1;
        }
        return a;
      }, {});

    const notificationsJSX = Object.keys(notifiedEmployees).map(user_id => {
      const user = this.props.users.find(u => u.id === user_id);
      return user ? 
        <Employee employee={user} 
                  numberOfNotification={notifiedEmployees[user_id]} 
                  onClick={()=>{this.props.history.push('/livechat/' + user_id)}}
                  key={user_id} 
        /> :
        ''
    })

    return (
      <div style={styles.intro}>
        <div className="container">
          <div className="row" >
            <div className="col-sm-8">
              <div style={{height:150}}></div>
              <div className="mb-5" >
                <h1 className="text-white">Welcome to</h1>
                <h1 className="text-white"><strong>Company Name</strong></h1>
              </div>
              <h3 className="text-white mb-2">To meet us, tap the button</h3>
              <button className="btn btn-primary btn-lg" 
                      style={styles.startBtn}
                      onClick={this.handleClcikStart}
              >
                <strong>Start</strong>
              </button>
            </div>

            <div className="col-sm-4">
              <div style={{height:150}}></div>
              { notificationsJSX }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Intro));
