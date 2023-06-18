const { expect } = require('chai');
const { sum, createTodo, stubTestUser } = require('./helpers');
const db = require('../src/model/db')
const {
  getTodos,
  getTodo,
  getCount
} = require('../src/model/todo')
const app = require('../src/server.js')
const uuid = require('uuid').v4
const request = require('supertest')

describe.only('Урок 3.3', () => {

  let collection

  before(async () => {
    await db.init()
    collection = await db.getCollection('todos')
  })

  after(async () => {
    await db.close()
  })

  afterEach(async () => {
    await collection.deleteMany()
  })

  it('Функция sum возвращает сумму аргументов', () => {
    expect(sum(1, 2, 3)).to.equal(6);
  })

  describe('#GET /api/v1/todo/:id', () => {
    it('должен возвращать todo по идентификатору', async () => {
      const email = stubTestUser().email
      const todo = await createTodo({ foo: uuid(), email })
      return new Promise((resolve, reject) => {
        request(app.callback())
          .get(`/api/v1/todos/${todo._id}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.equal({
              ...todo,
              _id: todo._id.toString()
            })
            resolve()
          })
          .catch(reject)
      })
    })

    it('должен возвращать ошибку, если идентификатор имеет неверный формат', async () => {
      stubTestUser()
      return new Promise((resolve, reject) => {
        request(app.callback())
          .get(`/api/v1/todos/${uuid()}`)
          .expect(400)
          .then(resolve)
          .catch(reject)
      })
    })

    it('Возвращает todo по id', async () => {
      const expectedResult = await createTodo()
      const result = await getTodo({id: expectedResult._id})
      expect(result).to.deep.equal(expectedResult)
    })
  })
})