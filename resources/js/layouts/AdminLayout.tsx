import { PropsWithChildren } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { FileText, Users, LogOut, Globe } from 'lucide-react';

interface Props extends PropsWithChildren {
    title?: string;
}

export default function AdminLayout({ children, title }: Props) {
    const { auth, flash } = usePage<PageProps>().props;

    const navItems = [
        { href: '/admin/posts', label: 'Posts', icon: FileText },
        { href: '/admin/users', label: 'Users', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-52 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
                <div className="px-5 py-5 border-b border-zinc-800">
                    <span className="text-sm font-bold tracking-tight font-mono">
                        ADMIN
                    </span>
                </div>

                <nav className="flex-1 p-3 space-y-0.5">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive = window.location.pathname.startsWith(href);
                        return (
                            <Link key={href} href={href}>
                                <button className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                                    isActive
                                        ? 'bg-white text-zinc-900'
                                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}>
                                    <Icon size={14} />
                                    {label}
                                </button>
                            </Link>
                        );
                    })}

                    <Link href="/">
                        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                            <Globe size={14} />
                            View Feed
                        </button>
                    </Link>
                </nav>

                <div className="p-3 border-t border-zinc-800">
                    <div className="px-3 py-2 mb-1">
                        <p className="text-xs font-medium text-zinc-300 truncate">{auth.user?.name}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{auth.user?.email}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/30 text-xs h-8"
                        onClick={() => router.post('/logout')}
                    >
                        <LogOut size={12} />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
                    <h1 className="text-sm font-semibold text-white">{title}</h1>
                </header>

                {/* Flash */}
                <div className="px-6 pt-4">
                    {flash?.success && (
                        <div className="mb-4 text-sm text-emerald-400 bg-emerald-900/20 border border-emerald-800 px-4 py-3 rounded-lg">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-800 px-4 py-3 rounded-lg">
                            {flash.error}
                        </div>
                    )}
                </div>

                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}