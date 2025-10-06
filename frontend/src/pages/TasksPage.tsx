import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { getTasks, createTask, markTaskAsCompleted } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import SmallSpinner from '../components/SmallSpinner';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [taskStatus, setTaskStatus] = useState<{ [key: number]: boolean }>({});
    const { logout } = useAuth();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to fetch tasks. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async (e: FormEvent) => {
        e.preventDefault();
        if (!title) {
            setError('Title is required.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            const newTask = await createTask(title, description);
            setTasks([newTask, ...tasks].slice(0, 5));
            setTitle('');
            setDescription('');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to create task.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDone = async (id: number) => {
        setTaskStatus((prev) => ({ ...prev, [id]: true }));
        try {
            await markTaskAsCompleted(id);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to update task.');
            }
        } finally {
            setTaskStatus((prev) => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Task Manager</h1>
                    <button onClick={logout} className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </header>
            <main className="container mx-auto p-4 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Add Task Form */}
                    <div className="md:col-span-1">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Add a Task</h2>
                            {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
                            <form onSubmit={handleAddTask}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex justify-center items-center" disabled={isSubmitting}>
                                    {isSubmitting ? <SmallSpinner /> : 'Add'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="md:col-span-2">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div className="space-y-4">
                                {tasks.map((task) => (
                                    <div key={task.id} className={`p-4 rounded-lg shadow flex justify-between items-center bg-gray-200`}>
                                        <div>
                                            <h3 className={`font-bold`}>{task.title}</h3>
                                            <p className={`text-sm text-gray-600`}>{task.description}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDone(task.id)} 
                                            className="px-4 py-1 text-sm border border-gray-400 rounded-md bg-white flex items-center"
                                            disabled={taskStatus[task.id]}
                                        >
                                            {taskStatus[task.id] ? <SmallSpinner /> : 'Done'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TasksPage;