import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import TextField from '../TextField/TextField';


const convert = data => Object.assign({}, data);

const revert = state => ({ chapter: state });

class ChapterEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = convert(this.props.chapter);

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
    window.location.href = '/chapters';
  }

  render() {
    return (
      <div>
        <TextField
          label="Title"
          name="title"
          value={this.state.title}
          onChange={this.onChangeHandler}
        />
        <TextField
          label="Quote"
          name="quote"
          value={this.state.quote}
          onChange={this.onChangeHandler}
        />
        <TextField
          label="Prayer"
          name="prayer"
          value={this.state.prayer}
          onChange={this.onChangeHandler}
        />
        <div className="row">
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

ChapterEditor.propTypes = {
  chapter: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    quote: PropTypes.string,
    prayer: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired
};

export default ChapterEditor;
