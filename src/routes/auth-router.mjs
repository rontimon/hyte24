import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine admin Admin users only.
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": 401,
 *      "message": "invalid username or password"
 *    }
 */

authRouter
  /**
   * @api {post} /login Login
   * @apiVersion 1.0.0
   * @apiName PostLogin
   * @apiGroup Authentication
   * @apiPermission all
   *
   * @apiDescription Sign in and get an authentication token for the user.
   *
   * @apiParam {String} username Username of the user.
   * @apiParam {String} password Password of the user.
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "username": "johnd",
   *      "password": "examplepass"
   *    }
   *
   * @apiSuccess {String} token Token for the user authentication.
   * @apiSuccess {Object} user User info.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "Logged in successfully",
   *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwid
   *                XNlcm5hbWUiOiJ1dXNpMSIsImVtYWlsIjoidXVzaTFAZXhhbXBsZS5jb20
   *                iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXS
   *                dryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y"
   *      "user": {
   *        "user_id": 21,
   *        "username": "johnd",
   *        "email": "johnd@example.com",
   *        "user_level": "regular"
   *      }
   *    }
   *
   * @apiUse UnauthorizedError
   */
  .post(
    '/login',
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),
    validationErrorHandler,
    postLogin,
  )
  // get user info
  .get('/me', authenticateToken, getMe);

export default authRouter;
