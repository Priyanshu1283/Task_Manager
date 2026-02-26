"use client";

import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import TaskCard, { Task } from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Pagination, Filter, Search State
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        try {
            const userRes: any = await api.get('/auth/me');
            setUser(userRes.data);

            const params = new URLSearchParams({
                page: page.toString(),
                limit: '6',
                ...(status && { status }),
                ...(search && { search })
            });

            const tasksRes: any = await api.get(`/tasks?${params.toString()}`);
            setTasks(tasksRes.data.tasks);
            setTotalPages(tasksRes.data.totalPages);
        } catch (err) {
            console.error('Fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, status, search]);

    const handleCreateOrUpdate = async (data: Partial<Task>) => {
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask._id}`, data);
            } else {
                await api.post('/tasks', data);
            }
            setShowModal(false);
            setEditingTask(null);
            fetchData();
        } catch (err) {
            console.error('Save error', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchData();
        } catch (err) {
            console.error('Delete error', err);
        }
    };

    if (loading && !user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-zinc-800">
            <Navbar user={user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold">Your Tasks</h1>
                    <button
                        onClick={() => { setEditingTask(null); setShowModal(true); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                        + Create Task
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <select
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Task List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={(t) => { setEditingTask(t); setShowModal(true); }}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No tasks found. Create your first task!
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-4 py-2 rounded-md ${page === p ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </main>

            {showModal && (
                <TaskModal
                    task={editingTask}
                    onClose={() => { setShowModal(false); setEditingTask(null); }}
                    onSubmit={handleCreateOrUpdate}
                />
            )}
        </div>
    );
}
