import React, {useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { fetchLangsAction, changeActiveLang } from '../../redux/actions/langsActions';
import {useDispatch} from 'react-redux';

const Langs = () => {

    const [langVal, setLangVal] = useState('en');
    const dispatch = useDispatch();
    const loadLangs = useCallback(
        () => { dispatch(fetchLangsAction()) },
        [dispatch]
    );
    const changeActiveLangAction = useCallback(
        (langItem) => { dispatch(changeActiveLang(langItem)) },
        [dispatch]
    );
    const langs = useSelector((state)=> state.langsReducer);
    useEffect(()=> {
        loadLangs();

    }, []);
    useEffect(()=> {
        setLangVal(langs.langActive.short);
    }, [langs.langActive]);



    const langItems = ()=>{
        let items = [];
        if(langs.langsList){
            for(let k in langs.langsList ){
                let el = langs.langsList[k];
                items.push(<MenuItem key={k} value={el.short}>{el.name}</MenuItem>)
            }
        }
        return items;
    };


    const handleChange = (e) => {
        changeActiveLangAction(langs.langsList[e.target.value]);
    }
    return (
        <FormControl>
            <Select
                value={langVal}
                onChange={event => handleChange(event, "lang")}
                inputProps={{
                    name: 'lang',
                    id: 'lang'
                }}
            >
                {langItems()}
            </Select>
        </FormControl>

    );
}
export default Langs;
