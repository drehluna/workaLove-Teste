import './style.css'
import { useEffect, useState } from 'react'
import { apiMock } from '../../api/api';

const Star = ({ marked, starId, saveInfo }) => {
    return (
        <span data-star-id={starId} className="star" role="button">
            {marked ? '\u2605' : '\u2606'}
        </span>
    );
};

const StarRating = ({ value, userinfos, saveInfo }) => {

    const [rating, setRating] = useState(parseInt(value) || 0);
    const [selection, setSelection] = useState(0);

    const [send, setSend] = useState(false)

    useEffect(() => {
        saveInfo('rating', rating)
    }, [rating, saveInfo])

    const onSubmit = () => {

        apiMock.post('FinalData', userinfos)
        setSend(true)
    }


    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute('data-star-id'))
            val = event.target.getAttribute('data-star-id');
        setSelection(val);
    };
    return (

        <div className="StarWrapper">
            <div className="StarContainer"
                onMouseOut={() => hoverOver(null)}
                onClick={e => setRating(e.target.getAttribute('data-star-id') || rating)}
                onMouseOver={hoverOver}
            >
                {Array.from({ length: 5 }, (v, i) => (
                    <Star
                        starId={i + 1}
                        key={`star_${i + 1}`}
                        marked={selection ? selection >= i + 1 : rating >= i + 1}
                    />
                ))}
            </div>

            {send ? <span className="SpanFinalizado">Suas respostas foram salvas, obrigado.</span>
                : <button onClick={onSubmit} className="StarSendButton">Enviar</button>}
        </div>
    );
};

export default StarRating