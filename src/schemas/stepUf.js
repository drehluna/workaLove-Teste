import * as yup from 'yup';

export default yup.object().shape({
    uf: yup.string().required('Seu estado é uma informação necessária'),
})