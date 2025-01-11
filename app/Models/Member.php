<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasUuids, HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'passport',
        'surname',
        'other_names',
        'phone_number',
        'email',
        'DOB',
        'gender'
    ];

    protected $casts = [
        'DOB' => 'date',
    ];

}
