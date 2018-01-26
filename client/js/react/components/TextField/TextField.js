import React from 'react';
import PropTypes from 'prop-types';

class TextField extends React.Component {
  render() {
    const {
      label,
      name,
      type,
      value,
      onChange
    } = this.props;

    return (
      <div className="form-group">
        <label>
          {label}
        </label>
        <input
          value={value}
          name={name}
          type={type}
          className="form-control"
          onChange={onChange}
        />
      </div>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,

  onChange: PropTypes.func
};

TextField.defaultProps = {
  type: 'text'
};

export default TextField;
