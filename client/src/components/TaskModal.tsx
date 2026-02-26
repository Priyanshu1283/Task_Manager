"use client";

import { useState } from 'react';
import { Task } from './TaskCard';

interface TaskModalProps {
    task?: Task | null;
    onClose: () => void;
    onSubmit: (data: Partial<Task>) => void;
}

export default function TaskModal({ task, onClose, onSubmit }: TaskModalProps) {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'pending');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, status });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Create Task'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-black">Title</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 text-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 text-black"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Status</label>
                        <select
                            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 text-black"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            {task ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
