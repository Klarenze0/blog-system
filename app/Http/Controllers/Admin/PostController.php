<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function __construct(
        private readonly PostService $postService,
    ){}

    // kunin lahat ng posts para sa admin
    public function index(): Response{
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $this->postService->getAllPosts(),
        ]);
    }

    public function destroy(Post $post): RedirectResponse {
        $this->postService->delete($post);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Post deleted successfully');
    }
}
