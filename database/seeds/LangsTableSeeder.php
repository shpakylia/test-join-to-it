<?php

use Illuminate\Database\Seeder;

class LangsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('langs')->insert([
            [
                'name' => 'EN',
                'locale' => 'en-US',
                'code' => 'en-EN',
                'short' => 'en',
                'default' => 1
            ],
            [
                'name' => 'RU',
                'locale' => 'ru_RU.UTF-8',
                'code' => 'ru-RU',
                'short' => 'ru',
                'default' => 0
            ] ] );
    }
}
