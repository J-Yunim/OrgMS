import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Modal, Result, Form, Select, Input, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Card from "../Card";

const SelectOption = Select.Option;
const { TextArea } = Input;

const task = {
  title: "Thisis a title",
  priority: 0,
  department: "Finance",
  owner: "Charlotte",
  description: "This is a description",
};

var itemsFromBackend = [
  { id: "1111", content: task },
  { id: "1112", content: task },
  { id: "1113", content: task },
  { id: "1114", content: task },
  { id: "1115", content: task },
];

var columnsFromBackend = {
  requested: {
    name: "Requested",
    items: itemsFromBackend,
  },
  todo: {
    name: "To do",
    items: [],
  },
  progress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

function Panel() {
  const [visible, setvisible] = useState(false);
  const [deleteitem, setDelete] = useState(false);
  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState(false);
  const [current, setcurrent] = useState(task);
  // const [tasks, setTasks] = useState(itemsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      // send to backend
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  const [columns, setColumns] = useState(columnsFromBackend);

  function handleAddClick(e) {
    setvisible(true);
  }
  function handleDeleteClick(e) {
    setDelete(true);
  }
  function handleDeleteProject(e) {
    setvisible(true);
  }

  const operations = (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={handleAddClick}
      />
      <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
    </>
  );

  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const id = current ? current.id : "";

    // setTimeout(() => addBtn.blur(), 0);
    form
      .validateFields([
        "title",
        "owner",
        "priority",
        "department",
        "description",
      ])
      .then(
        (values) => {
          setDone(true);
          console.log(values);
          if (!edit) {
            var newTasks = [
              { id: `${Math.floor(Math.random() * 1000)}`, content: values },
            ];
            newTasks.push(...columns.requested.items);
            console.log(newTasks);
            const newRequested = {
              ...columns.requested,
              items: newTasks,
            };
            setColumns({ ...columns, ...{ requested: newRequested } });
            console.log(columns);
          } else {
          }
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
          description={`Success`}
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
          label="Title"
          name="title"
          {...formLayout}
          rules={[{ required: true, message: "Please enter a title" }]}
          initialValue={current.title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[{ required: true, message: "Please enter a ownver" }]}
          initialValue={current.owner}
          {...formLayout}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please slect a priority" }]}
          initialValue={current.priority}
          {...formLayout}
        >
          <Select placeholder="Select from below">
            <SelectOption value={0}>Top</SelectOption>
            <SelectOption value={1}>Mid</SelectOption>
            <SelectOption value={2}>Low</SelectOption>
          </Select>
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Please select a department" }]}
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
        </Form.Item>
        <Form.Item
          {...formLayout}
          label="Description"
          name="description"
          initialValue={current.description}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    );
  };

  const modalFooter = done
    ? { footer: null, onCancel: handleDone }
    : {
        footer: [
          <Button type="text" danger onClick={handleDeleteClick}>
            Delete
          </Button>,
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ],
        onCancel: handleCancel,
      };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        {operations}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <Space
            direction="horizontal"
            size="middle"
            style={{ overflowX: "auto" }}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <h2>{column.name}</h2>
                  <div style={{ margin: 0 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "#91B0CE",
                              transition: "linear 0.3s",
                              padding: 15,
                              width: 270,
                              height: 500,
                              overflowY: "auto",
                              borderRadius: "10px",
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        onDoubleClick={() => {
                                          setvisible(true);
                                          console.log(item);
                                          setcurrent(item);
                                        }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 6,
                                          margin: "0 0 10px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "white"
                                            : "white",
                                          borderRadius: "10px",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Card task={item.content} />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </Space>
        </DragDropContext>
      </div>
      <Modal
        title={done ? null : `New Task`}
        className="standardListForm"
        width={640}
        // bodyStyle={state.done ? { padding: "72px 0" } : { padding: "28px 0 0" }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {deleteitem ? (
          <p style={{ color: "red" }}>
            Are you sure you want to delete this project? This action will be
            irreversible
          </p>
        ) : (
          getModalContent()
        )}
      </Modal>
    </div>
  );
}

export default Panel;
