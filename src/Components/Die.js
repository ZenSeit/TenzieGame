import '../Stylesheets/die.css'



export default function Die({id,number, numberRef, handleClick,classMode}){
    

    return(
        <div className={classMode ? `die--container check` : `die--container`} onClick={(e)=>handleClick(e,id)}>
            {number}
        </div>
    )
}