const router = require('express').Router();

const PageController = require('../controllers/page.controller');
const QuestionController = require('../controllers/question.controller');

/* GET home page. */
router.get('/', PageController.index);
router.get('/new-question', PageController.newQuestion);
router.get('/edit-question/:_id', PageController.editQuestion);

// API
router.post('/api/question', QuestionController.create);
router.put('/api/question', QuestionController.update);
router.delete('/api/question/:_id', QuestionController.remove);

module.exports = router;
