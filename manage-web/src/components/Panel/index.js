import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Space } from "antd";
import Card from "../Card";

const itemsFromBackend = [
  { id: "1111", content: <Card /> },
  { id: "1112", content: <Card /> },
  { id: "1113", content: <Card /> },
  { id: "1114", content: <Card /> },
  { id: "1115", content: <Card /> },
];

const columnsFromBackend = {
  11: {
    name: "Requested",
    items: itemsFromBackend,
  },
  12: {
    name: "To do",
    items: [],
  },
  13: {
    name: "In Progress",
    items: [],
  },
  14: {
    name: "Done",
    items: [],
  },
};

function Panel() {
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

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
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
                              : "#DDC290",
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
                                      onDoubleClick={() =>
                                        window.alert("Double clicked!")
                                      }
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
                                      {item.content}
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
  );
}

export default Panel;
