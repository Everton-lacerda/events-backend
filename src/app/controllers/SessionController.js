import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

import User from '../models/Users'
import AuthConfig from '../../config/auth'

class SessionController {
    async store(req, res) {

        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ error: 'User not found' })
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'password does not match' })
        }

        const { id, name } = user

        return res.json({
            token: jwt.sign({ id }, AuthConfig.secret, {
                expiresIn: AuthConfig.expiresIn
            }),
            user: {
                id,
                name,
                email
            }
        })
    }

}

export default new SessionController()