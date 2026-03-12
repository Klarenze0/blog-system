import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { Post } from '@/types';
import { Calendar, User } from 'lucide-react';

interface Props {
    posts: Post[];
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

export default function FeedIndex({ posts }: Props) {
    return (
        <GuestLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 mb-2">Latest Posts</h1>
                <p className="text-zinc-500">Read the latest from our community.</p>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-16 text-zinc-400">
                    <p className="text-lg">No posts yet.</p>
                    <p className="text-sm mt-1">Be the first to write something!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {posts.map(post => (
                        <Link key={post.id} href={`/posts/${post.id}`}>
                            <article className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-zinc-400 hover:shadow-sm transition-all cursor-pointer">
                                {/* Image */}
                                {post.image_path && (
                                    <img
                                        src={`/storage/${post.image_path}`}
                                        alt={post.title}
                                        className="w-full h-52 object-cover"
                                    />
                                )}

                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-zinc-900 mb-2 hover:text-zinc-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-zinc-500 text-sm line-clamp-3 mb-4">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                                        <span className="flex items-center gap-1">
                                            <User size={11} />
                                            {post.user?.name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={11} />
                                            {formatDate(post.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </GuestLayout>
    );
}