import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../../services/userServices.js';
import catchAsync from '../../utils/catchAsync.js';

const userController = {
    getUsers: catchAsync(async (_, res) => {
        const users = await getAllUsers();
        res.status(200).json({
            msg: 'Succsess',
            users,
        });
    }),
    createUser: catchAsync(async (req, res) => {
        const newUser = await createUser(req.body);
        newUser.password = undefined;
        res.status(201).json({
            msg: 'Succsess',
            user: newUser,
        });
    }),
    getUser: catchAsync(async (req, res) => {
        const { id } = req.params;
        const user = await getOneUser(id);
        res.status(200).json({
            msg: 'Succses',
            user,
        });
    }),
    updateUser: catchAsync(async (req, res) => {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json({
            msg: 'Succsess',
            user: updatedUser,
        });
    }),
    deleteUser: catchAsync(async (req, res) => {
        await deleteUser(req.params.id);
        res.status(204);
    }),
    getMe: (req, res) => {
        res.status(200).json({
            msg: 'Succsess',
            user: req.user,
        });
    },
    updateUserAvatar: catchAsync(async (req, res) => {}),
};

export default userController;
