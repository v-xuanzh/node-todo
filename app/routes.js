module.exports = async (app) => {
  const Todo = await require('./models/todo')()

  app.get('/api/todos', async (req, res) => {
    res.json(await Todo.find())
  })

  app.post('/api/todos', async (req, res) => {
    await Todo.create({
      text: req.body.text,
      done: false
    })

    res.json(await Todo.find())
  })

  app.delete('/api/todos/:todo_id', async (req, res) => {
    await Todo.remove({ id: req.params.todo_id })
    res.json(await Todo.find())
  })

  app.get('*', (req, res) => {
    res.sendFile(require('path').resolve('./public/index.html'))
  })
}
