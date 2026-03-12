import AdminLayout from '@/layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, User } from 'lucide-react';

interface UserRow {
    id:          number;
    name:        string;
    email:       string;
    role:        string;
    posts_count: number;
    created_at:  string;
}

interface Props {
    users: UserRow[];
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}

export default function AdminUsersIndex({ users }: Props) {

    function handleDelete(id: number, name: string) {
        if (confirm(`Delete "${name}"? This will also delete all their posts.`)) {
            router.delete(`/admin/users/${id}`);
        }
    }

    return (
        <AdminLayout title="Users">
            <div className="mb-4 text-xs text-zinc-500">
                {users.length} total user{users.length !== 1 ? 's' : ''}
            </div>

            <div className="border border-zinc-800 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                            <th className="text-left px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">User</th>
                            <th className="text-left px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Role</th>
                            <th className="text-left px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Posts</th>
                            <th className="text-left px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Joined</th>
                            <th className="text-right px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                                            <User size={12} className="text-zinc-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-200">{user.name}</p>
                                            <p className="text-zinc-500 text-[10px]">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <Badge className={`text-[9px] ${
                                        user.role === 'admin'
                                            ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                                    }`}>
                                        {user.role}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3 text-zinc-400 font-mono">
                                    {user.posts_count}
                                </td>
                                <td className="px-4 py-3 text-zinc-500 font-mono">
                                    {formatDate(user.created_at)}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end">
                                        {user.role !== 'admin' && (
                                            <Button size="sm" variant="outline"
                                                className="h-6 text-[10px] border-red-900 text-red-400 hover:bg-red-900/30 gap-1"
                                                onClick={() => handleDelete(user.id, user.name)}>
                                                <Trash2 size={9} />
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}