export interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: string;
}

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
    };

    return (
        <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-gray-600 mt-1 text-sm line-clamp-2">{task.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
                    {task.status}
                </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-400 text-xs">
                    {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
