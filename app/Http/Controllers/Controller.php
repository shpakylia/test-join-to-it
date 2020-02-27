<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Lang;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $langs;
    protected $defaultLang;

    public function __construct(Lang $lang)
    {
        $this->langs = $lang->getAllLangs();
        $this->defaultLang = $lang->getDefaultLang();
    }

}
