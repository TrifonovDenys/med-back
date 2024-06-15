import catchAsync from '../utils/catchAsync.js';

export const signup = catchAsync(async (req, res) => {
  const { user, token } = await singupUser(req.body)
  
  res.status(201).json({
    msg: 'Success',
    user,
    token
  })
})
  