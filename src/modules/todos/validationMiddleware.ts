import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    next()
  }
}

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    next()
  }
}
