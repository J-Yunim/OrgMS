import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import {
  Tabs,
  Button,
  Tooltip,
  Dropdown,
  Menu,
  Modal,
  Result,
  Form,
  Select,
  Input,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Panel from "../../components/Panel";

const { TabPane } = Tabs;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

function Tasks() {
  const [visible, setvisible] = useState(false);
  const [newProject, setnewProject] = useState(true);
  const [done, setDone] = useState(false);

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  function handleMenuClick(e) {
    console.log(e);
    if (e.key === "1") {
      setnewProject(true);
    } else {
      setnewProject(false);
    }
    setvisible(true);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">New Project</Menu.Item>
      <Menu.Item key="2">New Task</Menu.Item>
    </Menu>
  );

  const operations = (
    <>
      <Dropdown overlay={menu}>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} />
      </Dropdown>
    </>
  );

  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleDone = () => {
    setDone(false);
    setvisible(false);
  };

  const handleCancel = () => {
    setvisible(false);
  };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          type="success"
          title="Success"
          description={`${newProject ? "Project" : "Member"} added`}
          actions={
            <Button type="primary" onClick={handleDone}>
              OK
            </Button>
          }
          className="formResult"
        />
      );
    }
    return (
      <Form form={form} onSubmit={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          {...formLayout}
          rules={[{ required: true, message: "Please enter a name" }]}
          //   initialValue={state.current.title}
        >
          <Input />
        </Form.Item>
        {!newProject && (
          <>
            <Form.Item
              label="Owner"
              name="owner"
              rules={[{ required: true, message: "Please enter a ownver" }]}
              //   initialValue={state.current.title}
              {...formLayout}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Priority"
              name="priority"
              rules={[{ required: true, message: "Please slect a priority" }]}
              //   initialValue={state.current.title}
              {...formLayout}
            >
              <Select placeholder="Select from below">
                <SelectOption value="top">Top</SelectOption>
                <SelectOption value="mid">Mid</SelectOption>
                <SelectOption value="low">Low</SelectOption>
              </Select>
            </Form.Item>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Please select a department" },
              ]}
              //   initialValue={state.current.owner}
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
            </Form.Item>
            <Form.Item
              {...formLayout}
              label="Description"
              name="desc"
              //   initialValue={state.current.desc}
            >
              <TextArea rows={4} />
            </Form.Item>
          </>
        )}
      </Form>
    );
  };

  const modalFooter = done
    ? { footer: null, onCancel: handleDone }
    : { okText: "OK", onOk: handleSubmit, onCancel: handleCancel };

  return (
    <div className="tasks">
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="Project 1" key="1">
          <Panel />
        </TabPane>
        <TabPane tab="Project 2" key="2">
          <Panel />
        </TabPane>
      </Tabs>
      <Modal
        title={done ? null : `New ${newProject ? "Project" : "Task"}`}
        className="standardListForm"
        width={640}
        // bodyStyle={state.done ? { padding: "72px 0" } : { padding: "28px 0 0" }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {getModalContent()}
      </Modal>
    </div>
  );
}

export default Tasks;
