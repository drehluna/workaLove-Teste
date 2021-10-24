import './style.css'
import react, { useState } from 'react'

const Star = ({ marked, starId }) => {
    return (
        <span data-star-id={starId} className="star" role="button">
            {marked ? '\u2605' : '\u2606'}
        </span>
    );
};

const StarRating = ({ value, values }) => {
    const [rating, setRating] = useState(parseInt(value) || 0);
    const [selection, setSelection] = useState(0);

    // console.log('StarRating',values)

    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute('data-star-id'))
            val = event.target.getAttribute('data-star-id');
            // console.log(event)
        setSelection(val);

    };


    return (

        <div
            onMouseOut={() => hoverOver(null)}
            onClick={e => {setRating(e.target.getAttribute('data-star-id') || rating)
        console.log(rating)}}
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

    );


}

export default StarRating