import { Hono } from 'hono'
import { graphqlServer } from 'npm:@hono/graphql-server'
import { buildSchema } from 'npm:graphql'

const app = new Hono()

const schema = buildSchema(`
type Query {
  hello: String
}
`)
const rootResolver = (ctx) => {
  return {
    hello: () => 'Hello Hono!',
  }
}

app.use(
  '/graphql',
  graphqlServer({
    schema,
    rootResolver,
  })
)

app.get('/', c => c.json({
  status: 'ok',
  repo: 'https://github.com/nakasyou/nakasyou-api'
}))

const birthday = new Date('2009-11-03').getTime()

const getOld = () => {
  const now = new Date(new Date().toISOString().slice(0, 10)).getTime()
  const ageMs = now - birthday
  const ageInYears = ageMs / (365.25 * 24 * 60 * 60 * 1000)
  const ageYears = Math.floor(ageInYears)
  const ageMonths = Math.floor((ageInYears - ageYears) * 12)
  const ageDays = Math.floor((ageInYears * 365.25) - (ageYears * 365.25) - (ageMonths * 30.4375))
  return {
    y: ageYears,
    m: ageMonths,
    d: ageDays
  }
}

app.get('/profile', c => c.json({
  name: 'Shotaro Nakamura',
  gender: 'male',
  post: '中2',
  birthday: new Date(birthday),
  old: getOld()
}))

app.get('/mood', async c => {
  const status = await fetch('https://raw.githubusercontent.com/nakasyou/nakasyou-status/main/status.json' + `?l=${addUrl}`).then(res => res.json())
  return c.json({
    mood: status.mood.mood,
    reason: status.mood.reason
  })
})

app.get('/is-happy', c => c.json(true)) // いつでも幸せで！

let count = 0
let addUrl = Math.random().toString(16)
app.get('/sleep/:date', async c => {
  count ++
  if (count > 10) {
    count = 0
    addUrl = Math.random().toString(16)
  }
  const data = await fetch('https://raw.githubusercontent.com/nakasyou/nakasyou-status/main/sleep.json').then(res => res.json())
  
  const date = c.req.param('date')

  if (!data[date]) {
    c.status(404)
    return c.json({
      error: 'データが存在しません。'
    })
  }

  return c.json(data[date])
})
Deno.serve(app.fetch)
