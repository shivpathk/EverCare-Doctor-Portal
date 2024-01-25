import React  from "react";
import "./Authentication.css";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const { Option } = Select;

function Register () {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/register',values);
      dispatch(hideLoading())
      if(response.data.success){
        toast.success(response.data.message)
        navigate("/login")
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      toast.error("Something went wrong")
      
    }
  };

  return (


    <div className="authentication">
      <div className="authentication-form card">
        <h1 className="card-title text-center">Registration</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter Your Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          {/* <Form.Item label="Phone Number" name="number">
            <Input placeholder="Your Phone Number" />
          </Form.Item> */}
          <Form.Item name="gender" label="Gender">
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <span className="normal-text">
            Already Registered ?{" "}
            <Link className="anchor" to="/login">
              CLICK HERE TO LOGIN
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Register;
