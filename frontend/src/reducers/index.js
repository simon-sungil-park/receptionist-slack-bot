import { combineReducers } from 'redux';
import { SET_USERS, SET_REASONS, SET_SELECTED_EMPLOYEE, SET_SELECTED_REASON } from '../constants/action-types';
import { SET_VISITOR, ADD_MESSAGE, CLAER_EXPIREDMESSAGES, CLAER_READMESSAGES } from '../constants/action-types';

const users = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users 

      default:
      return state
  }
}

const initialReasons = [
  { id:'1', message:'Delivery', need_visitor: false},
  { id:'2', message:'Meeting', need_visitor: true},
]

const reasons = (state = initialReasons, action) => {
  switch (action.type) {
    case SET_REASONS:
      return action.reasons

    default:
      return state
  }
}

const selectedEmployee = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_EMPLOYEE:
      return action.employee 

      default:
      return state
  }
}

const selectedReason = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_REASON:
      return action.reason

    default:
      return state
  }
}

const visitor = (state = null, action) => {
  switch (action.type) {
    case SET_VISITOR:
      return action.visitor

    default:
      return state
  }
}

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.message]

    case CLAER_EXPIREDMESSAGES:
      return action.message

    case CLAER_READMESSAGES:
      return state.filter(m => m.user_id !== action.user_id)

    default:
      return state
  }
}

// combine reducers
const receptionReducers = combineReducers(
  {
    users,
    reasons,
    selectedEmployee,
    selectedReason,
    visitor,
    messages
  }
)

export default receptionReducers;




