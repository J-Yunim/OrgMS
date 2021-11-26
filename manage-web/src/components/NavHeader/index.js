import React, { useState } from "react";
import { Badge, Dropdown, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

import "./index.css";
import { useSelector } from "react-redux";

const { Header } = Layout;

const NotificationRow = () => {
  <div className="notificationrow">
    <div className="icon">
      <CheckCircleFilled />
    </div>
    <div className="content">
      <div className="content-desc">Your request has been approved</div>
      <div className="content-time">4 years ago</div>
    </div>
  </div>;
};

const menu = (
  <Menu>
    <Menu.Item key="0" icon={<CheckCircleFilled />}>
      Your request has been approved
    </Menu.Item>
    <Menu.Divider />

    <Menu.Item key="1" icon={<CheckCircleFilled />}>
      Your request has been approved
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1000">Clear Notification</Menu.Item>
  </Menu>
);

const NavHeader = ({ collapsed, toggle }) => {
  const user = useSelector((state) => state.user);
  const { username } = user;

  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, display: "flex", justifyContent: "space-between" }}
    >
      <div className="trigger" onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="header-right">
        <div className="notification">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Badge count={2}>
              <BellOutlined />
            </Badge>
          </Dropdown>
        </div>
        <div className="profile">
          <div className="">{username}</div>
        </div>
      </div>
    </Header>
  );
};

export default NavHeader;
