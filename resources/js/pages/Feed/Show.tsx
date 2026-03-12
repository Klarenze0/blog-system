import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { Post } from '@/types';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    post: Post;
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

export default function FeedShow({ post }: Props) {
    return (
        <GuestLayout>
            <div className="max-w-2xl mx-auto">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-zinc-500 mb-6 -ml-2">
                        <ArrowLeft size={13} />
                        Back to Feed
                    </Button>
                </Link>

                {post.image_path && (
                    <img
                        src={`/storage/${post.image_path}`}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-xl mb-6"
                    />
                )}

                <h1 className="text-3xl font-bold text-zinc-900 mb-4">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-zinc-400 mb-8 pb-6 border-b border-zinc-100">
                    <span className="flex items-center gap-1.5">
                        <User size={13} />
                        {post.user?.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {formatDate(post.created_at)}
                    </span>
                </div>

                <div className="prose prose-zinc max-w-none">
                    <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}