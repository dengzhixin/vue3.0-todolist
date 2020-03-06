import axios from 'axios'
const $http = axios.create({
  baseURL: 'http://localhost:3001/api'
})
const addTodo = (obj) => {
  return new Promise((resolve, reject) => {
    $http.post('/addTodo', obj).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })

}
const listTodo = () => {
  return new Promise((resolve, reject) => {
    $http.get('/listTodo').then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })

}
const updateTodo = (obj) => {
  return new Promise((resolve, reject) => {
    $http.post('/updateTodo', obj).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    $http.delete(`/deleteTodo/${id}`, ).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
export {
  addTodo,
  listTodo,
  updateTodo,
  deleteTodo
}