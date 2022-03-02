const express = require('express')
const { validateComment, isLoggedIn, isCommentAuthor } = require('../middleware')
const commentsController = require('../controllers/commentsController')

const router = express.Router({ mergeParams: true })

router.post('/', isLoggedIn, validateComment, commentsController.createComment)

router.delete('/:commentId', isLoggedIn, isCommentAuthor, commentsController.deleteComment)

module.exports = router