import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import "./index.css";

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-background">
      <div className="login">
        <div className="login-info">
          <h1>Org-MS</h1>
          <p>Keep track of your members, tasks, and timelines</p>
        </div>
        <div className="login-page">
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined style={{ color: "grey" }} />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined style={{ color: "grey" }} />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <div className="extra">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot your password?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={true}
                style={{ width: "100%", height: 40, fontSize: 16 }}
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item name="signin">
              <div className="signup">
                <Form.Item>
                  <div className="signin">
                    <p>Sign in with</p>
                    <a href="">
                      <GoogleOutlined
                        style={{ color: "lightgray", fontSize: 22 }}
                      />
                    </a>
                  </div>
                </Form.Item>
                <a className="signuplink" href="">
                  Sign Up
                </a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
