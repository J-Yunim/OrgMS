import React, { useState } from "react";
import { findDOMNode } from "react-dom";
import {
  List,
  Card,
  Row,
  Col,
  Input,
  Button,
  Avatar,
  Modal,
  Form,
  Select,
  Result,
  PageHeader as PageHeaderWrapper,
  Table,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import "./index.css";
// import Result from "../../components/Result";

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

function Finance() {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [current, setcurrent] = useState("");

  var addBtn;

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const showEditModal = (item) => {
    setVisible(true);
  };

  const handleDone = () => {
    // setTimeout(() => addBtn.blur(), 0);
    setVisible(false);
    setDone(false);
  };

  const handleCancel = () => {
    // setTimeout(() => addBtn.blur(), 0);
    setVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { current } = state;
    // const id = current ? current.id : "";

    // setTimeout(() => addBtn.blur(), 0);
    form
      .validateFields(["name", "email", "title", "department", "desc"])
      .then(
        (values) => {
          setDone(true);
        }
        //   dispatch({
        //     type: "list/submit",
        //     payload: { id, ...fieldsValue },
        //   });
      )
      .catch((errInfo) => {
        return;
      });
  };

  const deleteItem = (id) => {
    // const { dispatch } = props;
    // dispatch({
    //   type: "list/submit",
    //   payload: { id },
    // });
  };

  const editAndDelete = (key, currentItem) => {
    if (key === "edit") showEditModal(currentItem);
    else if (key === "delete") {
      Modal.confirm({
        title: "Delete Member",
        content: "Are you sure you want to delete this member?",
        okText: "OK",
        cancelText: "Cancel",
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: handleDone }
    : { okText: "OK", onOk: handleSubmit, onCancel: handleCancel };

  const Info = ({ title, value, bordered }) => (
    <div className="headerInfo">
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );

  const extraContent = (
    <div className="extraContent">
      <Select
        placeholder="Select from below"
        defaultValue="all"
        style={{ minWidth: 120 }}
      >
        <SelectOption value="all">All</SelectOption>
        <SelectOption value="finance">Finance</SelectOption>
        <SelectOption value="program">Program</SelectOption>
        <SelectOption value="operation">Operation</SelectOption>
        <SelectOption value="social">Social</SelectOption>
        <SelectOption value="marketing">Marketing</SelectOption>
        <SelectOption value="outreach">Outreach</SelectOption>
        <SelectOption value="profdev">Professional Dev</SelectOption>
      </Select>
      <Search
        className="extraContentSearch"
        placeholder="Search"
        onSearch={() => ({})}
      />
    </div>
  );

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
  };

  const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
    <div className="listContent" />
  );

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <PageHeaderWrapper>
      <div className="standardList">
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="In" value="200" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Out" value="-100" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Total" value="100" />
            </Col>
          </Row>
        </Card>

        <Card
          className="listCard"
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: "0 32px 40px 32px" }}
          extra={extraContent}
        >
          <Button
            type="dashed"
            style={{ width: "100%", marginBottom: 8 }}
            icon={<PlusOutlined />}
            onClick={showModal}
            ref={(component) => {
              /* eslint-disable */
              addBtn = findDOMNode(component);
              /* eslint-enable */
            }}
          >
            Add
          </Button>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={paginationProps}
          />
          {/* <List
            size="large"
            rowKey="id"
            loading={false}
            pagination={paginationProps}
            dataSource={[]}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      showEditModal(item);
                    }}
                  >
                    Edit
                  </a>,
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      editAndDelete("delete", item);
                    }}
                  >
                    Delete
                  </a>,
                  // <MoreBtn current={item} />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.logo} shape="square" size="large" />
                  }
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.subDescription}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          /> */}
        </Card>
      </div>
      <Modal
        title={done ? null : `${current ? "Edit" : "New"} Member`}
        className="standardListForm"
        width={640}
        bodyStyle={done ? { padding: "72px 0" } : { padding: "28px 0 0" }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {done ? (
          <Result
            status="success"
            title="Success"
            subTitle={`Member ${current ? "Edited" : "Added"}`}
            extra={
              <Button type="primary" onClick={handleDone}>
                OK
              </Button>
            }
            className="formResult"
          />
        ) : (
          <Form form={form} onSubmit={handleSubmit}>
            <FormItem
              label="Name"
              name="name"
              {...formLayout}
              rules={[{ required: true, message: "Please enter your name" }]}
              //   initialValue={current.title}
            >
              <Input placeholder="your name" />
            </FormItem>
            <FormItem
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
              //   initialValue={current.title}
              {...formLayout}
            >
              <Input placeholder="your email" />
            </FormItem>
            <FormItem
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter your title" }]}
              //   initialValue={current.title}
              {...formLayout}
            >
              <Select placeholder="Select from below">
                <SelectOption value="Chair">Chair</SelectOption>
                <SelectOption value="VC">VC</SelectOption>
                <SelectOption value="Member">Member</SelectOption>
              </Select>
            </FormItem>
            <FormItem
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Please select your department" },
              ]}
              //   initialValue={current.owner}
              {...formLayout}
            >
              <Select placeholder="Select from below">
                <SelectOption value="finance">Finance</SelectOption>
                <SelectOption value="program">Program</SelectOption>
                <SelectOption value="operation">Operation</SelectOption>
                <SelectOption value="social">Social</SelectOption>
                <SelectOption value="marketing">Marketing</SelectOption>
                <SelectOption value="outreach">Outreach</SelectOption>
                <SelectOption value="profdev">Professional Dev</SelectOption>
              </Select>
            </FormItem>
            <FormItem
              {...formLayout}
              label="Description"
              name="desc"
              //   initialValue={current.desc}
            >
              <TextArea rows={4} />
            </FormItem>
          </Form>
        )}
      </Modal>
    </PageHeaderWrapper>
  );
}

export default Finance;
