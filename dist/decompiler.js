'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatted = exports.decompile = exports.options = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _jsBeautify = require('js-beautify');

var _stringifyObject = require('./stringify-object');

var _stringifyObject2 = _interopRequireDefault(_stringifyObject);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getProps = function getProps(component) {
  return (0, _objectAssign2.default)((0, _objectAssign2.default)(getAttribute('key', component), getAttribute('ref', component)), component.props);
};

var getAttribute = function getAttribute(attribute, component) {
  return component[attribute] ? _defineProperty({}, attribute, component[attribute]) : {};
};

var getChildren = function getChildren(component) {
  return getProps(component).children;
};

var getPropsKeys = function getPropsKeys(component) {
  return Object.keys(getProps(component)).filter(function (prop) {
    return prop !== 'children';
  });
};

var getComponentName = function getComponentName(component) {
  return component.type.displayName || component.type.name;
};

var getComponentType = function getComponentType(component) {
  return getComponentName(component) || component.type;
};

var getPropValue = function getPropValue(component, prop) {
  return getProps(component)[prop];
};

var getFormatedPropValue = function getFormatedPropValue(propValue) {
  return typeof propValue === 'string' ? '"' + stringifyItem(propValue) + '"' : '{' + stringifyItem(propValue) + '}';
};

var getComponentProp = function getComponentProp(component, prop) {
    var value = getPropValue(component, prop);
    if(options.filter && options.filter(value, prop)){
        return getFormatedPropValue(value);
    } else {
        return '"***filterd***"';
    }
};

var appendStringifiedProp = function appendStringifiedProp(component) {
  return function (accumulated, prop) {
    return accumulated + ' ' + prop + '=' + getComponentProp(component, prop);
  };
};

var stringifyProps = function stringifyProps(component) {
  return getPropsKeys(component).reduce(appendStringifiedProp(component), '');
};

var stringifyComposedComponent = function stringifyComposedComponent(component) {
  return '<' + getComponentType(component) + stringifyProps(component) + '>' + stringifyItems(getChildren(component)) + '</' + getComponentType(component) + '>';
};

var stringifySimpleComponent = function stringifySimpleComponent(component) {
  return '<' + getComponentType(component) + stringifyProps(component) + ' />';
};

var stringifyComponent = function stringifyComponent(component) {
  return getChildren(component) ? stringifyComposedComponent(component) : stringifySimpleComponent(component);
};

var stringifyFunction = function stringifyFunction(value) {
  return value.toString().replace(/ {[\s\S]*/, '{ ... }');
};

var options = exports.options = { indent: ' ' };

var stringifyValue = function stringifyValue(value) {
  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'function':
      return stringifyFunction(value);
    case 'object':
      return (0, _stringifyObject2.default)(value, options).replace(/\n|  /g, '');
    case 'undefined':
      return 'undefined';
    default:
      return value.toString();
  }
};

var stringifyItem = function stringifyItem(item) {
  return (0, _reactAddonsTestUtils.isElement)(item) ? stringifyComponent(item) : stringifyValue(item);
};

var stringifyItems = function stringifyItems(components) {
  return [].concat(components).map(stringifyItem).join('');
};

var decompile = exports.decompile = stringifyItems;

var formatted = exports.formatted = function formatted(items) {
  return (0, _jsBeautify.html)(stringifyItems(items), { indent_size: 2 });
};
