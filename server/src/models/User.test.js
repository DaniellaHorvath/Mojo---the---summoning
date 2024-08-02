const { describe, it, expect, beforeAll, afterEach } = require('@jest/globals')
const { User, Deck } = require('./index.js')
const { db } = require('../db/config.js')

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
})

afterEach(async () => {
  await db.truncate({ cascade: true })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('The User model', () => {
  it('Creates a user', async () => {
    const user = await User.create({ username: 'dumbledore'})
    expect(user).toBeInstanceOf(User)
    expect(user.username).toBe('dumbledore')
  })

  it('Finds a user', async () => {
    await User.create({ username: 'gandalf'})

    const user = await User.findOne({where: { username: 'gandalf' }})
    expect(user).toBeInstanceOf(User)
    expect(user.username).toBe('gandalf')
  })

  it('Updates a user', async () => {
    let user = await User.create({ username: 'merlyn'})
    user = await user.update({ username: 'merlin'})
    expect(user.username).toBe('merlin')
  })

  it('Deletes a user', async () => {
    let user = await User.create({ username: 'grindelwald'})
    await user.destroy()
    user = await User.findByPk(user.id)
    expect(user).toBeNull()

  })

  it('Has exactly one deck', async () =>{
    let user = await User.create({ username: 'ancano'})
    const deck = await Deck.create({ name: 'Fire', xp: 150})
    const deck1 = await Deck.create({ name: 'Water', xp: 75})

    await user.setDeck(deck)
    await user.setDeck(deck1)

    user = await User.findByPk(user.id)
    const finalDeck = await user.getDeck()

    expect(finalDeck.toJSON()).toEqual(deck1.toJSON())
  })
})
