<?php

namespace App\Http\Controllers\Api;

use App\Employee;
use App\Http\Requests\CompaniesRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeesRequest;
use App\Lang;
use App\Company;
use Illuminate\Http\Request;

class EmployeesController extends Controller
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

        $employees = Employee::where('lang_id', $lang)->paginate(15);
        if($employees){
            return response($employees, 200);
        }
        $response = 'Employees does not exist';
        return response($response, 422);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Employee $employee, EmployeesRequest $request)
    {

        $item_id = time();
        $createdObjs = [];
        foreach ($this->langs as $lang) {
            $obj = [];
            foreach ($employee->getFillable() as $param){
                if(isset($request[$lang->short][$param])) {
                    $obj[$param] = $request[$lang->short][$param];
                }
                else{
                    $obj[$param] = '';
                }
            }
            $obj['item_id'] = $item_id;
            $employeeItem = Employee::create($obj);
            $createdObjs[$lang->short] = $employeeItem;
        }
        return response($createdObjs, 200);

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $obj = Employee::where('item_id', $id)->get();
        if($obj){
            return response($obj, 200);
        }
        $response = 'Employee does not exist';
        return response($response, 422);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeesRequest $request, $id)
    {
        $updatedEmployees = [];
        foreach ($this->langs as $lang){
            $obj = Employee::where('item_id', $id)->where('lang_id', $lang->id)->first();
            foreach ($obj->getFillable() as $param){
                if(isset($request[$lang->short][$param])){
                    $obj[$param] = $request[$lang->short][$param];
                }
            }
            $obj->save();
            $updatedEmployees[$lang->short] = $obj;
        }
        return response($updatedEmployees, 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $objs = Employee::where('item_id', $id);
        $objs->delete();
        return response('OK',  200);
    }
}
