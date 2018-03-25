import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { postMessage } from '../web-apis'
import { PulseLoader } from 'react-spinners'
import { setSelectedEmployee, setSelectedReason } from '../actions'


const mapStateToProps = state => {
  return {
    selectedEmployee: state.selectedEmployee,
    selectedReason: state.selectedReason,
    visitor: state.visitor
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

class Result extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true
    }

    this.timer = null;
  }

  componentDidMount() {
    if ( (!this.props.selectedEmployee || !this.props.selectedReason) ||
         (this.props.selectedReason.need_visitor && !this.props.visitor)
    ) {
      return (
        <Redirect to="/" />
      )
    }
    
    let message = '';
    
    if ( this.props.selectedReason.need_visitor ) {
      message = 
        this.props.visitor.name.split('')
                               .map((c,i) => (i===0 ? c.toUpperCase() : c))
                               .join('');
    }
    else {
      message = 'A delivery'
    }

    message += ' is waiting for you now at the main enterance.'

    postMessage(this.props.selectedEmployee.id, message)
      .then(result => {
        this.setState({
          isLoading: false
        });
        this.timer = setTimeout(()=>{this.props.history.push('/')}, 7000);
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        console.log(err);
      })
  }

  componentWillUnmount() {
    this.props.initSelection();

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {

    if ( (!this.props.selectedEmployee || !this.props.selectedReason) ||
         (this.props.selectedReason.need_visitor && !this.props.visitor)
    ) {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div className="container">
        <div style={this.state.isLoading ? {} : {display: 'none'} } >
          <div className="row mt-5">
            <div className="mx-auto">
              <PulseLoader
                color={'#008aff'} 
                loading={this.state.isLoading} 
                size={40}
              />
            </div>
          </div>
          <h3 className="text-center mt-5" >
            Your message is being sent to 
            <strong>{this.props.selectedEmployee.name}</strong>. 
          </h3>
        </div>

        <div style={this.state.isLoading ? {display: 'none'} : {} } >
          <h3 className="text-center mt-5" >
            Your message has been sent to 
            <strong>{this.props.selectedEmployee.name}</strong>. 
          </h3>
          <h3 className="text-center mt-5" >
            Please, wait for a while. 
          </h3>

          <div className="row mt-5">
            <div className="mx-auto">
              <button className="btn btn-primary btn-lg" 
                          style={{width:"10em", backgroundColor:"#008aff"}}
                          onClick={()=>{this.props.history.push('/')}}
              >
              Ok  
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result));
