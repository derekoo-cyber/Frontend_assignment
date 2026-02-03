import { useEffect, useState } from 'react';
import { noteService } from '../services/noteService';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, LogOut, Search, Edit3, FileText, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Dashboard = () => {
    const { logout } = useAuth();
    const [notes, setNotes] = useState([]);
    const [profile, setProfile] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [createLoading, setCreateLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, notesRes] = await Promise.all([
                noteService.getProfile(),
                noteService.getAll()
            ]);
            setProfile(profileRes.data);
            setNotes(notesRes.data);
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            const res = await noteService.create(newNote);
            setNotes([...notes, res.data]);
            setNewNote({ title: '', content: '' }); // Reset form
        } catch (err) {
            alert("Failed to create note");
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this note?")) return;
        try {
            await noteService.delete(id);
            setNotes(notes.filter(n => n.id !== id));
        } catch (err) {
            alert("Delete failed");
        }
    };

    // Requirement: Search + Filter UI
    const filteredNotes = notes.filter(n =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Welcome, {profile?.email}</h1>
                        <p className="text-slate-500">Manage your notes securely</p>
                    </div>
                    <Button variant="ghost" onClick={logout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut size={18} className="mr-2" /> Logout
                    </Button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Note Section */}
                    <div className="lg:col-span-1">
                        <Card title="New Note" className="sticky top-8">
                            <form onSubmit={handleAddNote} className="space-y-4">
                                <Input
                                    placeholder="Note Title"
                                    value={newNote.title}
                                    onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none h-40 text-slate-700 placeholder:text-slate-400"
                                    placeholder="Write your thoughts..."
                                    value={newNote.content}
                                    onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                                    required
                                />
                                <Button loading={createLoading} className="w-full">
                                    <Plus size={18} className="mr-2" /> Add Note
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Notes List Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Search your notes..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map(note => (
                                    <div key={note.id} className="group bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-lg text-slate-800 line-clamp-1">{note.title}</h3>
                                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                                    <FileText size={16} />
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm line-clamp-3 mb-4">{note.content}</p>
                                        </div>
                                        <div className="flex justify-end pt-4 border-t border-slate-50">
                                            <button
                                                onClick={() => handleDelete(note.id)}
                                                className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                title="Delete note"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <p>No notes found matching your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;