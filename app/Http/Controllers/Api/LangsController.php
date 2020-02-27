<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Lang;

class LangsController extends Controller
{
    public function __construct(Lang $lang)
    {
        parent::__construct($lang);
    }


    public function index(){
        return response($this->langs, 200);
    }
}
