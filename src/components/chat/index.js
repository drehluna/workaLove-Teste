import './style.css'

import { Formik } from 'formik'
import Field from '../field';
import { useEffect, useRef, useState } from 'react';
import StarRating from '../starRating';
import stepOne from '../../schemas/stepOne';
import stepTwo from '../../schemas/stepTwo';
import stepTree from '../../schemas/stepTree';
import stepFour from '../../schemas/stepFour';
import stepUf from '../../schemas/stepUf'
import AvatarText from '../avatarAndText';
import Respostas from '../respostas';
import { loadState, loadUfs } from '../../api/api';


export default function Chat() {

    const [step, setStep] = useState(0)

    const [uf, setUf] = useState([])

    const [state, setState] = useState([])

    const endDiv = useRef(null)
    const ScrollToFinalDiv = () => {
        endDiv.current.scrollIntoView({ behavior: "smooth" })
    }
    
    const schemas = [stepOne,stepUf ,stepTwo, stepTree, stepFour]

    const [currentSchema, setSchema] = useState(schemas[step])

    const [userInfo, setUserInfo] = useState({name: ''})

    const [history, setHistory] = useState([])

    const Questions = [
        {
            question: `Olá, eu sou ChatNilson, tudo bem? Para começarmos, preciso saber seu nome.`,
            key: 'name',
            inputMetaData: {
                name: 'nomeesobrenome', type: '', placeholder: 'Digite seu nome', component: 'input', options: [], list: "" 
            }
        },
        {
            question: `Que satisfação ${userInfo.name}. Agora que sei seu nome, qual estado que você mora`,
            key: 'uf',
            inputMetaData: {
                name: 'uf', type: '', placeholder: 'Qual seu estado', component: 'input', options: uf, list: "city-list"
            }
        },
        {
            question: 'Me informe a cidade que você mora',
            key: 'city',
            inputMetaData: {
                name: 'cidade', type: '', placeholder: 'Qual sua cidade', component: 'input', options: state, list: "city-list"
            }
        },
        {
            question: 'Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu',
            key: 'data',
            inputMetaData: {
                name: 'data', type: 'date', placeholder: '', component: 'input', options: [], list: "" 
            }
        },
        {
            question: `Agora me fala teu e-mail por gentileza`,
            key: 'email',
            inputMetaData: {
                name: 'email', type: 'email', placeholder: '', component: 'input', options: [], list: ""
            }
        },
        {
            question: 'Você finalizou o teste, faça uma avaliação sobre o processo que realizou até aqui. Nós agradecemos.'
        },
    ]
    

    const getKey = () => {
       return Questions[step].key
    }

    const saveInfo = (key, value) => {
        setUserInfo({...userInfo, [key]: value})
        
    }

    const chatHistory = (value) => {

        setHistory((history) => [...history, {question: Questions[step].question, awnser: value}])
        
    }

    const nextSchema = () => {
        setSchema(schemas[step + 1])
    }

    const nextStep = () => {
        setStep(step + 1)
    }

    const hasMoreInfoInput = () => {
        return getKey() !== undefined
    }

    useEffect( () => {

        loadUfs().then(response => setUf((uf) => [...uf, response]))
        
    }
    , [])

    useEffect(ScrollToFinalDiv, [step]);

    useEffect(() => {
        if(userInfo.uf) {
            loadState(userInfo.uf).then(response => setState((state) => [...state, response]))
        }

    }
    , [userInfo])

    

    function onSubmit(values) {
        
        saveInfo(getKey(), values[Questions[step].inputMetaData.name])
        chatHistory(values[Questions[step].inputMetaData.name])
        nextStep()
        nextSchema()
    }

    console.log(step)

    console.log(userInfo)



    return (
        <div className="ChatWrapper" >
            <div className="ChatContainer">
                <Formik
                    onSubmit={onSubmit}
                    validationSchema={currentSchema}
                    initialValues={{
                        email: '',
                        data: '',
                        cidade: '',
                        uf: '',
                        nomeesobrenome: ''

                    }}
                    render={({ values, handleSubmit }) => (

                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}>


                            <div className="teste" >

                                {history.map((value, index) => (
                                    <div key={index}>
                                    <AvatarText text={value.question}/>
                                    <Respostas text={value.awnser}/>
                                    </div>
                                ))}
                                <AvatarText text={Questions[step].question}/>


                                <div  ref={endDiv}/>

                            </div >



                            {!hasMoreInfoInput() ? <StarRating /> :

                                <Field

                                    name={Questions[step].inputMetaData.name}
                                    placeholder={Questions[step].inputMetaData.placeholder}
                                    component={Questions[step].inputMetaData.component}
                                    type={Questions[step].inputMetaData.type}
                                    options={Questions[step].inputMetaData.options}
                                    list={Questions[step].inputMetaData.list}



                                />}
                        </form>
                    )} />
            </div>
        </div>
    );
}