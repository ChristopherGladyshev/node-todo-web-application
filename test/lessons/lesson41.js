/* globals describe, it, before, after, afterEach, beforeEach */
const { expect } = require('chai')
const helpers = require('../helpers')

const db = require('../../src/model/db')
const {
  getTodos,
  getTodo,
  getCount
} = require('../../src/model/todo')
const request = require('supertest')
const uuid = require('uuid').v4
const app = require('../../src/server.js')

module.exports = describe('Урок 4.1', () => {
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

 
})
