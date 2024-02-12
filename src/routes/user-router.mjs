import express from 'express';
import {
  getUserById,
  getUsers,
  postUser,
  postLogin,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';

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
    .put(putUser)
    // delete user based on id
    .delete(deleteUser);


// user login
userRouter.post('/login', postLogin);


export default userRouter;
