const Note = require('../models/Note')
const User = require('../models/User')
const testingRouter = require('express').Router()

testingRouter.post('/reset', async (req, res) => {
    await Note.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})

module.exports = testingRouter
