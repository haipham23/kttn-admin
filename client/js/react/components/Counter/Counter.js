import React from 'react';
// import PropTypes from 'prop-types';

class Counter extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0
    };

    this.add = this.add.bind(this);
  }

  add() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={this.add}
        >
          Add
        </button>
        <span style={{ marginLeft: '30px', fontSize: '1.5em', verticalAlign: 'middle' }}>
          {this.state.count}
        </span>
      </div>
    );
  }
}

Counter.propTypes = {
  //
};

export default Counter;
