'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('antd/es/button/style');
var _Button = _interopDefault(require('antd/es/button'));
require('antd/es/table/style');
var _Table = _interopDefault(require('antd/es/table'));
require('antd/es/input/style');
var _Input = _interopDefault(require('antd/es/input'));
require('antd/es/tag/style');
var _Tag = _interopDefault(require('antd/es/tag'));
require('antd/es/row/style');
var _Row = _interopDefault(require('antd/es/row'));
require('antd/es/modal/style');
var _Modal = _interopDefault(require('antd/es/modal'));
require('antd/es/col/style');
var _Col = _interopDefault(require('antd/es/col'));
require('antd/es/select/style');
var _Select = _interopDefault(require('antd/es/select'));
require('antd/es/icon/style');
var _Icon = _interopDefault(require('antd/es/icon'));
require('antd/es/divider/style');
var _Divider = _interopDefault(require('antd/es/divider'));
require('antd/es/message/style');
var _message = _interopDefault(require('antd/es/message'));
require('antd/es/form/style');
var _Form = _interopDefault(require('antd/es/form'));
var React = require('react');
var React__default = _interopDefault(React);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var pSlice = Array.prototype.slice;
var Object_keys = typeof Object.keys === "function" ? Object.keys : function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
var deepEqual = function deepEqual(actual, expected) {
  // enforce Object.is +0 !== -0
  if (actual === 0 && expected === 0) {
    return areZerosEqual(actual, expected);

    // 7.1. All identical values are equivalent, as determined by ===.
  } else if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();
  } else if (isNumberNaN(actual)) {
    return isNumberNaN(expected);

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if ((typeof actual === "undefined" ? "undefined" : _typeof(actual)) != "object" && (typeof expected === "undefined" ? "undefined" : _typeof(expected)) != "object") {
    return actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == "[object Arguments]";
}

function isNumberNaN(value) {
  // NaN === NaN -> false
  return typeof value == "number" && value !== value;
}

function areZerosEqual(zeroA, zeroB) {
  // (1 / +0|0) -> Infinity, but (1 / -0) -> -Infinity and (Infinity !== -Infinity)
  return 1 / zeroA === 1 / zeroB;
}

function objEquiv(a, b) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;

  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b);
  }
  try {
    var ka = Object_keys(a),
        kb = Object_keys(b),
        key,
        i;
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

var FormItem = _Form.Item;

var _class = function (_Component) {
  inherits(_class, _Component);

  function _class(props) {
    classCallCheck(this, _class);

    var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    _this.state = {
      disabled: false,
      skuPropsList: [],
      skuPropVoList: [],
      tmpSkuProps: [],
      tmpSkuColumns: [],
      skuTableColumns: [],
      skuTableDataSource: [],

      //
      editProp: null
    };
    return _this;
  }

  createClass(_class, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          disabled = _props.disabled,
          skuPropsList = _props.skuPropsList,
          skuPropVoList = _props.skuPropVoList;

      this.setState({
        disabled: disabled,
        skuPropVoList: skuPropVoList,
        skuPropsList: skuPropsList
      }, function () {
        _this2._initData();
      });
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps, prevState) {
      var _this3 = this;

      var disabled = nextProps.disabled,
          skuPropsList = nextProps.skuPropsList,
          skuPropVoList = nextProps.skuPropVoList;

      var update = {};
      var needInit = false;

      if (disabled !== this.state.disabled) {
        update = Object.assign(update, { disabled: disabled });
      }

      if (!deepEqual(skuPropsList, this.state.skuPropsList)) {
        update = Object.assign(update, { skuPropsList: skuPropsList });
      }

      if (!deepEqual(skuPropVoList, this.state.skuPropVoList)) {
        needInit = true;
        update = Object.assign(update, { skuPropVoList: skuPropVoList });
      }

      this.setState(update, function () {
        needInit && _this3._initData();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        tmpSkuProps: [],
        tmpSkuColumns: [],
        skuTableColumns: [],
        skuTableDataSource: []
      });
    }
  }, {
    key: "addOneProp",
    value: function addOneProp() {
      var _state = this.state,
          tmpSkuColumns = _state.tmpSkuColumns,
          tmpSkuProps = _state.tmpSkuProps;


      var key = "key_" + new Date().getTime();
      tmpSkuColumns.push({
        title: "",
        dataIndex: "validPropColumn_" + tmpSkuColumns.length
      });
      tmpSkuProps.push({
        key: key,
        saveInputRef: React__default.createRef(),
        tags: []
      });

      this.setState({
        tmpSkuColumns: tmpSkuColumns,
        tmpSkuProps: tmpSkuProps
      });
    }
  }, {
    key: "refreshSKUTable",
    value: function refreshSKUTable() {
      var _props2 = this.props,
          _props2$extras = _props2.extras,
          extras = _props2$extras === undefined ? [] : _props2$extras,
          _props2$onChange = _props2.onChange,
          onChange = _props2$onChange === undefined ? function () {} : _props2$onChange,
          _props2$filterSku = _props2.filterSku,
          filterSku = _props2$filterSku === undefined ? false : _props2$filterSku;
      var _state2 = this.state,
          tmpSkuColumns = _state2.tmpSkuColumns,
          tmpSkuProps = _state2.tmpSkuProps;

      var tagsOfValidProps = [],
          validPropsCount = 0,
          skuTableColumns = [],
          skuTableRowCount = 0;

      // 所有属性: 有tag的属性和无tag的属性
      tmpSkuProps.forEach(function (sku, i) {
        var tags = sku.tags;
        // 有tag的属性生成表头
        if (tags.length > 0) {
          // 记录表头
          skuTableColumns.push(Object.assign(tmpSkuColumns[i], {
            dataIndex: "validPropColumn_" + validPropsCount
          }));
          // 记录有效的属性(有tag的)个数
          validPropsCount++;
          // 记录所有tag
          tagsOfValidProps.push(tags);
        }
      });
      // 计算 sku 组合数 ,即table row
      if (validPropsCount > 0) {
        skuTableRowCount = tagsOfValidProps.reduce(function (pre, item) {
          return pre * item.length;
        }, 1);
      }

      // 生成 sku
      var skuTableDataSource = [];
      for (var rowIndex = 0; rowIndex < skuTableRowCount; rowIndex++) {
        var obj = {
          id: rowIndex,
          isOld: false,
          tagList: []
        };
        var rowTags = [];
        for (var col = 0; col < validPropsCount; col++) {
          // 生成 sku tag 组合 在表格中位置
          var tagsOfSingleProp = tagsOfValidProps[col],
              tagsLength = tagsOfSingleProp.length,
              otherCombinedLength = 1;
          for (var i = 0; i <= col; i++) {
            otherCombinedLength *= tagsOfValidProps[i].length;
          }
          var tagIndex = parseInt(rowIndex / (skuTableRowCount / otherCombinedLength)) % tagsLength;
          var singleTag = tagsOfSingleProp[tagIndex];
          // 标记或恢复 tag 的所有属性

          obj["validPropColumn_" + col] = singleTag["tagName"];
          obj.tagList.push(singleTag);
          rowTags.push(singleTag);
        }
        // 从原数据中查找,有无原sku 数据,并标记 isNew , 恢复原数据
        var sku = filterSku && filterSku(rowTags);
        if (sku) {
          obj.isOld = true;
          obj = Object.assign(obj, sku);
        }
        var tags = rowTags.map(function (tag) {
          return tag.id;
        }).sort();
        var rowKey = tags.join("_");
        obj = Object.assign(obj, {
          tags: tags,
          rowKey: rowKey
        });

        skuTableDataSource.push(obj);
      }

      // 计算 rowSpan 表格合并计算
      for (var _i = 0; _i < validPropsCount; _i++) {
        var column = skuTableColumns[_i];
        column.rowSpan = 0;
        column.render = this._calcSpan(validPropsCount, tagsOfValidProps, _i);
      }

      if (Object.prototype.toString.call(extras) === "[object Function]") {
        skuTableColumns.push.apply(skuTableColumns, toConsumableArray(extras()));
      } else {
        skuTableColumns.push.apply(skuTableColumns, toConsumableArray(extras));
      }

      this.setState({
        skuTableColumns: skuTableColumns,
        skuTableDataSource: skuTableDataSource
      }, function () {
        onChange({
          skuTableColumns: skuTableColumns,
          skuTableDataSource: skuTableDataSource,
          tmpSkuProps: tmpSkuProps
        });
      });
    }
  }, {
    key: "setCurrentProp",
    value: function setCurrentProp(propId) {
      var _this4 = this;

      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _state3 = this.state,
          skuPropsList = _state3.skuPropsList,
          tmpSkuProps = _state3.tmpSkuProps,
          tmpSkuColumns = _state3.tmpSkuColumns,
          editProp = _state3.editProp;

      var label = skuPropsList.filter(function (i) {
        return i.id === propId;
      })[0].propertyName;
      if (index === false) {
        index = editProp.index;
        this.props.form.setFieldsValue(defineProperty({}, editProp.key, propId));
      }
      tmpSkuProps[index].id = propId;
      tmpSkuProps[index].propertyName = label;
      tmpSkuProps[index].tags = [];
      // 变更表格表头列
      tmpSkuColumns[index] = {
        title: label,
        dataIndex: "validPropColumn_" + index
      };
      this.setState({
        tmpSkuProps: tmpSkuProps,
        tmpSkuColumns: tmpSkuColumns
      }, function () {
        _this4.refreshSKUTable();
      });
    }
  }, {
    key: "_initData",
    value: function _initData() {
      var _this5 = this;

      var _state4 = this.state,
          tmpSkuColumns = _state4.tmpSkuColumns,
          tmpSkuProps = _state4.tmpSkuProps,
          _state4$skuPropVoList = _state4.skuPropVoList,
          skuPropVoList = _state4$skuPropVoList === undefined ? [] : _state4$skuPropVoList;
      //

      var skuData = skuPropVoList;
      if (skuData.length === 0) return;

      skuData.map(function (item, i) {
        var propertyName = item.propertyName;
        var obj = {
          key: "key_" + item.id,
          saveInputRef: React__default.createRef(),
          tags: [],
          //
          id: item.id,
          propertyName: propertyName
        };

        tmpSkuColumns.push({
          title: propertyName,
          dataIndex: "validPropColumn_" + i
        });
        tmpSkuProps.push(obj);

        item.tagList.map(function (tag) {
          obj.tags.push({
            id: tag.id,
            propertyId: item.id,
            propertyName: propertyName,
            tagName: tag.tagName
          });
          return tag;
        });
        return item;
      });

      this.setState({
        tmpSkuColumns: tmpSkuColumns,
        tmpSkuProps: tmpSkuProps,
        needInit: false
      }, function () {
        _this5.refreshSKUTable();
      });
    }
  }, {
    key: "_calcSpan",
    value: function _calcSpan(validPropsCount, tagsOfValidProps, i) {
      return function (v, row, index) {
        var len = 1;
        for (var y = i + 1; y < validPropsCount; ++y) {
          var tags = tagsOfValidProps[y];
          len *= tags.length;
        }

        var rowSpan = 0;
        if (index % len === 0) {
          rowSpan = len;
        }

        return {
          children: v,
          props: {
            rowSpan: rowSpan
          }
        };
      };
    }
  }, {
    key: "_handleInputConfirm",
    value: function _handleInputConfirm(e, index, tmpSkuProps) {
      var _this6 = this;

      var addTagApi = this.props.addTagApi;

      var singleProp = tmpSkuProps[index];
      var tagName = singleProp.saveInputRef.current.input.value.trim();
      if (tagName && singleProp.id) {
        var isExits = singleProp.tags.some(function (tag) {
          return tag.tagName === tagName;
        });
        if (isExits) {
          singleProp.inputTagVisible = false;
          _message.error("已添加");
          this.setState({
            tmpSkuProps: tmpSkuProps
          });
        } else {
          addTagApi(singleProp, tagName).then(function (res) {
            if (res.status) {
              var entry = res.entry;
              singleProp.tags.push({
                id: entry.id,
                propertyId: singleProp.id,
                propertyName: singleProp.propertyName,
                tagName: tagName
              });
            }

            singleProp.inputTagVisible = false;

            _this6.setState({
              tmpSkuProps: tmpSkuProps
            }, function () {
              _this6.refreshSKUTable();
            });
          });
        }
      } else {
        _message.error("不能为空");
        singleProp.inputTagVisible = false;

        this.setState({
          tmpSkuProps: tmpSkuProps
        });
      }
    }
  }, {
    key: "_renderProps",
    value: function _renderProps(singleProp, index, getFieldDecorator) {
      var _this7 = this;

      var _state5 = this.state,
          skuPropsList = _state5.skuPropsList,
          tmpSkuProps = _state5.tmpSkuProps,
          tmpSkuColumns = _state5.tmpSkuColumns;

      return React__default.createElement(
        "div",
        { key: "id_" + singleProp.key },
        React__default.createElement(
          _Row,
          null,
          React__default.createElement(
            _Col,
            { span: 8 },
            React__default.createElement(
              FormItem,
              null,
              React__default.createElement(
                "div",
                {
                  onMouseDown: function onMouseDown(e) {
                    e.preventDefault();
                    return false;
                  }
                },
                getFieldDecorator(singleProp.key, {
                  initialValue: singleProp.id,
                  rules: [{ required: true, message: "必填属性或删除" }]
                })(React__default.createElement(
                  _Select,
                  {
                    style: { width: "100%" },
                    placeholder: "\u8BF7\u9009\u62E9\u5C5E\u6027",
                    optionFilterProp: "children",
                    showSearch: true,
                    onChange: function onChange(v) {
                      _this7.setCurrentProp(v, index, true);
                    },
                    dropdownRender: function dropdownRender(menu) {
                      return React__default.createElement(
                        "div",
                        {
                          onClick: function onClick() {
                            return false;
                          }
                        },
                        menu,
                        React__default.createElement(_Divider, { style: { margin: "4px 0" } }),
                        React__default.createElement(
                          "div",
                          {
                            style: { padding: "8px", cursor: "pointer" },
                            onClick: function onClick(e) {
                              _this7.setState({
                                editProp: {
                                  index: index,
                                  key: singleProp.key
                                }
                              }, function () {
                                _this7.props.addProp && _this7.props.addProp(index);
                              });
                              return false;
                            }
                          },
                          React__default.createElement(_Icon, { type: "plus" }),
                          " \u65B0\u589E"
                        )
                      );
                    }
                  },
                  skuPropsList.map(function (prop) {
                    return React__default.createElement(
                      _Select.Option,
                      {
                        value: prop.id,
                        key: prop.id + "_" + prop.propertyName,
                        disabled: tmpSkuProps.some(function (item) {
                          return item.id === prop.id;
                        })
                      },
                      prop.propertyName
                    );
                  })
                ))
              )
            )
          ),
          React__default.createElement(
            _Col,
            { span: 1 },
            React__default.createElement(_Icon, {
              type: "close-circle",
              theme: "twoTone",
              twoToneColor: "red",
              onClick: function onClick() {
                var v = tmpSkuProps[index].id;
                var list = skuPropsList.filter(function (i) {
                  return i.id === v;
                });
                var label = list.length > 0 ? list[0].propertyName : "-";
                _Modal.confirm({
                  title: "删除属性",
                  content: "\u662F\u5426\u786E\u8BA4\u5220\u9664\u5C5E\u6027: " + label,
                  okText: "确认",
                  cancelText: "取消",
                  onOk: function onOk() {
                    tmpSkuProps.splice(index, 1);
                    tmpSkuColumns.splice(index, 1);
                    _this7.setState({
                      tmpSkuProps: tmpSkuProps,
                      tmpSkuColumns: tmpSkuColumns
                    }, function () {
                      _this7.refreshSKUTable();
                    });
                  }
                });
              },
              style: { fontSize: 24, margin: 8 }
            })
          )
        ),
        React__default.createElement(
          _Row,
          null,
          singleProp.tags.map(function (tag, i) {
            return React__default.createElement(
              _Tag,
              {
                key: "item_" + index + "_tag_" + tag.id,
                closable: true,
                onClose: function onClose() {
                  tmpSkuProps[index].tags.splice(i, 1);
                  _this7.setState({
                    tmpSkuProps: tmpSkuProps
                  }, function () {
                    // 计算 sku 表格
                    _this7.refreshSKUTable();
                  });
                }
              },
              tag.tagName
            );
          }),
          singleProp.inputTagVisible ? React__default.createElement(_Input, {
            ref: singleProp.saveInputRef,
            type: "text",
            size: "small",
            style: { width: 78 },
            onChange: this.handleInputChange,
            onBlur: function onBlur(e) {
              return _this7._handleInputConfirm(e, index, tmpSkuProps);
            },
            onPressEnter: function onPressEnter(e) {
              return _this7._handleInputConfirm(e, index, tmpSkuProps);
            }
          }) : React__default.createElement(
            _Tag,
            {
              onClick: function onClick() {
                singleProp.inputTagVisible = true;
                _this7.setState({
                  tmpSkuProps: tmpSkuProps
                });
              },
              style: { background: "#fff", borderStyle: "dashed" }
            },
            React__default.createElement(_Icon, { type: "plus" }),
            "\u6DFB\u52A0"
          )
        )
      );
    }
  }, {
    key: "_renderSkuTable",
    value: function _renderSkuTable() {
      var _state6 = this.state,
          skuTableDataSource = _state6.skuTableDataSource,
          skuTableColumns = _state6.skuTableColumns,
          tmpSkuProps = _state6.tmpSkuProps;

      return tmpSkuProps.length > 0 ? React__default.createElement(_Table, {
        dataSource: skuTableDataSource,
        rowKey: "id",
        columns: [].concat(toConsumableArray(skuTableColumns)),
        bordered: true,
        pagination: false,
        scroll: { x: "max-content" },
        title: this.props.title,
        footer: this.props.footer
      }) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var tmpSkuProps = this.state.tmpSkuProps;
      var _props3 = this.props,
          form = _props3.form,
          _props3$useDefaultBut = _props3.useDefaultButton,
          useDefaultButton = _props3$useDefaultBut === undefined ? true : _props3$useDefaultBut,
          _props3$formItemLayou = _props3.formItemLayout,
          formItemLayout = _props3$formItemLayou === undefined ? {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        }
      } : _props3$formItemLayou,
          _props3$label = _props3.label1,
          label1 = _props3$label === undefined ? '' : _props3$label,
          _props3$label2 = _props3.label2,
          label2 = _props3$label2 === undefined ? '' : _props3$label2;
      var getFieldDecorator = form.getFieldDecorator;

      return React__default.createElement(
        "div",
        null,
        React__default.createElement(
          FormItem,
          _extends({ label: label1 }, formItemLayout),
          tmpSkuProps.map(function (item, index) {
            return _this8._renderProps(item, index, getFieldDecorator);
          }),
          useDefaultButton && React__default.createElement(
            _Button,
            {
              disabled: this.state.disabled,
              onClick: function onClick() {
                _this8.addOneProp();
              },
              style: { margin: "10px 0" }
            },
            "\u6DFB\u52A0\u5C5E\u6027"
          )
        ),
        React__default.createElement(
          FormItem,
          _extends({ label: label2 }, formItemLayout),
          this._renderSkuTable()
        )
      );
    }
  }]);
  return _class;
}(React.Component);

module.exports = _class;
//# sourceMappingURL=index.js.map
