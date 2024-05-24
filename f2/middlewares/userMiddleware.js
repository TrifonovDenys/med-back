import { Types } from 'mongoose';

import HttpError from '../helpers/HttpError';
import User from '../models/userModel';
import { checkUserExistById } from '../services/userServices';
import catchAsync from '../utils/catchAsync';

export const checkUserId = catchAsync(async (req, res, next) => {
    await checkUserExistById(req.params.id);
    next();
});
