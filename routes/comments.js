const express = require('express')
const { isLoggedIn, isCommentAuthor } = require('../middlewares/authorizationMiddleware')
const { validateComment } = require('../middlewares/schemaMiddleware')
const commentsController = require('../controllers/commentsController')

const router = express.Router({ mergeParams: true })

router.post('/', isLoggedIn, validateComment, commentsController.createComment)

router.delete('/:commentId', isLoggedIn, isCommentAuthor, commentsController.deleteComment)

module.exports = router