"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = styleToCssString;

var _hyphenateStyleName = _interopRequireDefault(require("fbjs/lib/hyphenateStyleName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * styleToCssString converts a react js style object to a css string value.
 */
var isArray = Array.isArray;
var keys = Object.keys;
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}; // Follows syntax at https://developer.mozilla.org/en-US/docs/Web/CSS/content,
// including multiple space separated values.

var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

function buildRule(key, value) {
  if (!isUnitlessNumber[key] && typeof value === 'number') {
    value = '' + value + 'px';
  } else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
    value = "'" + value.replace(/'/g, "\\'") + "'";
  }

  return (0, _hyphenateStyleName["default"])(key) + ': ' + value + ';  ';
}

function styleToCssString(rules) {
  var result = '';
  var rulesKeys = keys(rules);

  if (!rules || rulesKeys.length === 0) {
    return result;
  }

  var styleKeys = rulesKeys;

  for (var j = 0, l = styleKeys.length; j < l; j++) {
    var styleKey = styleKeys[j];
    var value = rules[styleKey];

    if (isArray(value)) {
      for (var i = 0, len = value.length; i < len; i++) {
        result += buildRule(styleKey, value[i]);
      }
    } else {
      result += buildRule(styleKey, value);
    }
  }

  return result.trim();
}

function toKebab(str) {
  str = str.replace(/([A-Z])/g, '-$1').toLowerCase();
  return str;
}

function objToCss(style) {
  var result = [];
  Object.keys(style).map(function (key) {
    return toKebab(key) + ': ' + style[key] + ';';
  });
  return styles.join(' ');
}