import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  Button,
  Modal,
  Tag,
  Icon,
  Input,
  Table,
  Divider,
  message
} from "antd";
import deepCompare from "./deep-compare";

const FormItem = Form.Item;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    const { disabled, skuPropsList, skuPropVoList } = this.props;
    this.setState(
      {
        disabled,
        skuPropVoList,
        skuPropsList
      },
      () => {
        this._initData();
      }
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    const { disabled, skuPropsList, skuPropVoList } = nextProps;
    let update = {};
    let needInit = false;

    if (disabled !== this.state.disabled) {
      update = Object.assign(update, { disabled })
    }

    if (!deepCompare(skuPropsList, this.state.skuPropsList)) {
      update = Object.assign(update, { skuPropsList })
    }

    if (!deepCompare(skuPropVoList, this.state.skuPropVoList)) {
      needInit = true;
      update = Object.assign(update, { skuPropVoList })
    }

    this.setState(update, () => {
      needInit && this._initData();
    });
  }

  reset() {
    this.setState({
      tmpSkuProps: [],
      tmpSkuColumns: [],
      skuTableColumns: [],
      skuTableDataSource: []
    });
  }

  addOneProp() {
    const { tmpSkuColumns, tmpSkuProps } = this.state;

    let key = `key_${new Date().getTime()}`;
    tmpSkuColumns.push({
      title: "",
      dataIndex: `validPropColumn_${tmpSkuColumns.length}`
    });
    tmpSkuProps.push({
      key: key,
      saveInputRef: React.createRef(),
      tags: []
    });

    this.setState({
      tmpSkuColumns,
      tmpSkuProps
    });
  }

  refreshSKUTable() {
    const { extras = [], onChange = () => { }, filterSku = false } = this.props;
    const { tmpSkuColumns, tmpSkuProps } = this.state;
    let tagsOfValidProps = [],
      validPropsCount = 0,
      skuTableColumns = [],
      skuTableRowCount = 0;

    // 所有属性: 有tag的属性和无tag的属性
    tmpSkuProps.forEach((sku, i) => {
      let tags = sku.tags;
      // 有tag的属性生成表头
      if (tags.length > 0) {
        // 记录表头
        skuTableColumns.push(Object.assign(tmpSkuColumns[i], {
          dataIndex: `validPropColumn_${validPropsCount}`
        }));
        // 记录有效的属性(有tag的)个数
        validPropsCount++;
        // 记录所有tag
        tagsOfValidProps.push(tags);
      }
    });
    // 计算 sku 组合数 ,即table row
    if (validPropsCount > 0) {
      skuTableRowCount = tagsOfValidProps.reduce((pre, item) => {
        return pre * item.length;
      }, 1);
    }

    // 生成 sku
    let skuTableDataSource = [];
    for (let rowIndex = 0; rowIndex < skuTableRowCount; rowIndex++) {
      let obj = {
        id: rowIndex,
        isOld: false,
        tagList: []
      };
      let rowTags = [];
      for (let col = 0; col < validPropsCount; col++) {
        // 生成 sku tag 组合 在表格中位置
        let tagsOfSingleProp = tagsOfValidProps[col],
          tagsLength = tagsOfSingleProp.length,
          otherCombinedLength = 1;
        for (let i = 0; i <= col; i++) {
          otherCombinedLength *= tagsOfValidProps[i].length;
        }
        let tagIndex =
          parseInt(rowIndex / (skuTableRowCount / otherCombinedLength)) %
          tagsLength;
        let singleTag = tagsOfSingleProp[tagIndex];
        // 标记或恢复 tag 的所有属性

        obj[`validPropColumn_${col}`] = singleTag["tagName"];
        obj.tagList.push(singleTag);
        rowTags.push(singleTag);
      }
      // 从原数据中查找,有无原sku 数据,并标记 isNew , 恢复原数据
      let sku = filterSku && filterSku(rowTags);
      if (sku) {
        obj.isOld = true;
        obj = Object.assign(obj, sku);
      }
      let tags = rowTags.map(tag => tag.id).sort();
      let rowKey = tags.join("_");
      obj = Object.assign(obj, {
        tags,
        rowKey
      });

      skuTableDataSource.push(obj);
    }

    // 计算 rowSpan 表格合并计算
    for (let i = 0; i < validPropsCount; i++) {
      const column = skuTableColumns[i];
      column.rowSpan = 0;
      column.render = this._calcSpan(validPropsCount, tagsOfValidProps, i);
    }

    if (Object.prototype.toString.call(extras) === "[object Function]") {
      skuTableColumns.push(...extras());
    } else {
      skuTableColumns.push(...extras);
    }

    this.setState(
      {
        skuTableColumns,
        skuTableDataSource
      },
      () => {
        onChange({
          skuTableColumns,
          skuTableDataSource,
          tmpSkuProps
        });
      }
    );
  }

  setCurrentProp(propId, index = false) {
    const { skuPropsList, tmpSkuProps, tmpSkuColumns, editProp } = this.state;
    let label = skuPropsList.filter(i => i.id === propId)[0].propertyName;
    if (index === false) {
      index = editProp.index;
      this.props.form.setFieldsValue({
        [editProp.key]: propId
      });
    }
    tmpSkuProps[index].id = propId;
    tmpSkuProps[index].propertyName = label;
    tmpSkuProps[index].tags = [];
    // 变更表格表头列
    tmpSkuColumns[index] = {
      title: label,
      dataIndex: `validPropColumn_${index}`
    };
    this.setState(
      {
        tmpSkuProps,
        tmpSkuColumns
      },
      () => {
        this.refreshSKUTable();
      }
    );
  }

  _initData() {
    const { tmpSkuColumns, tmpSkuProps, skuPropVoList = [] } = this.state;
    //
    let skuData = skuPropVoList;
    if (skuData.length === 0) return;

    skuData.map((item, i) => {
      let propertyName = item.propertyName;
      let obj = {
        key: `key_${item.id}`,
        saveInputRef: React.createRef(),
        tags: [],
        //
        id: item.id,
        propertyName
      };

      tmpSkuColumns.push({
        title: propertyName,
        dataIndex: `validPropColumn_${i}`
      });
      tmpSkuProps.push(obj);

      item.tagList.map(tag => {
        obj.tags.push({
          id: tag.id,
          propertyId: item.id,
          propertyName,
          tagName: tag.tagName
        });
        return tag;
      });
      return item;
    });

    this.setState(
      {
        tmpSkuColumns,
        tmpSkuProps,
        needInit: false
      },
      () => {
        this.refreshSKUTable();
      }
    );
  }

  _calcSpan(validPropsCount, tagsOfValidProps, i) {
    return (v, row, index) => {
      let len = 1;
      for (let y = i + 1; y < validPropsCount; ++y) {
        let tags = tagsOfValidProps[y];
        len *= tags.length;
      }

      let rowSpan = 0;
      if (index % len === 0) {
        rowSpan = len;
      }

      return {
        children: v,
        props: {
          rowSpan
        }
      };
    };
  }

  _handleInputConfirm(e, index, tmpSkuProps) {
    const { addTagApi } = this.props;
    let singleProp = tmpSkuProps[index];
    let tagName = singleProp.saveInputRef.current.input.value.trim();
    if (tagName && singleProp.id) {
      let isExits = singleProp.tags.some(tag => {
        return tag.tagName === tagName;
      });
      if (isExits) {
        singleProp.inputTagVisible = false;
        message.error("已添加");
        this.setState({
          tmpSkuProps
        });
      } else {
        addTagApi(singleProp, tagName).then(res => {
          if (res.status) {
            let entry = res.entry;
            singleProp.tags.push({
              id: entry.id,
              propertyId: singleProp.id,
              propertyName: singleProp.propertyName,
              tagName: tagName
            });
          }

          singleProp.inputTagVisible = false;

          this.setState(
            {
              tmpSkuProps
            },
            () => {
              this.refreshSKUTable();
            }
          );
        });
      }
    } else {
      message.error("不能为空");
      singleProp.inputTagVisible = false;

      this.setState({
        tmpSkuProps
      });
    }
  }

  _renderProps(singleProp, index, getFieldDecorator) {
    const { skuPropsList, tmpSkuProps, tmpSkuColumns } = this.state;
    return (
      <div key={`id_${singleProp.key}`}>
        <Row>
          <Col span={8}>
            {/* <FormItem> */}
            <div
              onMouseDown={e => {
                e.preventDefault();
                return false;
              }}
            >
              {getFieldDecorator(singleProp.key, {
                initialValue: singleProp.id,
                rules: [{ required: true, message: "必填属性或删除" }]
              })(
                <Select
                  style={{ width: "100%" }}
                  placeholder="请选择属性"
                  optionFilterProp="children"
                  showSearch={true}
                  onChange={v => {
                    this.setCurrentProp(v, index, true);
                  }}
                  dropdownRender={menu => (
                    <div
                      onClick={() => {
                        return false;
                      }}
                    >
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div
                        style={{ padding: "8px", cursor: "pointer" }}
                        onClick={e => {
                          this.setState(
                            {
                              editProp: {
                                index,
                                key: singleProp.key
                              }
                            },
                            () => {
                              this.props.addProp && this.props.addProp(index);
                            }
                          );
                          return false;
                        }}
                      >
                        <Icon type="plus" /> 新增
                      </div>
                    </div>
                  )}
                >
                  {skuPropsList.map(prop => (
                    <Select.Option
                      value={prop.id}
                      key={`${prop.id}_${prop.propertyName}`}
                      disabled={tmpSkuProps.some(item => item.id === prop.id)}
                    >
                      {prop.propertyName}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </div>
            {/* </FormItem> */}
          </Col>
          <Col span={1}>
            <Icon
              type="close-circle"
              theme="twoTone"
              twoToneColor="red"
              onClick={() => {
                let v = tmpSkuProps[index].id;
                let list = skuPropsList.filter(i => i.id === v);
                let label = list.length > 0 ? list[0].propertyName : "-";
                Modal.confirm({
                  title: "删除属性",
                  content: `是否确认删除属性: ${label}`,
                  okText: "确认",
                  cancelText: "取消",
                  onOk: () => {
                    tmpSkuProps.splice(index, 1);
                    tmpSkuColumns.splice(index, 1);
                    this.setState(
                      {
                        tmpSkuProps,
                        tmpSkuColumns
                      },
                      () => {
                        this.refreshSKUTable();
                      }
                    );
                  }
                });
              }}
              style={{ fontSize: 24, margin: 8 }}
            />
          </Col>
        </Row>
        <Row>
          {singleProp.tags.map((tag, i) => {
            return (
              <Tag
                key={`item_${index}_tag_${tag.id}`}
                closable={true}
                onClose={() => {
                  tmpSkuProps[index].tags.splice(i, 1);
                  this.setState(
                    {
                      tmpSkuProps
                    },
                    () => {
                      // 计算 sku 表格
                      this.refreshSKUTable();
                    }
                  );
                }}
              >
                {tag.tagName}
              </Tag>
            );
          })}
          {singleProp.inputTagVisible ? (
            <Input
              ref={singleProp.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              onChange={this.handleInputChange}
              onBlur={e => this._handleInputConfirm(e, index, tmpSkuProps)}
              onPressEnter={e =>
                this._handleInputConfirm(e, index, tmpSkuProps)
              }
            />
          ) : (
              <Tag
                onClick={() => {
                  singleProp.inputTagVisible = true;
                  this.setState({
                    tmpSkuProps
                  });
                }}
                style={{ background: "#fff", borderStyle: "dashed" }}
              >
                <Icon type="plus" />
                添加
            </Tag>
            )}
        </Row>
      </div>
    );
  };

  _renderSkuTable() {
    const { skuTableDataSource, skuTableColumns, tmpSkuProps } = this.state;
    return tmpSkuProps.length > 0 ? (
      <Table
        dataSource={skuTableDataSource}
        rowKey="id"
        columns={[...skuTableColumns]}
        bordered
        pagination={false}
        scroll={{ x: "max-content" }}
        title={this.props.title}
        footer={this.props.footer}
      />
    ) : null;
  }

  render() {
    const { tmpSkuProps } = this.state;
    const { form, useDefaultButton = true } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <FormItem>
          {tmpSkuProps.map((item, index) =>
            this._renderProps(item, index, getFieldDecorator)
          )}
          {useDefaultButton && (
            <Button
              disabled={this.state.disabled}
              onClick={() => {
                this.addOneProp();
              }}
              style={{ margin: "10px 0" }}
            >
              添加属性
            </Button>
          )}
        </FormItem>

        <FormItem>{this._renderSkuTable()}</FormItem>
      </div>
    );
  }
}
