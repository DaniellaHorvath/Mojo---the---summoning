const { describe, it, expect, beforeAll, afterEach } = require('@jest/globals')
const { User, Deck, Attack } = require('./index.js')
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

describe('The Attack model', () => {
    it('Creates an attack', async () => {
        const attack = await Attack.create({title: 'snake pit', mojoCost: 20, staminaCost: 50})
        // expect(attack).toBeInstanceOf(Attack)
        expect(attack.title).toBe('snake pit')
        expect(attack.mojoCost).toBe(20)
        expect(attack.staminaCost).toBe(50)
    })

    it('Finds an attack', async () => {
        await Attack.create({title: 'snake pit', mojoCost: 20, staminaCost: 50})

        const attack = await Attack.findOne({ where: {title: 'snake pit', mojoCost: 20, staminaCost: 50}})
        expect(attack).toBeInstanceOf(Attack)
        expect(attack.title).toBe('snake pit')
        expect(attack.mojoCost).toBe(20)
        expect(attack.staminaCost).toBe(50)
    })

    it('Updates an attack', async () => {
        let attack = await Attack.create({title: 'snake pitt', mojoCost: 10, staminaCost: 40})
        attack = await attack.update({title: 'snake pit', mojoCost: 20, staminaCost: 50})
        expect(attack.title).toBe('snake pit')
        expect(attack.mojoCost).toBe(20)
        expect(attack.staminaCost).toBe(50)
    })

    it('Delete an attack', async () => {
        let attack = await Attack.create({title: 'snake pit', mojoCost: 20, staminaCost: 50})
        await attack.destroy()
        attack = await Attack.findByPk(attack.id)
        expect(attack).toBeNull()
    })
    
})