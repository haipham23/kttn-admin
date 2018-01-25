import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';


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
      chapter: +chapter
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
    this.onSaveNext = this.onSaveNext.bind(this);
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

  onSaveNext() {
    this.props.onSaveNext(revert(this.state));
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
        <div className="form-group">
          <label>Correct answer:</label>
          <select name="result" onChange={this.onChangeHandler} value={this.state.result}>
            <option value="0" key="result-0">Please select</option>
            {
              this.state.answers.map((answer, idx) => (
                <option key={`result-${idx}`} value={idx + 1}>{idx + 1}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <label>Chapter:</label>
          <input
            value={this.state.chapter}
            name="chapter"
            type="number"
            className="form-control"
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.onSave}>Save</button>
        </div>
        {
          !this.props.isEdit &&
          (
            <div className="form-group">
              <button
                className="btn btn-secondary"
                onClick={this.onSaveNext}
              >
                Save and Add more
              </button>
            </div>
          )
        }
        {
          this.props.isEdit &&
          (
            <div className="form-group">
              <button
                className="btn btn-secondary"
                onClick={() => this.props.onDelete(this.state._id)}
              >
                Delete
              </button>
            </div>
          )
        }
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
    chapter: PropTypes.number
  }),
  onSave: PropTypes.func.isRequired,
  onSaveNext: PropTypes.func,
  onDelete: PropTypes.func,

  isEdit: PropTypes.bool
};

export default QuestionEditor;
