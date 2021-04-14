import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * Initializes a ripple effect for a button
 *
 * @param button a dom element to insert the ripple into as html
 * @param effectName the ripple effect's name. Defaults to 'ripple-effect'
 * @return the ripple DOM element
 */
function initRipple(button, effectName = 'ripple-effect') {
  const size = Math.max(button.offsetHeight, button.offsetWidth) + 'px';

  const ripple = document.createElement('span');
  ripple.classList.add(effectName);
  ripple.style.height = size;
  ripple.style.width = size;

  button.insertBefore(ripple, button.firstChild);

  return ripple;
}

/**
 * Animates the ripple effect by taking the click event, the button, and the ripple.
 *
 * @param e the click event
 * @param button the button that was clicked
 * @param ripple the ripple element
 * @param rippleTimeout the timeout used for the click event
 * @param rippleDuration? the duration of the ripple effect. Defaults to 300
 * @return the updated rippleTimeout
 */
function animateRipple(e, button, ripple, rippleTimeout, rippleDuration = 300) {
  if(rippleTimeout) {
    ripple.classList.remove('active');
  }

  const x = e.pageX - button.offsetLeft - ripple.offsetWidth / 2;
  const y = e.pageY - button.offsetTop - ripple.offsetHeight / 2;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  ripple.classList.add('active');
  rippleTimeout = setTimeout(() => {
    ripple.classList.remove('active');
    rippleTimeout = null;
  }, rippleDuration);

  return rippleTimeout;
}

class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.ripple = null;
    this.rippleTimeout = null;
  }

  onClick = (e) => {
    this.props.onClick(e);
    if(!this.props.ripple) {
      return;
    }

    this.rippleTimeout = animateRipple(e, ReactDOM.findDOMNode(this), this.ripple, this.rippleTimeout, this.props.rippleDuration);
  }

  componentDidMount() {
    if(this.props.ripple) {
      this.ripple = initRipple(ReactDOM.findDOMNode(this));
    }
  }

  componentWillUnmount() {
    if(this.rippleTimeout) {
      clearTimeout(this.rippleTimeout);
    }
  }

  render() {
    const { iconBefore, faIcon, materialIcon, ripple, className, ...props } = this.props;
    let icon = null;
    if(faIcon) {
      icon = <i className={`icon fa fa-${faIcon}`} />;
    } else if(materialIcon) {
      icon = <i className="icon material-icons">{materialIcon}</i>;
    }

    const cn = classnames(className, {
      'icon-text-btn': icon,
      'ripple-btn': ripple,
    });

    return (
      <button {...props} className={cn} onClick={this.onClick}>
        {iconBefore && icon}
        {this.props.children}
        {!iconBefore && icon}
      </button>
    );
  }
}

Button.defaultProps = {
  iconBefore: false,
  type: 'button',
  onClick: () => {},
  ripple: false,
  rippleDuration: 300,
}

Button.propTypes = {
  iconBefore: PropTypes.bool,
  faIcon: PropTypes.string,
  materialIcon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  ripple: PropTypes.bool,
  rippleDuration: PropTypes.number,
}

export default Button