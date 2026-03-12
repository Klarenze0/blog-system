import AppLayout from '@/layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { Post } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';

interface Props {
    posts: Post[];
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}

export default function PostsIndex({ posts }: Props) {

    function handleDelete(id: number, title: string) {
        if (confirm(`Delete "${title}"? This cannot be undone.`)) {
            router.delete(`/posts/${id}`);
        }
    }

    return (
        <AppLayout title="My Posts">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-zinc-500">
                    {posts.length} post{posts.length !== 1 ? 's' : ''}
                </p>
                <Link href="/posts/create">
                    <Button size="sm" className="gap-1.5 text-xs bg-zinc-900 text-white hover:bg-zinc-700">
                        <Plus size={13} />
                        New Post
                    </Button>
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-zinc-300 rounded-xl">
                    <p className="text-zinc-400 mb-3">You haven't written anything yet.</p>
                    <Link href="/posts/create">
                        <Button size="sm" className="gap-1.5 text-xs">
                            <Plus size={13} />
                            Write your first post
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {posts.map(post => (
                        <div key={post.id}
                            className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center gap-4">

                            {/* Thumbnail */}
                            {post.image_path ? (
                                <img
                                    src={`/storage/${post.image_path}`}
                                    alt={post.title}
                                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Image size={20} className="text-zinc-300" />
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-zinc-900 truncate">{post.title}</p>
                                <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{post.content}</p>
                                <p className="text-[11px] text-zinc-300 mt-1">{formatDate(post.created_at)}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <Link href={`/posts/${post.id}/edit`}>
                                    <Button size="sm" variant="outline"
                                        className="h-7 text-[11px] gap-1">
                                        <Pencil size={10} />
                                        Edit
                                    </Button>
                                </Link>
                                <Button size="sm" variant="outline"
                                    className="h-7 text-[11px] gap-1 text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => handleDelete(post.id, post.title)}>
                                    <Trash2 size={10} />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}