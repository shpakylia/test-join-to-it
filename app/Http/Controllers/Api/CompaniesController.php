<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CompaniesRequest;
use App\Http\Controllers\Controller;
use App\Lang;
use App\Company;
use Illuminate\Http\Request;

class CompaniesController extends Controller
{
    public function __construct(Lang $lang)
    {
        parent::__construct($lang);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lang = $request->lang ?? $this->defaultLang->id;

        $companies = Company::where('lang_id', $lang)->paginate(15);
        if($companies){
            return response($companies, 200);
        }
        $response = 'Companies does not exist';
        return response($response, 422);
    }
    public function indexList(Request $request)
    {
        $lang = $request->lang ?? $this->defaultLang->id;

        $companies = Company::where('lang_id', $lang)->get();
        if($companies){
            return response($companies, 200);
        }
        $response = 'Companies does not exist';
        return response($response, 422);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Company $company, CompaniesRequest $request)
    {

        $item_id = time();
        $createdCompanies = [];
        foreach ($this->langs as $lang) {
            $obj = [];
            foreach ($company->getFillable() as $param){
                if(isset($request[$lang->short][$param])) {
                    $obj[$param] = $request[$lang->short][$param];
                }
                else{
                    $obj[$param] = '';
                }
            }
            $obj['item_id'] = $item_id;
            $company = Company::create($obj);
            $createdCompanies[$lang->short] = $company;
        }
        return response($createdCompanies, 200);

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $company = Company::where('item_id', $id)->get();
        if($company){
            return response($company, 200);
        }
        $response = 'Company does not exist';
        return response($response, 422);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CompaniesRequest $request, $id)
    {
        $updatedCompanies = [];
        foreach ($this->langs as $lang){
            $obj = Company::where('item_id', $id)->where('lang_id', $lang->id)->first();
            foreach ($obj->getFillable() as $param){
                if(isset($request[$lang->short][$param])){
                    $obj[$param] = $request[$lang->short][$param];
                }
            }
            $obj->save();
            $updatedCompanies[$lang->short] = $obj;
        }
        return response($updatedCompanies, 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $objs = Company::where('item_id', $id);
        foreach ($objs->get() as $obj){
            $obj->employees()->delete();
        }
        $objs->delete();
        return response('OK',  200);
    }
}
