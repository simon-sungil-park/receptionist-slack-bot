import axios from 'axios';

export const fetchUsers = () => {
  return new Promise( (resolve, reject) => {
    axios.get('/api/bot/users/')
      .then(result => {
        resolve([...result.data.users]); 
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const postMessage = (user_id, message) => {
  return new Promise( (resolve, reject) => {
    axios.post('/api/bot/messages/', {user_id, message})
      .then(result => {
        resolve(true); 
      })
      .catch(err => {
        reject(err);
      })
  })
}
