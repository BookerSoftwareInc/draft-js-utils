"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stateToHTML;

var _combineOrderedStyles3 = _interopRequireDefault(require("./helpers/combineOrderedStyles"));

var _normalizeAttributes = _interopRequireDefault(require("./helpers/normalizeAttributes"));

var _styleToCSS = _interopRequireDefault(require("./helpers/styleToCSS"));

var _draftJsUtils = require("draft-js-utils");

var _DEFAULT_STYLE_MAP, _ENTITY_ATTR_MAP, _DATA_TO_ATTR;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BOLD = _draftJsUtils.INLINE_STYLE.BOLD,
    CODE = _draftJsUtils.INLINE_STYLE.CODE,
    ITALIC = _draftJsUtils.INLINE_STYLE.ITALIC,
    STRIKETHROUGH = _draftJsUtils.INLINE_STYLE.STRIKETHROUGH,
    UNDERLINE = _draftJsUtils.INLINE_STYLE.UNDERLINE;
var INDENT = '  ';
var BREAK = '<br>';
var DATA_ATTRIBUTE = /^data-([a-z0-9-]+)$/;
var DEFAULT_STYLE_MAP = (_DEFAULT_STYLE_MAP = {}, _defineProperty(_DEFAULT_STYLE_MAP, BOLD, {
  element: 'strong'
}), _defineProperty(_DEFAULT_STYLE_MAP, CODE, {
  element: 'code'
}), _defineProperty(_DEFAULT_STYLE_MAP, ITALIC, {
  element: 'em'
}), _defineProperty(_DEFAULT_STYLE_MAP, STRIKETHROUGH, {
  element: 'del'
}), _defineProperty(_DEFAULT_STYLE_MAP, UNDERLINE, {
  element: 'u'
}), _DEFAULT_STYLE_MAP); // Order: inner-most style to outer-most.
// Examle: <em><strong>foo</strong></em>

var DEFAULT_STYLE_ORDER = [BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE]; // Map entity data to element attributes.

var ENTITY_ATTR_MAP = (_ENTITY_ATTR_MAP = {}, _defineProperty(_ENTITY_ATTR_MAP, _draftJsUtils.ENTITY_TYPE.LINK, {
  url: 'href',
  href: 'href',
  rel: 'rel',
  target: 'target',
  title: 'title',
  className: 'class'
}), _defineProperty(_ENTITY_ATTR_MAP, _draftJsUtils.ENTITY_TYPE.IMAGE, {
  src: 'src',
  height: 'height',
  width: 'width',
  alt: 'alt',
  className: 'class'
}), _ENTITY_ATTR_MAP); // Map entity data to element attributes.

var DATA_TO_ATTR = (_DATA_TO_ATTR = {}, _defineProperty(_DATA_TO_ATTR, _draftJsUtils.ENTITY_TYPE.LINK, function (entityType, entity) {
  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  var data = entity.getData();
  var attrs = {};

  for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
    var dataKey = _Object$keys[_i];
    var dataValue = data[dataKey];

    if (attrMap.hasOwnProperty(dataKey)) {
      var attrKey = attrMap[dataKey];
      attrs[attrKey] = dataValue;
    } else if (DATA_ATTRIBUTE.test(dataKey)) {
      attrs[dataKey] = dataValue;
    }
  }

  return attrs;
}), _defineProperty(_DATA_TO_ATTR, _draftJsUtils.ENTITY_TYPE.IMAGE, function (entityType, entity) {
  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  var data = entity.getData();
  var attrs = {};

  for (var _i2 = 0, _Object$keys2 = Object.keys(data); _i2 < _Object$keys2.length; _i2++) {
    var dataKey = _Object$keys2[_i2];
    var dataValue = data[dataKey];

    if (attrMap.hasOwnProperty(dataKey)) {
      var attrKey = attrMap[dataKey];
      attrs[attrKey] = dataValue;
    } else if (DATA_ATTRIBUTE.test(dataKey)) {
      attrs[dataKey] = dataValue;
    }
  }

  return attrs;
}), _DATA_TO_ATTR); // The reason this returns an array is because a single block might get wrapped
// in two tags.

function getTags(blockType, defaultBlockTag) {
  switch (blockType) {
    case _draftJsUtils.BLOCK_TYPE.HEADER_ONE:
      return ['h1'];

    case _draftJsUtils.BLOCK_TYPE.HEADER_TWO:
      return ['h2'];

    case _draftJsUtils.BLOCK_TYPE.HEADER_THREE:
      return ['h3'];

    case _draftJsUtils.BLOCK_TYPE.HEADER_FOUR:
      return ['h4'];

    case _draftJsUtils.BLOCK_TYPE.HEADER_FIVE:
      return ['h5'];

    case _draftJsUtils.BLOCK_TYPE.HEADER_SIX:
      return ['h6'];

    case _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return ['li'];

    case _draftJsUtils.BLOCK_TYPE.BLOCKQUOTE:
      return ['blockquote'];

    case _draftJsUtils.BLOCK_TYPE.CODE:
      return ['pre', 'code'];

    case _draftJsUtils.BLOCK_TYPE.ATOMIC:
      return ['figure'];

    default:
      if (defaultBlockTag === null) {
        return [];
      }

      return [defaultBlockTag || 'p'];
  }
}

function getWrapperTag(blockType) {
  switch (blockType) {
    case _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM:
      return 'ul';

    case _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return 'ol';

    default:
      return null;
  }
}

var MarkupGenerator = /*#__PURE__*/function () {
  // These are related to state.
  // These are related to user-defined options.
  function MarkupGenerator(contentState, options) {
    _classCallCheck(this, MarkupGenerator);

    _defineProperty(this, "blocks", void 0);

    _defineProperty(this, "contentState", void 0);

    _defineProperty(this, "currentBlock", void 0);

    _defineProperty(this, "indentLevel", void 0);

    _defineProperty(this, "output", void 0);

    _defineProperty(this, "totalBlocks", void 0);

    _defineProperty(this, "wrapperTag", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "inlineStyles", void 0);

    _defineProperty(this, "inlineStyleFn", void 0);

    _defineProperty(this, "styleOrder", void 0);

    _defineProperty(this, "blockTags", void 0);

    _defineProperty(this, "blockWrapperTag", void 0);

    if (options == null) {
      options = {};
    }

    this.contentState = contentState;
    this.options = options;

    var _combineOrderedStyles = (0, _combineOrderedStyles3["default"])(options.inlineStyles, [DEFAULT_STYLE_MAP, DEFAULT_STYLE_ORDER]),
        _combineOrderedStyles2 = _slicedToArray(_combineOrderedStyles, 2),
        inlineStyles = _combineOrderedStyles2[0],
        styleOrder = _combineOrderedStyles2[1];

    this.inlineStyles = inlineStyles;
    this.inlineStyleFn = options.inlineStyleFn;
    this.styleOrder = styleOrder;
    this.blockTags = options.blockTags || getTags;
    this.blockWrapperTag = options.blockWrapperTag || getWrapperTag;
    this.styleOrder = styleOrder;
  }

  _createClass(MarkupGenerator, [{
    key: "generate",
    value: function generate() {
      this.output = [];
      this.blocks = this.contentState.getBlocksAsArray();
      this.totalBlocks = this.blocks.length;
      this.currentBlock = 0;
      this.indentLevel = 0;
      this.wrapperTag = null;

      while (this.currentBlock < this.totalBlocks) {
        this.processBlock();
      }

      this.closeWrapperTag();
      return this.output.join('').trim();
    }
  }, {
    key: "processBlock",
    value: function processBlock() {
      var _this$options = this.options,
          blockRenderers = _this$options.blockRenderers,
          defaultBlockTag = _this$options.defaultBlockTag;
      var block = this.blocks[this.currentBlock];
      var blockType = block.getType();
      var newWrapperTag = this.blockWrapperTag(blockType);

      if (this.wrapperTag !== newWrapperTag) {
        if (this.wrapperTag) {
          this.closeWrapperTag();
        }

        if (newWrapperTag) {
          this.openWrapperTag(newWrapperTag);
        }
      }

      this.indent(); // Allow blocks to be rendered using a custom renderer.

      var customRenderer = blockRenderers != null && blockRenderers.hasOwnProperty(blockType) ? blockRenderers[blockType] : null;
      var customRendererOutput = customRenderer ? customRenderer(block) : null; // Renderer can return null, which will cause processing to continue as normal.

      if (customRendererOutput != null) {
        this.output.push(customRendererOutput);
        this.output.push('\n');
        this.currentBlock += 1;
        return;
      }

      this.writeStartTag(block, defaultBlockTag);
      this.output.push(this.renderBlockContent(block)); // Look ahead and see if we will nest list.

      var nextBlock = this.getNextBlock();

      if (canHaveDepth(blockType) && nextBlock && nextBlock.getDepth() === block.getDepth() + 1) {
        this.output.push('\n'); // This is a litle hacky: temporarily stash our current wrapperTag and
        // render child list(s).

        var thisWrapperTag = this.wrapperTag;
        this.wrapperTag = null;
        this.indentLevel += 1;
        this.currentBlock += 1;
        this.processBlocksAtDepth(nextBlock.getDepth());
        this.wrapperTag = thisWrapperTag;
        this.indentLevel -= 1;
        this.indent();
      } else {
        this.currentBlock += 1;
      }

      this.writeEndTag(block, defaultBlockTag);
    }
  }, {
    key: "processBlocksAtDepth",
    value: function processBlocksAtDepth(depth) {
      var block = this.blocks[this.currentBlock];

      while (block && block.getDepth() === depth) {
        this.processBlock();
        block = this.blocks[this.currentBlock];
      }

      this.closeWrapperTag();
    }
  }, {
    key: "getNextBlock",
    value: function getNextBlock() {
      return this.blocks[this.currentBlock + 1];
    }
  }, {
    key: "writeStartTag",
    value: function writeStartTag(block, defaultBlockTag) {
      var tags = getTags(block.getType(), defaultBlockTag);
      var attrString;

      if (this.options.blockStyleFn) {
        var _ref = this.options.blockStyleFn(block) || {},
            attributes = _ref.attributes,
            _style = _ref.style; // Normalize `className` -> `class`, etc.


        attributes = (0, _normalizeAttributes["default"])(attributes);

        if (_style != null) {
          var styleAttr = (0, _styleToCSS["default"])(_style);
          attributes = attributes == null ? {
            style: styleAttr
          } : _objectSpread(_objectSpread({}, attributes), {}, {
            style: styleAttr
          });
        }

        attrString = stringifyAttrs(attributes);
      } else {
        attrString = '';
      }

      var _iterator = _createForOfIteratorHelper(tags),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tag = _step.value;
          this.output.push("<".concat(tag).concat(attrString, ">"));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "writeEndTag",
    value: function writeEndTag(block, defaultBlockTag) {
      var tags = getTags(block.getType(), defaultBlockTag);

      if (tags.length === 1) {
        this.output.push("</".concat(tags[0], ">\n"));
      } else {
        var output = [];

        var _iterator2 = _createForOfIteratorHelper(tags),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var tag = _step2.value;
            output.unshift("</".concat(tag, ">"));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this.output.push(output.join('') + '\n');
      }
    }
  }, {
    key: "openWrapperTag",
    value: function openWrapperTag(wrapperTag) {
      this.wrapperTag = wrapperTag;
      this.indent();
      this.output.push("<".concat(wrapperTag, ">\n"));
      this.indentLevel += 1;
    }
  }, {
    key: "closeWrapperTag",
    value: function closeWrapperTag() {
      var wrapperTag = this.wrapperTag;

      if (wrapperTag) {
        this.indentLevel -= 1;
        this.indent();
        this.output.push("</".concat(wrapperTag, ">\n"));
        this.wrapperTag = null;
      }
    }
  }, {
    key: "indent",
    value: function indent() {
      this.output.push(INDENT.repeat(this.indentLevel));
    }
  }, {
    key: "withCustomInlineStyles",
    value: function withCustomInlineStyles(content, styleSet) {
      if (!this.inlineStyleFn) {
        return content;
      }

      var renderConfig = this.inlineStyleFn(styleSet);

      if (!renderConfig) {
        return content;
      }

      var _renderConfig$element = renderConfig.element,
          element = _renderConfig$element === void 0 ? 'span' : _renderConfig$element,
          attributes = renderConfig.attributes,
          style = renderConfig.style;
      var attrString = stringifyAttrs(_objectSpread(_objectSpread({}, attributes), {}, {
        style: style && (0, _styleToCSS["default"])(style)
      }));
      return "<".concat(element).concat(attrString, ">").concat(content, "</").concat(element, ">");
    }
  }, {
    key: "renderBlockContent",
    value: function renderBlockContent(block) {
      var _this = this;

      var blockType = block.getType();
      var text = block.getText();

      if (text === '') {
        // Prevent element collapse if completely empty.
        return BREAK;
      }

      text = this.preserveWhitespace(text);
      var charMetaList = block.getCharacterList();
      var entityPieces = (0, _draftJsUtils.getEntityRanges)(text, charMetaList);
      return entityPieces.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            entityKey = _ref3[0],
            stylePieces = _ref3[1];

        var content = stylePieces.map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              text = _ref5[0],
              styleSet = _ref5[1];

          var content = encodeContent(text);

          var _iterator3 = _createForOfIteratorHelper(_this.styleOrder),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _styleName = _step3.value;

              // If our block type is CODE then don't wrap inline code elements.
              if (_styleName === CODE && blockType === _draftJsUtils.BLOCK_TYPE.CODE) {
                continue;
              }

              if (styleSet.has(_styleName)) {
                var _this$inlineStyles$_s = _this.inlineStyles[_styleName],
                    element = _this$inlineStyles$_s.element,
                    attributes = _this$inlineStyles$_s.attributes,
                    _style2 = _this$inlineStyles$_s.style;

                if (element == null) {
                  element = 'span';
                } // Normalize `className` -> `class`, etc.


                attributes = (0, _normalizeAttributes["default"])(attributes);

                if (_style2 != null) {
                  var styleAttr = (0, _styleToCSS["default"])(_style2);
                  attributes = attributes == null ? {
                    style: styleAttr
                  } : _objectSpread(_objectSpread({}, attributes), {}, {
                    style: styleAttr
                  });
                }

                var attrString = stringifyAttrs(attributes);
                content = "<".concat(element).concat(attrString, ">").concat(content, "</").concat(element, ">");
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          return _this.withCustomInlineStyles(content, styleSet);
        }).join('');
        var entity = entityKey ? _this.contentState.getEntity(entityKey) : null; // Note: The `toUpperCase` below is for compatability with some libraries that use lower-case for image blocks.

        var entityType = entity == null ? null : entity.getType().toUpperCase();
        var entityStyle;

        if (entity != null && _this.options.entityStyleFn && (entityStyle = _this.options.entityStyleFn(entity))) {
          var _entityStyle = entityStyle,
              element = _entityStyle.element,
              attributes = _entityStyle.attributes,
              _style3 = _entityStyle.style;

          if (element == null) {
            element = 'span';
          } // Normalize `className` -> `class`, etc.


          attributes = (0, _normalizeAttributes["default"])(attributes);

          if (_style3 != null) {
            var styleAttr = (0, _styleToCSS["default"])(_style3);
            attributes = attributes == null ? {
              style: styleAttr
            } : _objectSpread(_objectSpread({}, attributes), {}, {
              style: styleAttr
            });
          }

          var attrString = stringifyAttrs(attributes);
          return "<".concat(element).concat(attrString, ">").concat(content, "</").concat(element, ">");
        } else if (entityType != null && entityType === _draftJsUtils.ENTITY_TYPE.LINK) {
          var attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;

          var _attrString = stringifyAttrs(attrs);

          return "<a".concat(_attrString, ">").concat(content, "</a>");
        } else if (entityType != null && entityType === _draftJsUtils.ENTITY_TYPE.IMAGE) {
          var _attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;

          var _attrString2 = stringifyAttrs(_attrs);

          return "<img".concat(_attrString2, "/>");
        } else {
          return content;
        }
      }).join('');
    }
  }, {
    key: "preserveWhitespace",
    value: function preserveWhitespace(text) {
      var length = text.length; // Prevent leading/trailing/consecutive whitespace collapse.

      var newText = new Array(length);

      for (var i = 0; i < length; i++) {
        if (text[i] === ' ' && (i === 0 || i === length - 1 || text[i - 1] === ' ')) {
          newText[i] = '\xA0';
        } else {
          newText[i] = text[i];
        }
      }

      return newText.join('');
    }
  }]);

  return MarkupGenerator;
}();

function stringifyAttrs(attrs) {
  if (attrs == null) {
    return '';
  }

  var parts = [];

  for (var _i3 = 0, _Object$keys3 = Object.keys(attrs); _i3 < _Object$keys3.length; _i3++) {
    var name = _Object$keys3[_i3];
    var value = attrs[name];

    if (value != null) {
      parts.push(" ".concat(name, "=\"").concat(encodeAttr(value + ''), "\""));
    }
  }

  return parts.join('');
}

function canHaveDepth(blockType) {
  switch (blockType) {
    case _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM:
      return true;

    default:
      return false;
  }
}

function encodeContent(text) {
  return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('\xA0').join('&nbsp;').split('\n').join(BREAK + '\n');
}

function encodeAttr(text) {
  return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
}

function stateToHTML(content, options) {
  return new MarkupGenerator(content, options).generate();
}