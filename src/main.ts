import { Hono } from 'hono'

const app = new Hono()

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

app.get('/profile', c.json({
  name: 'Shotaro Nakamura',
  gender: 'male',
  post: '中2',
  birthday: new Date(birthday),
  old: getOld()
}))

Deno.serve(app.fetch)
