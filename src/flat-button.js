import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import Button from './button';

class FlatButton extends Component {
  constructor(props) {
    super(props);
    console.log('Flat button bundled')
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static garvita = {
    foo: 123
  }

  render() {
    const { className, color, active, ...props } = this.props;
    const fullClassName = classnames(className, 'flat-btn', `flat-btn-${color}`, {
      'active': active,
    });


    return <Button {...props} className={fullClassName} />;
  }
}

FlatButton.propTypes = {
  color: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
}

FlatButton.defaultProps = {
  color: 'default',
  active: false,
}

export default FlatButton