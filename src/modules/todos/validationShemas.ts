import Joi from 'joi'

export const createTodoSchema = Joi.object({
  title: Joi.string().min(1).max(50).required().messages({
    'string.base': 'Title must be a STRING!!!',
    'string.empty': 'Title cannot be EMPTY!!!',
    'string.min': 'Title must contain at least 1 character!!!',
    'string.max': 'Title cannot exceed 50 characters!!!',
    'any.required': 'Title is REQUIRED!!!',
  }),
})

export const getTodoByIdSchema = Joi.object({
  itemId: Joi.number().integer().positive().required().messages({
    'number.base': 'Item ID must be a NUMBER!!!',
    'number.integer': 'Item ID must be an INTEGER!!!',
    'number.positive': 'Item ID must be a POSITIVE NUMBER!!!',
  }),
})
