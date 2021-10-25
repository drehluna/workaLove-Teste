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

    const [uf] = useState([])

    const [state] = useState([])

    const endDiv = useRef(null)
    const ScrollToFinalDiv = () => {
        endDiv.current.scrollIntoView({ behavior: "smooth" })
    }
    
    const schemas = [stepOne,stepUf ,stepTwo, stepTree, stepFour]

    const [currentSchema, setSchema] = useState(schemas[step])

    const [userInfo, setUserInfo] = useState({name: ''})
    const [history] = useState([])

    const DataToInput = [
        { name: 'nomeesobrenome', type: '', placeholder: 'Digite seu nome', component: 'input', options: [], list: "" },
        { name: 'uf', type: '', placeholder: 'Qual seu estado', component: 'input', options: uf, list: "city-list"  },
        { name: 'cidade', type: '', placeholder: 'Qual sua cidade', component: 'input', options: state, list: "city-list" },
        { name: 'data', type: 'date', placeholder: '', component: 'input', options: [], list: "" },
        { name: 'email', type: 'email', placeholder: '', component: 'input', options: [], list: "" },
    ]
    const Questions = [
        {
            question: `Olá, eu sou ChatNilson, tudo bem? Para começarmos, preciso saber seu nome.`,
            awnser: '',
            key: 'name'
        },
        {
            question: `Que satisfação ${userInfo.name}. Agora que sei seu nome, qual cidade que você mora`,
            awnser: '',
            key: 'city'
        },
        {
            question: 'Me informe o estado que você mora',
            awnser: '',
            key: 'uf'
        },
        {
            question: 'Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu',
            awnser: '',
            key: 'data'
        },
        {
            question: `Agora me fala teu e-mail por gentileza`,
            awnser: '',
            key: 'email'
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
        history.push({question: Questions[step].question, awnser: value})
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

    useEffect(async () => {

        const ufData = await loadUfs()
        uf.push(ufData)
        
    }
    , [])

    useEffect(ScrollToFinalDiv, [step]);

    useEffect(async () => {

        if(userInfo.city) {
            console.log('entrou aqui')
            const stateData = await loadState(userInfo.city)
            state.push(stateData)
            console.log(state[0][0].nome)
        }

    }
    , [userInfo])

    

    function onSubmit(values) {
        saveInfo(getKey(), values[DataToInput[step].name])
        chatHistory(values[DataToInput[step].name])
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

                                    name={DataToInput[step].name}
                                    placeholder={DataToInput[step].placeholder}
                                    component={DataToInput[step].component}
                                    type={DataToInput[step].type}
                                    options={DataToInput[step].options}
                                    list={DataToInput[step].list}



                                />}
                        </form>
                    )} />
            </div>
        </div>
    );
}