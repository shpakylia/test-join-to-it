import axios from 'axios';

const fetchLangsAction = () => (dispatch) => {
    axios.get("/api/langs")
        .then(response => {
            return response;
        })
        .then(result => {
            if(result.status === 200){
                let langs = result.data;
                dispatch(fetchLangsSuccess(langs));
            }
            else{
                dispatch(fetchLangsFail());
            }
        });
};

const fetchLangsSuccess = (langs) => {
    return {
        type: 'FETCH_LANGS_SUCCESS',
        payload: {
            langs
        }
    }
};
const fetchLangsFail = () => {
    return {
        type: 'FETCH_LANGS_FAIL',
    }
};

const changeActiveLang = (lang)=>{
    return {
        type: 'CHANGE_ACTIVE_LANG',
        payload: lang
    }
}

export {
    fetchLangsAction,
    fetchLangsSuccess,
    fetchLangsFail,
    changeActiveLang
}

