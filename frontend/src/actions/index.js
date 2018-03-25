import { SET_USERS, SET_REASONS, SET_SELECTED_EMPLOYEE, SET_SELECTED_REASON } from '../constants/action-types';
import { SET_VISITOR, ADD_MESSAGE, CLAER_EXPIREDMESSAGES, CLAER_READMESSAGES } from '../constants/action-types';

export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  }
}

export const setReasons = reasons => {
  return {
    type: SET_REASONS,
    reasons
  }
}

export const setSelectedEmployee = employee => {
  return {
    type: SET_SELECTED_EMPLOYEE,
    employee
  }
}

export const setSelectedReason = reason => {
  return {
    type: SET_SELECTED_REASON,
    reason
  }
}

export const setVisitor = visitor => {
  return {
    type: SET_VISITOR,
    visitor
  }
}

export const addMessage = message => {
  return {
    type: ADD_MESSAGE,
    message
  }
}

export const clearExpiredMessages = () => {
  return {
    type: CLAER_EXPIREDMESSAGES,
  }
}

export const clearReadMessages = (user_id) => {
  return {
    type: CLAER_READMESSAGES,
    user_id
  }
}
