import * as yup from 'yup';

export default yup.object().shape({
    nomeesobrenome: yup.string().required(),
})