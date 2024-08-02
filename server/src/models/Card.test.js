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

describe('The Card model', () => {
    it('Create the Card', async () => {
        const card = await Card.create({ name: 'Arcturus Spellweaver', mojo: 100, stamina: 20, imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'})
    
        expect(card.name).toBe('Arcturus Spellweaver')
        expect(card.mojo).toBe(100)
        expect(card.stamina).toBe(20)
        expect(card.imgUrl).toBe('http://localhost:5000/img/arcturus-spellweaver.jpg')

    })

    it('Finds a card', async () => {
        await Card.create({ name: 'Arcturus Spellweaver', mojo: 100, stamina: 10, imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'})

        const card = await Card.findOne({ where: { name: 'Arcturus Spellweaver', mojo: 100, stamina: 10, imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'}})
      
        expect(card.name).toBe('Arcturus Spellweaver')
        expect(card.mojo).toBe(100)
        expect(card.stamina).toBe(10)
        expect(card.imgUrl).toBe('http://localhost:5000/img/arcturus-spellweaver.jpg')
    })

    it('Update a card', async () => {
        let card = await Card.create({ name: 'Arcturus Spellweaver', mojo: 100, stamina: 10, imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'})
        card = await card.update({ name: 'Nimue Mistral', mojo: 100, stamina: 10, imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'})
        expect(card.name).toBe('Nimue Mistral')
        expect(card.mojo).toBe(100)
        expect(card.stamina).toBe(10)
        expect(card.imgUrl).toBe('http://localhost:5000/img/nimue-mistral.jpg')
    })

    it('Deletes a card', async () => {
        let card = await Card.create({ name: 'Nimue Mistral', mojo: 100, stamina: 10, imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'})
        await card.destroy()
        card = await Card.findByPk(card.id)
        expect(card).toBeNull()
    })

})