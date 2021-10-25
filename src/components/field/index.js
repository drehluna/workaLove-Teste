
import { useField } from 'formik'

import './style.css'

export default function Field({ list, options, text, type, placeholder, component: InputComponent, ...props }) {

    const [inputProps, meta] = useField(props)

    let CitySiglaValue = ''

    return (
        <>
            {/* <AvatarText text={text} /> */}
            <div className="InputUserWrapper">
                <div className="InputUserContainer">
                    <InputComponent className={meta.error && meta.touched ? "InputUserError" : "InputUser"} {...inputProps} {...props} placeholder={placeholder} type={type} list={list} />
                    
                    {console.log(options)}

                    {list && options ?
                    
                    (<datalist id={list}>

                        
                        
                        {typeof(options[0]) !== 'object' ? options.map((value) => <option value={value}/>) : options[0].map((value) => 
                        
                            (<>
                            {CitySiglaValue = value.sigla ? `${value.sigla}/${value.nome}` : value.nome}
                            <option value={CitySiglaValue}/>
                            </>)


                        ) }

                    </datalist>) 
                    
                    : null}


                    {/* {list ? (<datalist id={list}>
                        {options.map((value) => <option value={value} />)}
                    </datalist>) : null} */}
                    <button type="submit"></button>
                </div>

                {meta.error && meta.touched ? <span>{meta.error}</span> : null}
            </div>

        </>
    );


}

Field.defaultProps = {
    component: 'input'
}