import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {TextField, FormLabel} from '@material-ui/core';
import WindowedSelect from 'react-windowed-select'

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        '&>*': {
            width: '100%'
        }
    },

}));

const EmployeeForm = ({id = null, companies, setOpenModalStatus, editDataAfterRequest}) => {
    const classes = useStyles();
    const { langsList, langActive } = useSelector((state)=> state.langsReducer);
    const [data, setData] = useState([]);
    const [commonField, setCommonField] = useState({
        company_id: '' ,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });
    const [selectedOption, setSelectedOption] = useState({
        label: '',
        value: ''
    });


    useEffect(()=>{
        if(id) {
            axios.get("/api/employees/" + id + "/edit")
                .then(response => {
                    return response;
                })
                .then(result => {
                    if (result.status === 200 && result.data) {
                        setData(result.data);
                        const firstEl = result.data[0];
                        const newCommonField = {};
                        for(let k in commonField){
                            newCommonField[k] = firstEl[k];
                        }
                        setCommonField(newCommonField);
                        const company = companies.find((el)=>(el.item_id === firstEl.company_id));

                        if(company){
                            setSelectedOption({
                                label: company.name,
                                value: company.item_id
                            })

                        }
                    }
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let newElem = {};
        newElem[name] = value;
        setCommonField({ ...commonField, ...newElem});
    };
     const handleSelect = (optionSelected) => {
         let newElem = {};
         newElem['company_id'] = optionSelected.value;
         setCommonField({ ...commonField, ...newElem});
         setSelectedOption( optionSelected );
        };


    const handleSubmit = () => {
        let formData = {};
        let langsListById = [];
        for (let key in langsList){
            langsListById[langsList[key].id]=langsList[key].short;
        };
        if(id && data.length){
            data.forEach((el)=> {
                formData[langsListById[el.lang_id]] = {...el, ...commonField};
            });
            console.log(formData);
            axios.put("/api/employees/" + id, formData)
                .then(response => {
                    return response;
                })
                .then(result => {
                    if (result.status === 200 && result.data) {
                        setOpenModalStatus(false);
                        editDataAfterRequest(result.data[langActive.short])
                    }
                });
        }else{
            for (let key in langsList){
                const fieldLang = {};
                fieldLang['lang_id'] = langsList[key]['id'];
                formData[langsList[key].short] = {...commonField, ...fieldLang};
            }
            axios.post("/api/employees", formData)
                .then(response => {
                    return response;
                })
                .then(result => {
                    console.log(result);
                    if (result.status === 200 && result.data) {
                        setOpenModalStatus(false);
                        editDataAfterRequest(result.data[langActive.short])
                    }
                });
        }
    }

    const options = [];
    companies.forEach((el)=> {
        options.push({
            label: el.name,
            value: el.item_id
        });
    });

    return(
        <ValidatorForm
            onSubmit={handleSubmit}
            className={classes.root}
        >
            <FormLabel> company</FormLabel>
            <WindowedSelect
                // label="company"
                options={options}
                onChange={handleSelect}
                value={selectedOption}
                styles={{
                    option: (base) => ({
                        ...base,
                        height: 60,
                        padding: '20px 12px',
                        zIndex: 100
                    }),
                }}

            />
            <TextValidator
                label="first name"
                onChange={handleChange}
                name="first_name"
                value={commonField.first_name}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <TextValidator
                label="last name"
                onChange={handleChange}
                name="last_name"
                value={commonField.last_name}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <TextValidator
                label="email"
                onChange={handleChange}
                name="email"
                value={commonField.email}
                validators={['isEmail']}
                errorMessages={['email is not valid']}
            />
            <TextField
                label="phone"
                onChange={handleChange}
                name="phone"
                value={commonField.phone}
            />
            <Button type="submit">Save</Button>
        </ValidatorForm>
    );

}
export default EmployeeForm;
