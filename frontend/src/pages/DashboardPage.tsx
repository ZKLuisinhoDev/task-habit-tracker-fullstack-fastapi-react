import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { Task } from '../types';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, CheckCircle, Circle, X } from 'lucide-react';
import clsx from 'clsx';

const DashboardPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm();
    const [isCreating, setIsCreating] = useState(false);

    const fetchTasks = async () => {
        try {
            const endpoint = filter === 'all' ? '/tasks/' : `/tasks/?status=${filter}`;
            const res = await api.get(endpoint);
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    const createTask = async (data: any) => {
        try {
            const res = await api.post('/tasks/', data);
            setTasks([...tasks, res.data]);
            reset();
            setIsCreating(false);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleStatus = async (task: Task) => {
        try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            const res = await api.put(`/tasks/${task.id}`, { status: newStatus });
            
            // Optimistic update or refetch. Let's update local state
            setTasks(tasks.map(t => t.id === task.id ? res.data : t));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
           console.error(err);
        }
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'all') return true;
        return t.status === filter;
    });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold">My Tasks</h1>
                <button 
                    onClick={() => setIsCreating(true)} 
                    className="btn-primary flex items-center space-x-2"
                >
                    <Plus size={20} />
                    <span>New Task</span>
                </button>
            </div>

            {/* Create Task Form (Inline) */}
            {isCreating && (
                <div className="glass-panel p-6 rounded-xl mb-8 animate-slide-up">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold">Create New Task</h3>
                        <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white"><X /></button>
                    </div>
                    <form onSubmit={handleSubmit(createTask)} className="space-y-4">
                        <input {...register('title', { required: true })} placeholder="Task title..." className="input-field" autoFocus />
                        <textarea {...register('description')} placeholder="Description (optional)" className="input-field min-h-[80px]" />
                        <div className="flex justify-end space-x-2">
                             <button type="button" onClick={() => setIsCreating(false)} className="btn-secondary">Cancel</button>
                             <button type="submit" className="btn-primary">Save Task</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                {['all', 'pending', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={clsx(
                            "px-4 py-2 rounded-full capitalize text-sm font-medium transition-all",
                            filter === f ? "bg-primary text-white shadow-lg shadow-indigo-500/25" : "bg-surface text-slate-400 hover:text-white"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Task List */}
            {isLoading ? (
                <div className="text-center py-20 text-slate-500">Loading tasks...</div>
            ) : filteredTasks.length === 0 ? (
                <div className="text-center py-20 glass-panel rounded-xl border-dashed border-2 border-slate-700">
                    <p className="text-slate-400">No tasks found. Create one to get started!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="glass-panel p-4 rounded-xl flex items-center justify-between group transition-all hover:border-primary/30">
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={() => toggleStatus(task)}
                                    className={clsx(
                                        "transition-colors",
                                        task.status === 'completed' ? "text-emerald-400" : "text-slate-500 hover:text-primary"
                                    )}
                                >
                                    {task.status === 'completed' ? <CheckCircle size={24} /> : <Circle size={24} />}
                                </button>
                                <div>
                                    <h3 className={clsx("font-medium text-lg", task.status === 'completed' && "text-slate-500 line-through")}>{task.title}</h3>
                                    {task.description && <p className="text-slate-400 text-sm">{task.description}</p>}
                                </div>
                            </div>
                            <button 
                                onClick={() => deleteTask(task.id)}
                                className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
