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
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

function Login() {
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const dispatch = useDispatch();

  async function onFinish(values) {
    setloading(true);
    const response = await dispatch.user.loginUser({
      username: values.username,
      password: values.password,
    });
    console.log(response);
    if (response === 1) {
      window.alert("Login Failed");
    } else {
      setsuccess(true);
    }
    setloading(false);
  }

  const onFinishFailed = (errorInfo) => {
    setloading(false);
  };
  return success ? (
    <Redirect to="/" />
  ) : (
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
                loading={loading}
                style={{ width: "100%", height: 40, fontSize: 16 }}
              >
                Log in
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
                <a className="signuplink" href="/register">
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
