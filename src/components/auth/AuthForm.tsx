'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export const AuthForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const registerSuccessful = () => {
        messageApi.open({
            type: 'success',
            content: 'Registration successful!',
        });
    };

    const registerError = (error: any) => {
        messageApi.open({
            type: 'error',
            duration: 3,
            content: `Registration failed: ${error.message}`,
        });
    };

    const router = useRouter();
    const loginSuccessful = () => {
        messageApi.open({
            type: 'success',
            content: 'Login successful!',
        });

        router.push('/dashboard');
    };

    const loginError = (error: any) => {
        messageApi.open({
            type: 'error',
            duration: 3,
            content: `Login failed: ${error.message}`,
        });
    };

    return (
        <div className="w-full max-w-xl mx-auto p-10 bg-white rounded-2xl shadow-lg">
            {contextHolder}
            {isRegistering ? (
                <RegisterForm
                    onSwitch={() => setIsRegistering(false)}
                    registerSuccessful={registerSuccessful}
                    registerError={registerError}
                />
            ) : (
                <LoginForm
                    onSwitch={() => setIsRegistering(true)}
                    loginSuccessful={loginSuccessful}
                    loginError={loginError}
                />
            )}
        </div>
    );
};
