const { describe, it, expect, beforeAll, afterEach } = require('@jest/globals')
const { User, Deck, Card } = require('./index.js')
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

describe('The Deck model', () => {
    it('Create a deck', async () => {
        const deck = await Deck.create({ name: 'Fire', xp: 150})
        expect(deck).toBeInstanceOf(Deck)
        expect(deck.name).toBe('Fire')
        expect(deck.xp).toBe(150)
    })

    it('Find a deck', async () => {
        await Deck.create({ name: 'Fire', xp: 150})

        const deck = await Deck.findOne({ where: { name: 'Fire', xp: 150}})
        expect(deck).toBeInstanceOf(Deck)
        expect(deck.name).toBe('Fire')
        expect(deck.xp).toBe(150)
        
    })

    it('Update a deck', async () => {
        let deck = await Deck.create({ name: 'Firee', xp: 152})
        deck =  await deck.update({ name: 'Fire', xp: 150})
        expect(deck.name).toBe('Fire')
        expect(deck.xp).toBe(150)

    })

    it('Delete a deck', async () => {
        let deck = await Deck.create({ name: 'Firee', xp: 152})
        await deck.destroy()
        deck = await Deck.findByPk(deck.id)
        expect(deck).toBeNull()
    })

    it('Has exactly one user', async () =>{
        let deck = await Deck.create({ name: 'Fire', xp: 150})

        const user = await User.create({ username: 'gandalf'})
        const user1 = await User.create({ username: 'dumbledore'})

        await deck.setUser(user)
        await deck.setUser(user1)

        deck = await Deck.findByPk(deck.id)
        const finalUser = await deck.getUser()

        expect(finalUser.toJSON()).toEqual(user1.toJSON())
    })
})