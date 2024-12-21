import React from 'react';
import { useNavigate } from 'react-router-dom';
import  {Col, Form, Row} from "antd";
import { Input } from 'antd';
import { loginUser } from '../../apicalls/users';

function Login() {

    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            const response = await loginUser(values);
            if(response.success){
                alert(response.message);
                localStorage.setItem('token', response.data);
                window.location.href = '/';
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div className='bg-primary flex items-center justify-center h-screen'>
            <div  className='card w-400 p-2'>
                <div className='flex justify-between items-center'>         
                    <h1 className='text-2xl'>
                            DIGI-WALLET LOGIN
                    </h1>
                    
                </div>
                <hr />
                <Form layout='vertical' onFinish={onFinish} >
                        <Row gutter={16}>  

                                <Col span={24}>
                                        <Form.Item label='Email' name="email">
                                                <Input type='email' />
                                        </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item label='Password' name="password">
                                        <Input type='password' />
                                    </Form.Item>
                                </Col>



                        </Row>
                        <div>
                                <button className='primary-contained-btn w-100' type='submit'>
                                        LOGIN
                                </button>
                                <h1 className='text-sm underline' onClick={() => navigate('/register')}>
                                    Don't have an account? Register here
                                </h1>
                        </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;  