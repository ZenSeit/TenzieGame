
import '../Stylesheets/button.css'


export default function Button({name,activate,state}){

    return(
        <button className={`button--game ${state ? "active" : ""}`.trimEnd()} onClick={activate} disabled={!state}>
            {name}
        </button>
    )
}