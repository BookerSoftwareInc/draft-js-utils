"use strict";

var _combineOrderedStyles7 = _interopRequireDefault(require("../combineOrderedStyles"));

var _expect = _interopRequireDefault(require("expect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _global = global,
    describe = _global.describe,
    it = _global.it;
describe('combineOrderedStyles', function () {
  it('should return defaults when customStyleMap is null', function () {
    var defaultStyleMap = {};
    var defaultStyleOrder = [];
    var defaults = [defaultStyleMap, defaultStyleOrder];
    var result = (0, _combineOrderedStyles7["default"])(null, defaults);
    (0, _expect["default"])(result).toBe(defaults);
    (0, _expect["default"])(result).toEqual([{}, []]);
  });
  it('should return copies of defaults when customStyleMap is empty', function () {
    var defaultStyleMap = {
      foo: {},
      bar: {}
    };
    var defaultStyleOrder = ['foo', 'bar'];
    var customStyleMap = {};

    var _combineOrderedStyles = (0, _combineOrderedStyles7["default"])(customStyleMap, [defaultStyleMap, defaultStyleOrder]),
        _combineOrderedStyles2 = _slicedToArray(_combineOrderedStyles, 2),
        styleMap = _combineOrderedStyles2[0],
        styleOrder = _combineOrderedStyles2[1];

    (0, _expect["default"])(styleMap).toEqual({
      foo: {},
      bar: {}
    });
    (0, _expect["default"])(styleMap).toNotBe(defaultStyleMap);
    (0, _expect["default"])(styleOrder).toEqual(['foo', 'bar']);
    (0, _expect["default"])(styleOrder).toNotBe(defaultStyleOrder);
  });
  it('should combine styles and preserve default order', function () {
    var defaultStyleMap = {
      foo: {},
      bar: {}
    };
    var defaultStyleOrder = ['foo', 'bar'];
    var customStyleMap = {
      baz: {}
    };

    var _combineOrderedStyles3 = (0, _combineOrderedStyles7["default"])(customStyleMap, [defaultStyleMap, defaultStyleOrder]),
        _combineOrderedStyles4 = _slicedToArray(_combineOrderedStyles3, 2),
        styleMap = _combineOrderedStyles4[0],
        styleOrder = _combineOrderedStyles4[1];

    (0, _expect["default"])(styleMap).toEqual({
      foo: {},
      bar: {},
      baz: {}
    });
    (0, _expect["default"])(styleMap).toNotBe(defaultStyleMap);
    (0, _expect["default"])(styleMap).toNotBe(customStyleMap);
    (0, _expect["default"])(styleOrder).toEqual(['foo', 'bar', 'baz']);
    (0, _expect["default"])(styleOrder).toNotBe(defaultStyleOrder);
  });
  it('should merge individual styles', function () {
    var defaultStyleMap = {
      BOLD: {
        element: 'strong'
      },
      ITALIC: {
        element: 'em'
      }
    };
    var defaultStyleOrder = ['BOLD', 'ITALIC'];
    var customStyleMap = {
      BOLD: {
        element: 'span',
        style: {
          fontWeight: 'bold'
        }
      },
      ITALIC: {
        style: {
          textDecoration: 'underline'
        }
      }
    };

    var _combineOrderedStyles5 = (0, _combineOrderedStyles7["default"])(customStyleMap, [defaultStyleMap, defaultStyleOrder]),
        _combineOrderedStyles6 = _slicedToArray(_combineOrderedStyles5, 2),
        styleMap = _combineOrderedStyles6[0],
        styleOrder = _combineOrderedStyles6[1];

    (0, _expect["default"])(styleMap).toEqual({
      BOLD: {
        element: 'span',
        style: {
          fontWeight: 'bold'
        }
      },
      ITALIC: {
        element: 'em',
        style: {
          textDecoration: 'underline'
        }
      }
    });
    (0, _expect["default"])(styleMap).toNotBe(defaultStyleMap);
    (0, _expect["default"])(styleMap).toNotBe(customStyleMap);
    (0, _expect["default"])(styleOrder).toEqual(['BOLD', 'ITALIC']);
    (0, _expect["default"])(styleOrder).toNotBe(defaultStyleOrder);
  });
});