'use client';

import { Form, Input, Button, Typography } from 'antd';
import { login } from '../../services/authFunctions/login';

type Props = {
    onSwitch: () => void;
    loginSuccessful: (token: string) => void;  // Nhận token từ callback
    loginError: (error: any) => void;
};

export const LoginForm = ({ onSwitch, loginSuccessful, loginError }: Props) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            console.log('Logging in:', values);
            const result = await login(values.username, values.password);
            console.log('Login successful:', result);

            loginSuccessful(result.token);  // Truyền token vào loginSuccessful

        } catch (error) {
            loginError(error);
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="space-y-6">
            <Typography.Title level={3} className="!mb-4 text-center">
                Login
            </Typography.Title>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input className="py-2" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password className="py-2" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="mt-2"
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <Button
                type="link"
                block
                className="text-center text-blue-600 hover:underline"
                onClick={onSwitch}
            >
                Create a new account
            </Button>
        </div>
    );
};
