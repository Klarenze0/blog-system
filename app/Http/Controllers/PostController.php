<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StorePostRequest;
use App\Http\Requests\User\UpdatePostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        private readonly PostService $postService,
    ){}

    // pakita posts ng naka log in na user
    public function index(): Response {
        return Inertia::render('Posts/Index', [
            'posts' => $this->postService->getUserPosts(auth()->user()),
        ]);
    }

    // pakita yung form pag gagawa ng bagong post
    public function create(): Response {
        return Inertia::render('Posts/Create');
    }

    // isave sa db yung post 
    public function store(StorePostRequest $request): RedirectResponse {
        $this->postService->create(auth()->user(), $request->validated());

        return redirect()
            ->route('posts.index')
            ->with('success', 'Post created successfully.');
    }

    // pakita yung edit form, gamitin yung policy para macheck if may karapatan ba yung user na mag edit
    public function edit(Post $post): Response {
        $this->authorize('update', $post);

        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    // update post sa db
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse {
        $this->authorize('update', $post);

        $this->postService->update($post, $request->validated());

        return redirect()
            ->route('posts.index')
            ->route('success', 'Post updated successfully.');
    }

    // delete post
    public function destroy(Post $post): RedirectResponse {
        $this->authorize('delete', $post);

        $this->postService->delete($post);

        return redirect()
            ->route('posts.index')
            ->with('success', 'Post deleted successfully.');
    }

}
