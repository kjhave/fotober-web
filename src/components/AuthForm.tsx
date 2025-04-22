'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className="w-full max-w-xl mx-auto p-10 bg-white rounded-2xl shadow-lg">
            {isRegistering ? (
                <RegisterForm onSwitch={() => setIsRegistering(false)} />
            ) : (
                <LoginForm onSwitch={() => setIsRegistering(true)} />
            )}
        </div>
    );
};
