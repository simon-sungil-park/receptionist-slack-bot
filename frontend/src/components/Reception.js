import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Directory from './Directory';
import Reason from './Reason';
import Result from './Result';
import Visitor from './Visitor'
import Navbar from './Navbar'

class Reception extends React.Component {

  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        <div style={{height:20}}></div>

        <Switch>
          <Route exact path={this.props.match.url + "/directory"} 
                 render={()=><Directory />} 
          />
          <Route exact path={this.props.match.url + "/reason"} 
                 render={()=><Reason />} 
          />
          <Route exact path={this.props.match.url + "/visitor"} 
                 render={()=><Visitor />} 
          />
          <Route exact path={this.props.match.url + "/result"} 
                 render={()=><Result />} 
          />
          <Route render={()=><Redirect to="/" />} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Reception);
