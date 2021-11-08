import React, { useState } from "react";
import { findDOMNode } from "react-dom";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Modal,
  Form,
  Select,
  Result,
  PageHeader as PageHeaderWrapper,
  Table,
  Space,
  Badge,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import "./index.css";
// import Result from "../../components/Result";

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

const statusMap = ["processing", "success", "error"];
const status = ["Pending", "Approved", "Rejected"];

const columns = [
  {
    title: "Requester",
    dataIndex: "requester",
    fixed: "left",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Subject",
    dataIndex: "subject",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Description",
    dataIndex: "desc",
  },
  {
    title: "Status",
    dataIndex: "status",
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: () => (
      <Space size="middle">
        <a>Accept</a>
        <a>Decline</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    requester: "John Brown1",
    department: "Finance",
    subject: "Retreat",
    category: "...",
    amount: 32,
    desc: "New York No. 1 Lake Park",
    status: 1,
  },
  {
    key: "2",
    requester: "John Brown2",
    department: "Finance",
    subject: "Retreat",
    category: "...",
    amount: -32,
    desc: "New York No. 1 Lake Park",
    status: 0,
  },
  {
    key: "3",
    requester: "John Brown3",
    department: "Finance",
    subject: "Retreat",
    category: "...",
    amount: 32,
    desc: "New York No. 1 Lake Park",
    status: 2,
  },
  {
    key: "4",
    requester: "John Brown4",
    department: "Finance",
    subject: "Retreat",
    category: "...",
    amount: 32,
    desc: "New York No. 1 Lake Park",
    status: 0,
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
            scroll={{ x: 1200 }}
          />
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
