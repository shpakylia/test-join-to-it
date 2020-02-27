import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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

const CompanyForm = ({id = null, setOpenModalStatus, editDataAfterRequest}) => {
    const classes = useStyles();
    const { langsList, langActive } = useSelector((state)=> state.langsReducer);

    const [data, setData] = useState([]);
    const [commonField, setCommonField] = useState({
        name: '',
        email: '',
        logo: '',
        website: '',
    });
    useEffect(()=>{
        if(id) {
            axios.get("/api/companies/" + id + "/edit")
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
                        console.log(firstEl);
                        setCommonField(newCommonField);
                    }
                });
        }
        setData([]);
    }, [id]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let newElem = {};
        newElem[name] = value;
        setCommonField({ ...commonField, ...newElem});
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
            console.log('formData', formData);
            axios.put("/api/companies/" + id, formData)
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
            axios.post("/api/companies", formData)
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

    return(
        <ValidatorForm
            onSubmit={handleSubmit}
            className={classes.root}
        >
            <TextValidator
                label="name"
                onChange={handleChange}
                name="name"
                value={commonField.name}
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
                label="website"
                onChange={handleChange}
                name="website"
                value={commonField.website}
            />
            <Button type="submit">Save</Button>
        </ValidatorForm>
    );

}
export default CompanyForm;
