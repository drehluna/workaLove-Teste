import * as yup from 'yup';

export default yup.object().shape({
    cidade: yup.string().required('A cidade é uma informação necessária'),
})