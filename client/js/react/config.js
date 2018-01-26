import QuestionsTable from './components/QuestionsTable/QuestionsTable';
import NewQuestion from './components/NewQuestion/NewQuestion';
import EditQuestion from './components/EditQuestion/EditQuestion';

import ChapterTable from './components/ChapterTable/ChapterTable';
import NewChapter from './components/NewChapter/NewChapter';
import EditChapter from './components/EditChapter/EditChapter';


const reactElements = [{
  dom: 'questions-table',
  data: 'all-questions',
  element: QuestionsTable
}, {
  dom: 'new-question-form',
  data2: 'chapters',
  element: NewQuestion
}, {
  dom: 'edit-question-form',
  data: 'a-question',
  data2: 'chapters',
  element: EditQuestion
}, {
  dom: 'chapter-table',
  data: 'all-chapters',
  element: ChapterTable
}, {
  dom: 'new-chapter-form',
  element: NewChapter
}, {
  dom: 'edit-chapter-form',
  data: 'a-chapter',
  element: EditChapter
}];


export default reactElements;
