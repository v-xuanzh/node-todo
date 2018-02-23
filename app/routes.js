const Todo = require('./models/todo')

function getTodos(res) {
  Todo.find((err, todos) => {
    if (err) return res.send(err)
    res.json(todos)
  })
}

module.exports = (app) => {
  app.get('/api/todos', getTodos)

  app.post('/api/todos', (req, res) => {
    Todo.create({
      text: req.body.text,
      done: false
    }, (err, todo) => {
      if (err) return res.send(err)
      getTodos(res)
    })
  })

  app.delete('/api/todos/:todo_id', (req, res) => {
    Todo.remove({
      _id: req.params.todo_id
    }, (err, todo) => {
      if (err) return res.send(err)
      getTodos(res)
    })
  })

  app.get('*', (req, res) => {
    res.sendFile(require('path').join(__dirname, '/public/index.html'))
  })
}
