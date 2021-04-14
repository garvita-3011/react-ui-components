function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function initRipple(button) {
  var effectName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ripple-effect';
  var size = Math.max(button.offsetHeight, button.offsetWidth) + 'px';
  var ripple = document.createElement('span');
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


function animateRipple(e, button, ripple, rippleTimeout) {
  var rippleDuration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 300;

  if (rippleTimeout) {
    ripple.classList.remove('active');
  }

  var x = e.pageX - button.offsetLeft - ripple.offsetWidth / 2;
  var y = e.pageY - button.offsetTop - ripple.offsetHeight / 2;
  ripple.style.left = "".concat(x, "px");
  ripple.style.top = "".concat(y, "px");
  ripple.classList.add('active');
  rippleTimeout = setTimeout(function () {
    ripple.classList.remove('active');
    rippleTimeout = null;
  }, rippleDuration);
  return rippleTimeout;
}

var Button = /*#__PURE__*/function (_Component) {
  _inherits(Button, _Component);

  var _super = _createSuper(Button);

  function Button(props) {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, props);

    _this.onClick = function (e) {
      _this.props.onClick(e);

      if (!_this.props.ripple) {
        return;
      }

      _this.rippleTimeout = animateRipple(e, ReactDOM.findDOMNode(_assertThisInitialized(_this)), _this.ripple, _this.rippleTimeout, _this.props.rippleDuration);
    };

    _this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(_assertThisInitialized(_this));
    _this.ripple = null;
    _this.rippleTimeout = null;
    return _this;
  }

  _createClass(Button, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.ripple) {
        this.ripple = initRipple(ReactDOM.findDOMNode(this));
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.rippleTimeout) {
        clearTimeout(this.rippleTimeout);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          iconBefore = _this$props.iconBefore,
          faIcon = _this$props.faIcon,
          materialIcon = _this$props.materialIcon,
          ripple = _this$props.ripple,
          className = _this$props.className,
          props = _objectWithoutProperties(_this$props, ["iconBefore", "faIcon", "materialIcon", "ripple", "className"]);

      var icon = null;

      if (faIcon) {
        icon = /*#__PURE__*/React.createElement("i", {
          className: "icon fa fa-".concat(faIcon)
        });
      } else if (materialIcon) {
        icon = /*#__PURE__*/React.createElement("i", {
          className: "icon material-icons"
        }, materialIcon);
      }

      var cn = classnames(className, {
        'icon-text-btn': icon,
        'ripple-btn': ripple
      });
      return /*#__PURE__*/React.createElement("button", _extends({}, props, {
        className: cn,
        onClick: this.onClick
      }), iconBefore && icon, this.props.children, !iconBefore && icon);
    }
  }]);

  return Button;
}(Component);

Button.defaultProps = {
  iconBefore: false,
  type: 'button',
  onClick: function onClick() {},
  ripple: false,
  rippleDuration: 300
};
process.env.NODE_ENV !== "production" ? Button.propTypes = {
  iconBefore: PropTypes.bool,
  faIcon: PropTypes.string,
  materialIcon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  ripple: PropTypes.bool,
  rippleDuration: PropTypes.number
} : void 0;
export default Button;