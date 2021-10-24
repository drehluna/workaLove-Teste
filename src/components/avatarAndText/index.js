import './style.css'

export default function AvatarText (props) {
    return (
        <div className="AvatarTextWrapper">
            <div className="ContainerAvatarText"> 
                <img src="speakingBot.png"/>
                <span>{props.text}</span>
            </div>
        </div>
    );
}