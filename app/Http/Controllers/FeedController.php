<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeedController extends Controller
{
    public function __construct(
        private readonly PostService $postService,
    ) {}

    // public feed, lahat ng posts makikita ng kahit sino
    public function index(): Response {
        return Inertia::render('Feed/Index', [
            'posts' => $this->postService->getAllPosts(),
        ]);
    }

    // isang post lang makikita
    public function show(Post $post): Response {
        return Inertia::render('Feed/Show', [
            'post' => $this->postService->getPost($post),
        ]);
    }

}
