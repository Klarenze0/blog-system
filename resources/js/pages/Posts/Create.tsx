import AppLayout from '@/layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormEvent, useRef } from 'react';
import { Image, X } from 'lucide-react';
import { useState } from 'react';

export default function PostCreate() {
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        title:   '',
        content: '',
        image:   null as File | null,
    });

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    function removeImage() {
        setData('image', null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = '';
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post('/posts', {
            forceFormData: true, // kailangan para sa file upload
        });
    }

    return (
        <AppLayout title="New Post">
            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-sm font-medium text-zinc-700">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="Enter post title..."
                            className="border-zinc-200 text-black"
                        />
                        {errors.title && (
                            <p className="text-xs text-red-500">{errors.title}</p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                        <Label htmlFor="content" className="text-sm font-medium text-zinc-700">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            placeholder="Write your post content..."
                            rows={8}
                            className="border-zinc-200 resize-none  text-black"
                        />
                        {errors.content && (
                            <p className="text-xs text-red-500">{errors.content}</p>
                        )}
                    </div>

                    {/* Image */}
                    <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-zinc-700">
                            Image <span className="text-zinc-400 font-normal">(optional)</span>
                        </Label>

                        {preview ? (
                            <div className="relative inline-block">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full max-h-52 object-cover rounded-lg border border-zinc-200"
                                />
                                <button type="button" onClick={removeImage}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow border border-zinc-200 hover:bg-red-50">
                                    <X size={12} className="text-red-500" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-200 rounded-lg cursor-pointer hover:border-zinc-400 transition-colors">
                                <Image size={24} className="text-zinc-300 mb-2" />
                                <span className="text-xs text-zinc-400">Click to upload image</span>
                                <span className="text-[11px] text-zinc-300 mt-0.5">JPG, PNG, WEBP — max 2MB</span>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                        {errors.image && (
                            <p className="text-xs text-red-500">{errors.image}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-2 pt-2">
                        <Button type="submit" disabled={processing}
                            className="bg-zinc-900 text-white hover:bg-zinc-700">
                            {processing ? 'Publishing...' : 'Publish Post'}
                        </Button>
                        <Button type="button" variant="outline"
                            onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}