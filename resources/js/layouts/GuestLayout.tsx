import { Button } from '@/components/ui/button';
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { PenLine } from 'lucide-react';
import React, { PropsWithChildren } from 'react'

export default function GuesLayout({children}: PropsWithChildren){
  const {auth} = usePage<PageProps>().props;
  
    return (
        <div className='min-h-screen bg-zinc-50'>
            {/* nav */}
            <nav className='bg-white border-b border-zinc-200 sticky top-0 z-10'>
                <div className='max-w-4xl mx-auto px-4 py-3 flex items-center justify-between'>
                    <Link href="/" className='text-lg font-bold text-zinc-900 tracking-tight'>
                        Blogsystem
                    </Link>

                    <div className='flex items-center gap-2'>
                        {auth.user ? (
                            <>
                                <Link href="/posts">
                                    <Button size="sm" variant="ghost" className='gap-1.5 text-xs text-black'>
                                        <PenLine size={13}/>
                                        My Posts
                                    </Button>
                                </Link>
                                {auth.user.role === 'admin' && (
                                    <Link href="/admin/posts">
                                        <Button size="sm" variant="outline" className='text-xs text-black'>
                                            Admin
                                        </Button>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button size="sm" variant="ghost" className='text-xs text-black border-zinc-700'>
                                        Login
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className='max-w-4xl mx-auto px-4 py-8'>
                    {children}
            </main>
        </div>
    )
}



