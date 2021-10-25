import { createContext, useState } from "react";

export const StarRatingContext = createContext({})

export const StarRatingProvider = ({value, ...props}) => {
    const [rating, setRating] = useState(parseInt(value) || 0);

    return (
        <StarRatingContext.Provider value= {{rating, setRating}}>
            {props.children}
        </StarRatingContext.Provider>
    )
}