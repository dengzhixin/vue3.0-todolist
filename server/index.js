const express = require('express')
const app = express()
app.use(express.json())
app.get('/', async (req, res) => {
  res.send('index')
})

app.use(require('cors')()) //允许跨域
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/vue-todolist', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true
})
const Todo = mongoose.model('Todo', new mongoose.Schema({
  do: {
    type: String
  },
  status: {
    type: Number
  }
}))

app.post('/api/addTodo', async (req, res) => {
  const todo = await Todo.create(req.body)
  res.send(todo)
})
app.delete('/api/deleteTodo/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id)
  res.send(todo)
})
app.post('/api/updateTodo', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.body._id, req.body)
  res.send(todo)
})
app.get('/api/listTodo', async (req, res) => {
  const list = await Todo.find()
  res.send(list)
})
app.listen(3001, () => {
  console.log("start server:3001")
})