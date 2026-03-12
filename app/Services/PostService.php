<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;



class PostService
{
    // kunin lahat ng posts, public feed
    public function getAllPosts(): Collection{
        return Post::with('user')
            ->latest()
            ->get();
    }

    // kunin yung posts ng isang specific user, para sa dashboard
    public function getUserPosts(User $user): collection{
        return Post::where('user_id', $user->id)
            ->latest()
            ->get();
    } 

    // kunin yung isang post lang
    public function getPost(Post $post): Post {
        return $post->load('user');
    }

    // taga gawa ng post, kapag mag image, need muna upload bago save
    public function create(User $author, array $data): Post {
        $imagePath = null;

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $imagePath = $this->uploadImage($data['image']);
        }


        return Post::create([
            'user_id' => $author->id,
            'title' => $data['title'],
            'content' => $data['content'],
            'image_path' => $imagePath,
        ]);
    }

    // update yung existing post, if may new image delete the old, upload the new
    public function update(Post $post, array $data): Post {
        $imagePath = $post->image_path;

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            // delete muna luma if meron
            if ($post->image_path) {
                $this->deleteImage($post->image_path);
            }

            $imagePath = $this->uploadImage($data['image']);
        }

        $post->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'image_path' => $imagePath,
        ]);

        return $post->fresh();
    }

    // delete post kasama yung iamge sa storage
    public function delete(Post $post): void {
        if ($post->image_path){
            $this->deleteImage($post->image_path);
        }

        $post->delete();
    }

    // upload image sa storage/app/public/posts/.

    private function uploadImage(UploadedFile $image): string {
        // store() = taga generate ng unique filename
        // iseseave sa storage/app/public/posts/
        return $image->store('posts', 'public');
    }

    // delete image na nasa storage
    private function deleteImage(string $path): void {
        Storage::disk('public')->delete($path);
    }
}