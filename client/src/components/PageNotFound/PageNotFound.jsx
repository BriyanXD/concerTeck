import { Link } from "react-router-dom";
import s from './PageNotFound.module.css'


const PageNotFound = ()=>{
    return(
        <div className={s.imagen}>
        <div><br />
            <Link to='/'>
                <button className={s.button}> Go Home </button>
            </Link>
        </div>
        </div>
    )
}

export default PageNotFound;