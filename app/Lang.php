<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lang extends Model
{
    protected $table = 'langs';
    protected $guarded = ['id'];

    public function getAllLangs(){
        return $this->orderBy('default', 'DESC')->get()->keyBy('short');
    }
    public function getDefaultLang(){
        return $this->where('default', 1)->first();
    }
}
