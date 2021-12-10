import React, { useEffect, useState } from "react";
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
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
// import Result from "../../components/Result";

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

function Members() {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [current, setcurrent] = useState("");
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    getMembers();
  });

  async function getMembers() {
    await dispatch.members.getMembers();
    setloading(false);
  }

  const { memberList, total, numChair, numVC, numMember } = useSelector(
    (state) => state.members
  );

  var addBtn;

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  const [form] = Form.useForm();

  async function showModal() {
    setcurrent({});
    console.log(current);
    setVisible(true);
  }

  const showEditModal = (item) => {
    setcurrent(item);
    console.log(current);
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
      .then((values) => {
        setDone(true);
        if (current) {
          dispatch.members.editMember({ member: values, id: current._id });
        } else {
          dispatch.members.saveMembers(values);
        }
      })
      .catch((errInfo) => {
        return;
      });
  };

  const deleteItem = (item) => {
    Modal.confirm({
      title: "Delete Member",
      content: "Are you sure you want to delete this member?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => deleteItem(item._id),
    });
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
        <SelectOption value="Finance">Finance</SelectOption>
        <SelectOption value="Program">Program</SelectOption>
        <SelectOption value="Operation">Operation</SelectOption>
        <SelectOption value="Social">Social</SelectOption>
        <SelectOption value="Marketing">Marketing</SelectOption>
        <SelectOption value="Outreach">Outreach</SelectOption>
        <SelectOption value="Profdev">Professional Dev</SelectOption>
      </Select>
      <Search
        className="extraContentSearch"
        placeholder="Search"
        onSearch={() => ({})}
      />
    </div>
  );

  const [pageSize, setpageSize] = useState(5);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: pageSize,
    total: total,
  };

  return (
    <PageHeaderWrapper>
      <div className="standardList">
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="Members" value={numMember} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Chairs" value={numChair} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Vice Chairs" value={numVC} />
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
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={memberList}
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
                      deleteItem(item);
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
                  title={
                    <a
                      href={item.href}
                    >{`${item.name} [${item.department}] - ${item.title}`}</a>
                  }
                  description={item.email ? item.email : ""}
                />
              </List.Item>
            )}
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
              initialValue={current && current.name}
            >
              <Input placeholder="your name" />
            </FormItem>
            <FormItem
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
              initialValue={current.email}
              {...formLayout}
            >
              <Input placeholder="your email" />
            </FormItem>
            <FormItem
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter your title" }]}
              initialValue={current.title}
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
              initialValue={current.department}
              {...formLayout}
            >
              <Select placeholder="Select from below">
                <SelectOption value="Finance">Finance</SelectOption>
                <SelectOption value="Program">Program</SelectOption>
                <SelectOption value="Operation">Operation</SelectOption>
                <SelectOption value="Social">Social</SelectOption>
                <SelectOption value="Marketing">Marketing</SelectOption>
                <SelectOption value="Outreach">Outreach</SelectOption>
                <SelectOption value="Profdev">Professional Dev</SelectOption>
              </Select>
            </FormItem>
            <FormItem
              {...formLayout}
              label="Description"
              name="desc"
              initialValue={current.desc}
            >
              <TextArea rows={4} />
            </FormItem>
          </Form>
        )}
      </Modal>
    </PageHeaderWrapper>
  );
}

export default Members;
