<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class EmployeesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $fakerRu = Faker::create('ru_RU');
        $i = 0;
        foreach (range(1,10000) as $index) {
            DB::table('employees')->insert([
                [
                    'lang_id' => 1,
                    'item_id' => $index,
                    'company_id' => $index,
                    'first_name' => $faker->firstName,
                    'last_name' => $faker->lastName,
                    'email' => $faker->email,
                    'phone' => $faker->phoneNumber,
                    'created_at' => $faker->dateTime($max = 'now'),
                    'updated_at' => $faker->dateTime($max = 'now'),
                ],[
                    'lang_id' => 2,
                    'item_id' => $index,
                    'company_id' => $index,
                    'first_name' => $fakerRu->firstName,
                    'last_name' => $fakerRu->lastName,
                    'email' => $faker->email,
                    'phone' => $faker->phoneNumber,
                    'created_at' => $faker->dateTime($max = 'now'),
                    'updated_at' => $faker->dateTime($max = 'now'),
                ]
            ]);
            $i++;
        }
    }
}
