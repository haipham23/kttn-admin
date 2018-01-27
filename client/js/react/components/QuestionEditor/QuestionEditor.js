import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { ToastContainer } from 'react-toastify';


const convert = data => Object.assign({}, data, { answers: List(data.answers) });

const revert = (state) => {
  const {
    _id,
    content,
    answers,
    result,
    chapter
  } = state;

  return {
    question: {
      _id,
      content,
      answers: answers.toArray(),
      result: +result,
      chapter
    }
  };
};

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = convert(this.props.question);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onAddAnswer = this.onAddAnswer.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeHandler({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  onAddAnswer() {
    this.setState({
      answers: this.state.answers.concat([''])
    });
  }

  onUpdateAnswer(e, idx) {
    this.setState({
      answers: this.state.answers.update(idx, () => e.target.value)
    });
  }

  onSave() {
    this.props.onSave(revert(this.state));
  }

  onBack() {
    window.history.go(-1);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Question:</label>
          <input
            value={this.state.content}
            name="content"
            type="textarea"
            className="form-control"
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.onAddAnswer}>Add answer</button>
        </div>
        {
          this.state.answers.map((answer, idx) => (
            <div key={`answer-${idx}`} className="form-group">
              <input
                value={answer}
                type="text"
                className="form-control"
                onChange={e => this.onUpdateAnswer(e, idx)}
              />
            </div>
          ))
        }
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label>Correct answer:</label>
              <select
                className="form-control"
                name="result"
                onChange={this.onChangeHandler}
                value={this.state.result}
              >
                <option value="0" key="result-0">Please select</option>
                {
                  this.state.answers.map((answer, idx) => (
                    <option key={`result-${idx}`} value={idx + 1}>{idx + 1}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="col-md-9">
            <div className="form-group">
              <label>Chapter:</label>
              <select
                className="form-control"
                name="chapter"
                onChange={this.onChangeHandler}
                value={this.state.chapter}
              >
                <option value="0" key="chapter-0">Please select</option>
                {
                  this.props.chapters.map((chapter, idx) => (
                    <option key={`chapter-${idx}`} value={chapter._id}>{chapter.title}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div className="row mt-40">
          <div className="col-12" style={{ display: 'flex' }}>
            <button
              className="btn btn-secondary"
              onClick={this.onBack}
              style={{ marginRight: 'auto' }}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={this.onSave}
            >
              Save
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

QuestionEditor.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    result: PropTypes.number,
    chapter: PropTypes.string
  }),
  chapters: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  })),
  onSave: PropTypes.func.isRequired
};

export default QuestionEditor;
