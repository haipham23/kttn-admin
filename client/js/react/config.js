import QuestionsTable from './components/QuestionsTable/QuestionsTable';
import NewQuestion from './components/NewQuestion/NewQuestion';
import EditQuestion from './components/EditQuestion/EditQuestion';


const reactElements = [{
  dom: 'questions-table',
  data: 'all-questions',
  element: QuestionsTable
}, {
  dom: 'new-question-form',
  element: NewQuestion
}, {
  dom: 'edit-question-form',
  data: 'a-question',
  element: EditQuestion
}];


export default reactElements;
