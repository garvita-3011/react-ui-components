function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import Button from './button';
var TAB = 9;
var SPACEBAR = 32;
var ENTER = 13;

var IconButton = /*#__PURE__*/function (_Component) {
  _inherits(IconButton, _Component);

  var _super = _createSuper(IconButton);

  function IconButton(props) {
    var _this;

    _classCallCheck(this, IconButton);

    _this = _super.call(this, props);

    _this.handleClick = function (e) {
      _this.props.onClick(e);

      _this.setHelpTextVisible(false);
    };

    _this.handleKeyUp = function (e) {
      var key = e.which || e.keyCode;

      if (key === TAB) {
        _this.setHelpTextVisible(true);

        _this.setState({
          isTabFocused: true
        });
      } else if (key === SPACEBAR || key === ENTER) {
        _this.setHelpTextVisible(false);
      }
    };

    _this.removeTabFocus = function () {
      _this.setHelpTextVisible(false);

      _this.setState({
        isTabFocused: false
      });
    };

    _this.handleMouseOver = function () {
      _this.setHelpTextVisible(true);
    };

    _this.handleMouseLeave = function () {
      _this.setHelpTextVisible(false);
    };

    _this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(_assertThisInitialized(_this));
    _this.state = {
      isTabFocused: false,
      isHelpTextVisible: false
    };
    _this.helpTextTimer = null;
    return _this;
  }

  _createClass(IconButton, [{
    key: "setHelpTextVisible",
    value: function setHelpTextVisible(visible) {
      var _this2 = this;

      if (visible) {
        if (this.helpTextTimer) {
          return;
        }

        this.helpTextTimer = setTimeout(function () {
          _this2.setState({
            isHelpTextVisible: true
          });
        }, this.props.helpTextTime);
      } else {
        if (this.helpTextTimer) {
          clearTimeout(this.helpTextTimer);
          this.helpTextTimer = null;
        }

        this.setState({
          isHelpTextVisible: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          isTabFocused = _this$state.isTabFocused,
          isHelpTextVisible = _this$state.isHelpTextVisible;
      var buttonProps = {
        className: classnames('icon-btn', this.props.className, {
          'tab-focus': isTabFocused
        }),
        onClick: this.handleClick,
        'aria-label': this.props.label,
        onKeyUp: this.handleKeyUp,
        onBlur: this.removeTabFocus,
        onMouseOver: this.handleMouseOver,
        onMouseLeave: this.handleMouseLeave,
        faIcon: this.props.faIcon,
        materialIcon: this.props.materialIcon,
        ripple: this.props.ripple
      };
      return /*#__PURE__*/React.createElement(Button, buttonProps, this.props.children, isHelpTextVisible && /*#__PURE__*/React.createElement("div", {
        key: "help-text",
        className: "help-text-".concat(this.props.helpPosition)
      }, this.props.label));
    }
  }]);

  return IconButton;
}(Component); // IconButton.defaultProps = {
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


export default IconButton;