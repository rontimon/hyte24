import express from 'express';
import {getUserById, getUsers, postUser, postLogin, putUser} from '../controllers/user-controller.mjs';

const userRouter = express.Router();




// userRouter.get('/', getUsers);
// tai
userRouter.route('/')
    // list users
    .get(getUsers)
    // user registration
    .post(postUser);

// /user/:id endpoint
userRouter.route('/:id')
    // get info of a user
    .get(getUserById)
    // updateuser
    .put(putUser);

// user registration
// userRouter.post('/', postUser);
// user login
userRouter.post('/login', postLogin);
// update user
// userRouter.put('/:id', putUser);

export default userRouter;
