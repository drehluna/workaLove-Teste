import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string().email('Informe um e-mail valido').required('Informe um e-mail valido'),
})