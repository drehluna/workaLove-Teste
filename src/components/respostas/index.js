import './style.css'

export default function Respostas (props) {
    return (
        <div className="RepostasWrapper">
            <span className="Resposta">{props.text}</span>
        </div>
    );
}