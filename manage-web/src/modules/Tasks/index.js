import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Tabs } from "antd";
import Panel from "../../components/Panel";

const { TabPane } = Tabs;

function Tasks() {
  return (
    <div className="tasks">
      <Tabs>
        <TabPane
          tab={<span>Project 1</span>}
          key="1"
          style={{ overflow: "auto" }}
        >
          <Panel />
        </TabPane>
        <TabPane tab="Project 2" key="2">
          <Panel />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Tasks;
