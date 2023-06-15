
import User from '../Models/User.js'


export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const  getById = (req, res) => {
    res.send(res.users)
}

export const createUser = async (req, res) => {
    const users = new User(req.body)
    try {
        const newUsers = await users.save()
        res.status(201).json(newUsers)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
      // if (req.body.fullname != null) {
    // res.users.fullname = req.body.fullname
    // }
    // if (req.body.email != null) {
    //     res.users.email = req.body.email
    // }
    try {
        const updatedUser = await res.users.updateOne({ $set: { fullname: req.body.fullname, email: req.body.email, image: req.body.image, mobile: req.body.mobile, interest: req.body.interest } })
        res.status(200).json(updatedUser)
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}

