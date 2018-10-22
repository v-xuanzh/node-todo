const CosmosClient = require('@azure/cosmos').CosmosClient

const endpoint = process.env.AZURE_COSMOS_ENDPOINT
const masterKey = process.env.AZURE_COSMOS_MASTER_KEY
const databaseId = process.env.AZURE_COSMOS_DATABASE_ID || 'todos'

module.exports = async function databaseInit () {
  const client = new CosmosClient({ endpoint, auth: { masterKey }})

  // Create the database if it doesn't exist.
  await client.databases.createIfNotExists({ id: databaseId })

  const { container } = await client.database(databaseId)
      .containers.createIfNotExists({ id: 'todo' })

  return {
    find: async function find() {
      const { result: results } = await container.items
        .query('SELECT r.id, r.text, r.done FROM root r').toArray()

      return results
    },
    create: async function create(todo) {
      const { item } = await container.items.create(todo)

      return item
    },
    remove: async function remove(todo) {
      return await container.item(todo.id).delete(todo)
    }
  }
}
