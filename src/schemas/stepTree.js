import * as yup from 'yup';

export default yup.object().shape({
    data: yup.date().max('2021/01/01').required(),
})