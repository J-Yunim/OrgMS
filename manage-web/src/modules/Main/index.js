import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { Layout, Menu, Badge, Popover } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Members from "../Members";
import Tasks from "../Tasks";
import Finance from "../Finance";
import NavHeader from "../../components/NavHeader";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";

const { Sider, Content } = Layout;

const userid = Cookies.get("userid");

function Main() {
  const [collapsed, setcollapsed] = useState(false);
  const [menuItem, setmenuItem] = useState(1);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggle = () => setcollapsed(!collapsed);

  const Contents = [<Members />, <Tasks />, <Finance />];

  async function getUser() {
    return await dispatch.user.getUser();
  }

  return !userid ? (
    <Redirect to={"/login"} />
  ) : (
    <div className="main">
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
          <NavHeader collapsed={collapsed} toggle={toggle} />
          <Content>{Contents[menuItem]}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Main;
