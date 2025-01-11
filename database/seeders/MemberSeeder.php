<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class MemberSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) {
            Member::create([
                'passport' => $faker->unique()->regexify('[A-Z]{2}[0-9]{6}'),
                'surname' => $faker->lastName,
                'other_names' => $faker->firstName . ' ' . $faker->firstName,
                'phone_number' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'DOB' => $faker->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
                'gender' => $faker->randomElement(['male', 'female', 'other'])
            ]);
        }
    }
}
