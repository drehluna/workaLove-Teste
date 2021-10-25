import * as yup from 'yup';

export default yup.object().shape({
    data: yup.date().max(new Date(), 'Informe uma data valida').required('Informe uma data valida')
})