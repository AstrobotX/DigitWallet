import React from 'react';
import { useNavigate } from 'react-router-dom';
import  {Col, Form, message, Row} from "antd";
import { Input } from 'antd';
import { Select } from "antd";
import { registerUser } from '../../apicalls/users';
function Register() {
const navigate = useNavigate();
const onFinish = async(values) => {
        try {
                const response = await registerUser(values);
                if(response.success){
                        message.success(response.message);
                        navigate('/login');
                } else {
                        alert(response.message);
                }
        } catch (error) {
                alert(error.message);
        }
}

return (
    <div className='m-5 p-3'>
        <div className='flex justify-between items-center'>         
            <h1 className='text-2xl'>
                    REGISTER
            </h1>
            <h1 className='text-sm underline' onClick={() => navigate('/login')}>
                    Already have an account? Login here
            </h1>
        </div>
            <hr />
            <Form layout='vertical' onFinish={onFinish}>
                    <Row gutter={16}>  
                            <Col span={6}>
                                    <Form.Item label='First Name' name="firstName">
                                            <Input type='text' />
                                    </Form.Item>
                            </Col>
                            <Col span={6}>
                                    <Form.Item label='Last Name' name="lastName">
                                            <Input type='text' />
                                    </Form.Item>
                            </Col>
                            <Col span={6}>
                                    <Form.Item label='Email' name="email">
                                            <Input type='email' />
                                    </Form.Item>
                            </Col>
                            <Col span={6}>
                                    <Form.Item label='Phone Number' name="phoneNumber">
                                            <Input type='text' />
                                    </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label='Identification Type' name="identificationType">
                                    <Select placeholder='Select Identification Type'>
                                        <option value='aadhar Card'>Aadhar Card</option>
                                        <option value='passport'>Passport</option>
                                        <option value='driversLicense'>Driver's License</option>
                                        <option value='voterId'>Voter ID</option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label='Identification Number' name="identificationNumber">
                                    <Input type='text' />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label='Address' name="address">
                                    <Input type='text' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Password' name="password">
                                    <Input type='password' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Confirm Password' name="confirmPassword">
                                    <Input type='password' />
                                </Form.Item>
                            </Col>


                    </Row>
                    <div className='flex justify-end'>
                            <button className='primary-contained-btn' type='submit'>
                                    REGISTER
                            </button>
                    </div>
            </Form>
    </div>
);
}

export default Register;  