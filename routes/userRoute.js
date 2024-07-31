const express = require('express')
const authController = require ("../controllers/authController")
const authMiddleware = require ("../middlewares/authMiddleware")
const { body } = require('express-validator');

const router = express.Router()

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage("Please enter Your Name")
    ],
    authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage)


module.exports = router