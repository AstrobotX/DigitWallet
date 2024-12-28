import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, message, Row } from "antd";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <div className="card w-400">
          <div className="flex bg-primary items-center justify-center brt-5 p-1">
            <h1 className="text-2xl bold text-secondary cursor-default">D I G I W A L L E T</h1>
          </div>
        {/* <hr /> */}
        <div className="p-2">

          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Email" name="email">
                  <input type="text" className="form-field" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Password" name="password">
                  <input type="password" className="form-field"/>
                </Form.Item>
              </Col>
            </Row>

            <button className="primary-contained-btn w-100" type="submit">
              Login
            </button>
            <h1
              className="text-sm underline mt-2"
              onClick={() => navigate("/register")}
            >
              Not a member , Click Here To Register
            </h1>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
