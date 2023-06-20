const Router = require('koa-router')
const koaBody = require('koa-body')
const totalMiddleware = require('../middlewares/total-headers')
const { apiAuth } = require('../middlewares/auth')
const { stringifyStream } = require('../model/helpers')
const { NotFoundError } = require('../model/errors')
const {
  getTodo,
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
  createTodosFromText
} = require('../model/todo')

const {
  exportTodoTxt
} = require('../model/todotxt')
const ObjectID = require('mongodb').ObjectID

function _todoTxtStringify({ doc }) {
  if (!doc) {
    return ''
  }

  return exportTodoTxt(doc)
}

function parseFilterValue(value) {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }
  return value
}

/**
 * Возвращает описание записи в списке дел,
 * читая необходимые параметры из тела POST-запроса
 * @param {Object} requestBody - тело POST-запроса
 * @returns {import('../model/todo').TodoEntry} - запись списка дел
 */
function parseTodo(requestBody) {
  let completedAt = null;
  if (requestBody.completed) completedAt = new Date;
  const todo = {
    ...requestBody,
    completedAt,
  }
  return todo
}

const router = new Router({
  prefix: '/api/v1/todos'
})

router.use(apiAuth)

// Получение списка задач. Фильтры задаются параметрами GET-запроса
router.get('/', totalMiddleware, async (ctx, next) => {
  const { contentType, ...query } = ctx.query

  const filter = {
    ...Object.
      entries(query).
      reduce((result, [key, value]) => {
        if (key === 'id') key = '_id';
        return {
          ...result,
          [key]: parseFilterValue(value),
        }
      }, {})

    /*
      TODO [Урок 5.3]: Добавьте фильтр по email-адреса пользователя при получении записей из БД
    */
  }

  const cursor = getTodos(filter)
  switch (contentType) {
    case 'todotxt':
      ctx.type = 'text/plain'
      ctx.body = cursor.pipe(stringifyStream(_todoTxtStringify))
      return
    default:
      ctx.type = 'application/json'
      ctx.body = cursor.pipe(stringifyStream())
  }
})

// Получение одной записи из списка дел по идентификатору
router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params;

  /*
      TODO [Урок 5.3]: Добавьте фильтр по email-адреса пользователя при получении записей из БД
  */

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const result = await getTodo(ObjectID(id));
    ctx.status = 200
    ctx.body = { ...result }
    return
  }

  ctx.status = 400
  return
})

// Создание записей в списке дел.
// При успешном выполнении возвращает 201 статус и заголовок Location с
//   идентификатором созданного ресурса
router.post('/', koaBody({ multipart: true }), totalMiddleware, async (ctx, next) => {
  if (ctx.request.body.contentType === 'todotxt') {
    /*
      TODO [Урок 5.3]: Добавьте email-адрес пользователя к записям TODO

      Используйте второй аргумент функции #createTodosFromText.
      В случае необходимости, реализуйте недостающую логику в функции #createTodosFromText
    */
    const result = await createTodosFromText(ctx.request.files.todotxt.path)
    ctx.body = result
    ctx.status = 201
    return
  }

  const todo = parseTodo(ctx.request.body)
  /*
    TODO [Урок 5.3]: Добавьте email-адрес пользователя при создании записи в списке дел
    todo.email = ...
  */
  const id = await createTodo(todo)
  ctx.set('Location', `/api/v1/todos/${id}`)
  ctx.status = 201
})

// Удаление записи по идентификатору
router.delete('/:id', totalMiddleware, async (ctx, next) => {
  const result = await deleteTodo({
    _id: ctx.params.id
    /*
      TODO [Урок 5.3]: Добавьте проверку email-адреса пользователя при удалении записей из БД
    */
  })
  if (!result) {
    throw new NotFoundError(`todo with ID ${ctx.params.id} is not found`)
  }
  ctx.body = null
})

// Обновление записи с указанным идентификатором
router.patch('/:id', koaBody(), totalMiddleware, async (ctx, next) => {
  console.log(ctx.request.body);
  const result = await updateTodo({
    _id: ctx.params.id
    /*
      TODO [Урок 5.3]: Добавьте проверку email-адреса пользователя при обновлении записей в БД
    */
  }, { ...ctx.request.body });
  if (!result) {
    throw new NotFoundError(`todo with ID ${ctx.params.id} is not found`)
  }
  ctx.body = null
})

module.exports = [
  router.routes(),
  router.allowedMethods()
]
