<?php

namespace App\Http\Requests;

use App\Company;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class EmployeesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->route()->parameter('company');
        return [
            '*.first_name' => 'required|string:200',
            '*.last_name' => 'required|string:200',
            '*.email' => [
                'required',
                'email',
                Rule::unique('companies')->ignore($id, 'item_id'),
            ],
        ];
    }
}
