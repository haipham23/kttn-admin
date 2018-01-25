import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';

import QuestionsTable from './components/QuestionsTable/QuestionsTable';
import NewQuestion from './components/NewQuestion/NewQuestion';
import EditQuestion from './components/EditQuestion/EditQuestion';

const parse = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

domready(() => {
  const reactQuestionTable = document.getElementById('react-questions-table');
  const reactNewQuestion = document.getElementById('react-new-question-form');
  const reactEditQuestion = document.getElementById('react-edit-question-form');

  const allQuestions = document.getElementById('all-questions');
  const aQuestion = document.getElementById('a-question');

  if (reactQuestionTable) {
    ReactDOM.render(
      <QuestionsTable data={parse(allQuestions.innerText)} />,
      document.getElementById('react-questions-table')
    );
  }

  if (reactNewQuestion) {
    ReactDOM.render(
      <NewQuestion />,
      document.getElementById('react-new-question-form')
    );
  }

  if (reactEditQuestion) {
    ReactDOM.render(
      <EditQuestion question={parse(aQuestion.innerText)} />,
      document.getElementById('react-edit-question-form')
    );
  }
});
