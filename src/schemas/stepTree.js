import * as yup from 'yup';

export default yup.object().shape({
    data: yup.date().required()
})