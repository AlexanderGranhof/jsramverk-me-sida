import { Response, NextFunction, Request } from 'express'
import * as User from '../../services/user'
import { CreatedUserModel } from '../../models/user'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const user: CreatedUserModel | undefined = req?.session?.user

    if (!user) {
        return res.sendStatus(403)
    }

    User.validate(user)
        .then(() => next())
        .catch(() => res.sendStatus(401))
}
