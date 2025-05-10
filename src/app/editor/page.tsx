import EditorTasks, { Task } from '@/components/editorFunctions/EditorTasks';

// Mock data
const mockTasks: Task[] = [
    {
        id: '1',
        name: 'Review Article Draft',
        date: '2025-05-01',
        deadline: '2025-05-10',
        instruction: 'Please review the draft for grammar and style.',
        inputUrl: 'https://drive.example.com/article-draft',
        status: 'pending',
    },
    {
        id: '2',
        name: 'Edit Design Specs',
        date: '2025-05-03',
        deadline: '2025-05-12',
        instruction: 'Update the design document with latest feedback.',
        inputUrl: 'https://dropbox.example.com/design-specs',
        status: 'in_progress',
    },
];

export default function EditorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
            <div className="w-full max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Your Tasks</h1>
                <EditorTasks tasks={mockTasks} />
            </div>
        </main>
    );
}
