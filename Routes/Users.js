import express from 'express'

import User from '../Models/User.js'
import {createUser, getAllUser, getById, updateUser } from '../Controllers/userController.js'
const router = express.Router()


router.get('/', getAllUser )

const getUser = async (req, res, next) => {
    let users;
    try {
        users = await User.findById(req.params.id)
        if (users === null) {
            return res.status(404).json({ message: "not found" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.users = users
    next()
}

router.get('/:id', getUser, getById)

router.post('/new', createUser)


router.patch('/:id', getUser, updateUser)


router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.users.deleteOne()
        res.json({ message: "Deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})





export default router