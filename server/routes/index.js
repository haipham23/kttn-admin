const router = require('express').Router();

const PageController = require('../controllers/page.controller');
const QuestionController = require('../controllers/question.controller');
const ChapterController = require('../controllers/chapter.controller');


router.get('/', PageController.home);
router.get('/questions', PageController.toHome);

/* questions */
router.get('/questions/:chapterId', PageController.allQuestions);
router.get('/new-question', PageController.newQuestion);
router.get('/edit-question/:_id', PageController.editQuestion);

/* chapter */
router.get('/chapters', PageController.allChapters);
router.get('/new-chapter', PageController.newChapter);
router.get('/edit-chapter/:_id', PageController.editChapter);

// API
router.post('/api/question', QuestionController.create);
router.put('/api/question', QuestionController.update);
router.delete('/api/question/:_id', QuestionController.remove);

router.post('/api/chapter', ChapterController.create);
router.put('/api/chapter', ChapterController.update);
router.delete('/api/chapter/:_id', ChapterController.remove);

module.exports = router;
