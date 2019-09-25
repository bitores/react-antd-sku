import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Icon, Input, Form, Button } from "antd";
import { Modal } from "react-antd-super-form";

import Sku from "../src";

let count = 100;
let tagLib = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};
const FormItem = Form.Item;

@Form.create()
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tmpSkuProps: [],
      skuTableColumns: [],
      skuTableDataSource: [],
      skuPropsList: [
        { id: 4, propertyName: "规格", valueList: null },
        { id: 10, propertyName: "尺寸", valueList: null },
        { id: 11, propertyName: "材质", valueList: null },
        { id: 12, propertyName: "重量", valueList: null },
        { id: 13, propertyName: "容量", valueList: null }
      ],
      propVoList: [
        {
          id: 4,
          propertyName: "规格",
          tagList: [
            {
              id: 1,
              tagName: "a"
            },
            {
              id: 2,
              tagName: "b"
            }
          ]
        },
        {
          id: 10,
          propertyName: "尺寸",
          tagList: [
            {
              id: 3,
              tagName: "c"
            },
            {
              id: 4,
              tagName: "d"
            }
          ]
        }
      ],
      skuData: [
        {
          tags: [1, 3],
          price: 1
        },
        {
          tags: [1, 4],
          price: 2
        },
        {
          tags: [2, 3],
          price: 3
        },
        {
          tags: [2, 4],
          price: 4
        }
      ]
    };
    this.skuRef = React.createRef();
    this.dialog = React.createRef();
  }

  addProperty() {
    const { skuPropsList } = this.state;

    skuPropsList.push({
      id: 13 + ++count,
      propertyName: "容量" + count++,
      valueList: null
    });

    this.setState({
      skuPropsList: skuPropsList
    });
  }

  addTagApi(props, tagName) {
    return new Promise((res, resj) => {
      res({
        entry: {
          id: tagLib[tagName] || count++
        },
        status: true,
        message: ""
      });
    });
  }

  renderBaseFormItem(item, layout) {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem label={item.label} {...layout} extra={item.extra}>
        {getFieldDecorator(item.key, item.config)(
          item.el || <Input placeholder={"请输入" + item.label} />
        )}
        {item.renderItem}
      </FormItem>
    );
  }

  render() {
    const {
      skuPropsList,
      propVoList,
      skuData,
      skuTableDataSource
    } = this.state;
    const { form } = this.props;
    return (
      <div>
        <h1>
          <Icon
            type="plus-circle"
            style={{ fontSize: 24, color: "red" }}
            onClick={() => {
              this.addProperty();
            }}
          />
        </h1>
        <Button
          onClick={() => {
            this.skuRef.current.addOneProp();
          }}
        >
          Add
        </Button>
        <Sku
          ref={this.skuRef}
          form={form}
          useDefaultButton={false}
          skuPropsList={skuPropsList}
          skuPropVoList={propVoList}
          addTagApi={this.addTagApi}
          filterSku={skuTags => {
            let k = skuTags
              .map(tag => tag.id)
              .sort()
              .join(":");
            let sku = skuData.filter(sku => {
              let k1 = sku.tags.sort().join(":");
              return k === k1;
            });
            return sku[0];
          }}
          extras={[
            {
              title: "建议售价",
              dataIndex: "preprice",
              width: 150,
              render: (v, record, row) => {
                return this.renderBaseFormItem({
                  key: `${record.rowKey}.preprice`,
                  config: {
                    initialValue: v
                  },
                  el: (
                    <Input
                      style={{
                        padding: 0,
                        textAlign: "center"
                      }}
                      placeholder="请输入原价"
                    />
                  )
                });
              }
            },
            {
              title: "批发价",
              dataIndex: "price",
              width: 150,
              render: (v, record, index) => {
                return this.renderBaseFormItem({
                  key: `${record.rowKey}.price`,
                  config: {
                    initialValue: v,
                    rules: [{ required: true, message: "必填" }]
                  },
                  el: (
                    <Input
                      style={{
                        padding: 0,
                        textAlign: "center"
                      }}
                      placeholder="请输入售价"
                    />
                  )
                });
              }
            },
            {
              title: "已售",
              dataIndex: "count",
              width: 150,
              render: (v, record, index) => {
                return this.renderBaseFormItem({
                  key: `${record.rowKey}.count`,
                  config: {
                    initialValue: v,
                    rules: [{ required: true, message: "必填" }]
                  },
                  el: (
                    <Input
                      style={{
                        padding: 0,
                        textAlign: "center"
                      }}
                      placeholder="请输入库存"
                      onInput={e =>
                        (e.target.value = e.target.value
                          .replace(/[^\d]/g, "")
                          .substr(0, 5))
                      }
                    />
                  )
                });
              }
            }
          ]}
          footer={() => (
            <p>
              <span style={{ margin: "0 10px" }}>批量设置:</span>
              <a
                href="void:javascript(0)"
                type="link"
                onClick={() => {
                  this.setState(
                    {
                      dialogTitle: "价格",
                      dialogOpt: "price"
                    },
                    () => {
                      this.dialog.current.show();
                    }
                  );
                  return false;
                }}
              >
                价格
              </a>
            </p>
          )}
          onChange={v => {
            this.setState({
              tmpSkuProps: v.tmpSkuProps,
              skuTableColumns: v.skuTableColumns,
              skuTableDataSource: v.skuTableDataSource
            });
          }}
        />
        <Button
          onClick={() => {
            form.validateFields((err, values) => {
              if (err) return;
              console.log(values);
            });
          }}
        >
          提交数据
        </Button>
        <Modal
          ref={this.dialog}
          onOk={(e, modalForm, show) => {
            modalForm.validateFields((err, values) => {
              if (err) return;
              skuTableDataSource.map((row, index) => {
                console.log(row);
                this.props.form.setFieldsValue({
                  [`${row.rowKey}.preprice`]: values.v
                });
              });
              show(false);
            });
          }}
          form={{
            data: [
              {
                label: "建议价格",
                type: "input",
                key: "v",
                onInput: e => {
                  e.target.value = e.target.value
                    .replace(/[^\d]/g, "")
                    .substr(0, 5);
                  return e.target.value;
                }
              }
            ]
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
