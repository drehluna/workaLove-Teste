import './style.css'

export default function AvatarText (props) {
    return (
        <div className="AvatarTextWrapper">
            <div className="ContainerAvatarText"> 
                <img src="speakingBot.png" alt=''/>
                <span>{props.text}</span>
            </div>
        </div>
    );
}