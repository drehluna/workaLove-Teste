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


export default function Chat() {

    const [step, setStep] = useState(0)

    const schemas = [stepOne, stepTwo, stepUf, stepTree, stepFour]


    const [currentSchema, setSchema] = useState(schemas[step])

    const endDiv = useRef(null)

    const ScrollToFinalDiv = () => {
        endDiv.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(ScrollToFinalDiv, [step]);


    const [chatQuestions, setChatQuestion] = useState([
        {
            question: 'Olá, eu sou ChatNilson, tudo bem? Para começarmos, preciso saber seu nome.',
            awnser: ''
        },
    ])


    const DataToInput = [

        { name: 'nomeesobrenome', type: '', placeholder: 'Digite seu nome', component: 'input', options: [], list: "" },
        { name: 'cidade', type: '', placeholder: 'Qual sua cidade', component: 'input', options: ['python', 'javascript', 'java'], list: "city-list" },
        { name: 'uf', type: '', placeholder: 'Qual seu estado', component: 'select', options: [], list: "" },
        { name: 'data', type: 'Data', placeholder: '', component: 'input', options: [], list: "" },
        { name: 'email', type: 'email', placeholder: '', component: 'input', options: [], list: "" },
    ]

    function onSubmit(values) {

        const perguntas = [

            `Que satisfação ${values.nomeesobrenome}. Agora que sei seu nome, qual cidade que você mora`,
            `Que satisfação. Agora que sei seu nome, qual cidade que você mora 2`,
            `Que satisfação. Agora que sei seu nome, qual cidade que você mora 3`,
            `Que satisfação. Agora que sei seu nome, qual cidade que você mora 4`,
            `Que satisfação. Agora que sei seu nome, qual cidade que você mora 5`,
        ]


        if (step === 5) {
            return
        }

        chatQuestions[step].awnser = values[DataToInput[step].name]


        let newQuestion = { question: perguntas[step], awnser: '' }



        chatQuestions.push(newQuestion)
        console.log(chatQuestions)
        setChatQuestion(chatQuestions)
        setStep(step + 1)

        setSchema(schemas[step + 1])








    }




    console.log(step)



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

                                {chatQuestions.map((value, index) => <div  key={index}>
                                    <AvatarText text={value.question} />
                                    {value.awnser ? <Respostas text={value.awnser} /> : null}

                                </div>)}

                                <div  ref={endDiv}/>

                            </div >



                            {step === 5 ? <StarRating /> :

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