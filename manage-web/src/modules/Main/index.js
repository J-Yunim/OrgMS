import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Members from "../Members";
import Tasks from "../Tasks";
import Finance from "../Finance";

import "./index.css";

const { Header, Sider, Content } = Layout;

function Main() {
  // parse url and see if login
  const route = new URL(window.location.href).pathname.split("/")[1];
  const [collapsed, setcollapsed] = useState(false);
  const [menuItem, setmenuItem] = useState(1);

  const toggle = () => setcollapsed(!collapsed);

  const Contents = [<Members />, <Tasks />, <Finance />];

  return (
    <div className="main">
      {/* <Redirect to={"/login"} /> */}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onSelect={(item) => setmenuItem(item.key)}
          >
            <Menu.Item key="0" icon={<UserOutlined />}>
              Members
            </Menu.Item>
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              Tasks
            </Menu.Item>
            <Menu.Item key="2" icon={<UploadOutlined />}>
              Finance
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="trigger" onClick={toggle}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </Header>
          <Content>{Contents[menuItem]}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Main;
