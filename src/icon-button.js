import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import Button from './button';


const TAB = 9;
const SPACEBAR = 32;
const ENTER = 13;

class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isTabFocused: false,
      isHelpTextVisible: false,
    };

    this.helpTextTimer = null;
  }

  handleClick = (e) => {
    this.props.onClick(e);
    this.setHelpTextVisible(false);
  }

  handleKeyUp = (e) => {
    const key = e.which || e.keyCode;
    if(key === TAB) {
      this.setHelpTextVisible(true);
      this.setState({ isTabFocused: true });
    } else if(key === SPACEBAR || key === ENTER) {
      this.setHelpTextVisible(false);
    }
  }

  removeTabFocus = () => {
    this.setHelpTextVisible(false);
    this.setState({ isTabFocused: false });
  }

  handleMouseOver = () => {
    this.setHelpTextVisible(true);
  }

  handleMouseLeave = () => {
    this.setHelpTextVisible(false);
  }

  setHelpTextVisible(visible) {
    if(visible) {
      if(this.helpTextTimer) { return; }

      this.helpTextTimer = setTimeout(() => {
        this.setState({ isHelpTextVisible: true });
      }, this.props.helpTextTime);
    } else {
      if(this.helpTextTimer) {
        clearTimeout(this.helpTextTimer);
        this.helpTextTimer = null;
      }

      this.setState({ isHelpTextVisible: false });
    }
  }

  render() {
    const { isTabFocused, isHelpTextVisible } = this.state;
    const buttonProps = {
      className: classnames('icon-btn', this.props.className, {
        'tab-focus': isTabFocused,
      }),
      onClick: this.handleClick,
      'aria-label': this.props.label,
      onKeyUp: this.handleKeyUp,
      onBlur: this.removeTabFocus,
      onMouseOver: this.handleMouseOver,
      onMouseLeave: this.handleMouseLeave,
      faIcon: this.props.faIcon,
      materialIcon: this.props.materialIcon,
      ripple: this.props.ripple,
    };

    return (
      <Button {...buttonProps}>
        {this.props.children}
        {isHelpTextVisible &&
          <div key="help-text" className={`help-text-${this.props.helpPosition}`}>
            {this.props.label}
          </div>
        }
      </Button>
    );
  }
}

// IconButton.defaultProps = {
//     helpPosition: 'bottom',
//     type: 'button',
//     helpTextTime: 1000,
//     onClick: () => {},
//     ripple: false,
// }

// IconButton.propTypes = {
//   label: PropTypes.string.isRequired,
//     helpPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
//     faIcon: PropTypes.string,
//     materialIcon: PropTypes.string,
//     type: PropTypes.oneOf(['button', 'reset', 'submit']),
//     helpTextTime: PropTypes.number,
//     onClick: PropTypes.func,
//     className: PropTypes.string,
//     ripple: PropTypes.bool,
//     children: PropTypes.node,
// }

export default IconButton