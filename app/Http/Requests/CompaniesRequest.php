<?php

namespace App\Http\Requests;

use App\Company;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CompaniesRequest extends FormRequest
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
            '*.name' => 'required',
            '*.email' => [
                'required',
                'email',
                Rule::unique('companies')->ignore($id, 'item_id'),
            ],
        ];
    }
}
