<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1,10000) as $index) {
            $name = $faker->company;
            $email = $faker->companyEmail;
            $logo = '/logos/puma-logo.svg';
            $website = $faker->domainName;
            DB::table('companies')->insert([
                [
                    'lang_id' => 1,
                    'item_id' => $index,
                    'name' => $name,
                    'email' => $email,
                    'logo' => $logo,
                    'website' => $website,
                    'created_at' => $faker->dateTime($max = 'now'),
                    'updated_at' => $faker->dateTime($max = 'now'),
                ],[
                    'lang_id' => 2,
                    'item_id' => $index,
                    'name' => $name,
                    'email' => $email,
                    'logo' => $logo,
                    'website' => $website,
                    'created_at' => $faker->dateTime($max = 'now'),
                    'updated_at' => $faker->dateTime($max = 'now'),
                ]
            ]);
        }
        //
    }
}
