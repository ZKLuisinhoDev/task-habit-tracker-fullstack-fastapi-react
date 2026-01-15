import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckSquare } from 'lucide-react';

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append('username', data.email);
            formData.append('password', data.password);
            
            const response = await api.post('/auth/login', formData);
            login(response.data.access_token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-md animate-slide-up">
                <div className="flex flex-col items-center mb-8">
                    <CheckSquare className="w-12 h-12 text-primary mb-2" />
                    <h2 className="text-2xl font-bold">Welcome Back</h2>
                    <p className="text-secondary">Sign in to manage your tasks</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input 
                            {...register('email', { required: 'Email is required' })} 
                            type="email"
                            className="input-field" 
                        />
                        {errors.email && <span className="text-red-400 text-xs">{errors.email.message as string}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input 
                            {...register('password', { required: 'Password is required' })} 
                            type="password"
                            className="input-field" 
                        />
                        {errors.password && <span className="text-red-400 text-xs">{errors.password.message as string}</span>}
                    </div>

                    <button type="submit" className="w-full btn-primary mt-2">
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-indigo-400">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
