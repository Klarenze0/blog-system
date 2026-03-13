import AdminLayout from '@/layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Trash2, Image, ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Post } from '@/types';

interface Props {
    posts: Post[];
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}

export default function AdminPostsIndex({ posts }: Props) {

    function handleDelete(id: number, title: string) {
        if (confirm(`Delete "${title}"?`)) {
            router.delete(`/admin/posts/${id}`);
        }
    }

    return (
        <AdminLayout title="All Posts">
            <div className="mb-4 text-xs text-zinc-500">
                {posts.length} total post{posts.length !== 1 ? 's' : ''}
            </div>

            <div className="border border-zinc-800 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                            <th className="text-left px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Post</th>
                            <th className="text-left px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Author</th>
                            <th className="text-left px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Date</th>
                            <th className="text-right px-4 py-3 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-zinc-600">
                                    No posts yet.
                                </td>
                            </tr>
                        ) : posts.map(post => (
                            <tr key={post.id} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        {post.image_path ? (
                                            <img src={`/storage/${post.image_path}`}
                                                className="w-10 h-10 object-cover rounded shrink-0" />
                                        ) : (
                                            <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center shrink-0">
                                                <Image size={14} className="text-zinc-600" />
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-medium text-zinc-200 truncate max-w-xs">{post.title}</p>
                                            <p className="text-zinc-500 truncate max-w-xs text-[10px]">{post.content}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-zinc-400">{post.user?.name}</td>
                                <td className="px-4 py-3 text-zinc-500 font-mono">{formatDate(post.created_at)}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-1.5 justify-end">
                                        <Link href={`/post/${post.id}`} target="_blank">
                                            <Button size="sm" variant="outline"
                                                className="h-6 text-[10px] border-zinc-700 text-zinc-400 hover:text-white gap-1">
                                                <ExternalLink size={9} />
                                                View
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="outline"
                                            className="h-6 text-[10px] border-red-900 text-red-400 hover:bg-red-900/30 gap-1"
                                            onClick={() => handleDelete(post.id, post.title)}>
                                            <Trash2 size={9} />
                                            Delete
                                        </Button>
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