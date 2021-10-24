import react from 'react'
import { useField } from 'formik'

import './style.css'
import AvatarText from '../avatarAndText';

export default function Field({ list, options, text, type, placeholder, component: InputComponent, ...props }) {

    const [inputProps, meta] = useField(props)



    return (
        <>
            {/* <AvatarText text={text} /> */}
            <div className="InputUserWrapper">
                <div className="InputUserContainer">
                    <InputComponent className={meta.error && meta.touched ? "InputUserError" : "InputUser"} {...inputProps} {...props} placeholder={placeholder} type={type} list={list} />
                    
                    {list ? (<datalist id={list}>
                        {options.map((value) => <option value={value} />)}
                    </datalist>) : null}
                    <button type="submit">Enviar</button>
                </div>

                {meta.error && meta.touched ? <span>{meta.error}</span> : null}
            </div>

        </>
    );


}

Field.defaultProps = {
    component: 'input'
}