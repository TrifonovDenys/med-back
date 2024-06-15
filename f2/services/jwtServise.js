import jwt from 'jsonwebtoken'

export const signToken = (id) => {
  jwt.sign({ id }, 'asdasdasdasd')
}