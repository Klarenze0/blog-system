<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // admin
        User::factory()->create([
            'name' => 'Admin Blog',
            'email' => 'admin@blog.com',
            'password' => bcrypt('password'),
            'role' => UserRole::Admin,
        ]);

        // regular user

        User::factory()->create([
            'name' => 'Juan',
            'email' => 'juan@blog.com',
            'password' => bcrypt('password'),
            'role' => UserRole::User,
        ]);

        User::factory()->create([
            'name' => 'Pedro',
            'email' => 'pedro@blog.com',
            'password' => bcrypt('password'),
            'role' => UserRole::User,
        ]);
    }
}
