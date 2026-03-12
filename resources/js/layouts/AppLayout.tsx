import { PropsWithChildren } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { PenLine, LogOut, LayoutDashboard } from 'lucide-react';

interface Props extends PropsWithChildren {
    title?: string;
}

export default function AppLayout({ children, title }: Props) {
    const { auth, flash } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Nav */}
            <nav className="bg-white border-b border-zinc-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="text-lg font-bold text-zinc-900 tracking-tight">
                        BlogSystem
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link href="/posts">
                            <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                                <LayoutDashboard size={13} />
                                My Posts
                            </Button>
                        </Link>
                        <span className="text-xs text-zinc-400">{auth.user?.name}</span>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1.5 text-xs text-zinc-500 hover:text-red-600"
                            onClick={() => router.post('/logout')}
                        >
                            <LogOut size={13} />
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Flash Messages */}
            <div className="max-w-4xl mx-auto px-4 pt-4">
                {flash?.success && (
                    <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
                        {flash.error}
                    </div>
                )}
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-6">
                {title && (
                    <h1 className="text-xl font-bold text-zinc-900 mb-6">{title}</h1>
                )}
                {children}
            </main>
        </div>
    );
}