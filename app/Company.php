<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';

    protected $fillable = [
        'item_id',
        'lang_id',
        'name',
        'email',
        'logo',
        'website'

    ];
    protected $perPage = 10;

    public function employees()
    {
        return $this->hasMany('App\Employee', 'company_id');
    }
}
