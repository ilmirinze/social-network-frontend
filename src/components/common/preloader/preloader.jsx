import loading from '../../../assets/img/loading.gif'
import s from './preloader.module.css'

let Preloader = () => {
    return <img className={s.loading} src={loading} alt={"...loading"}/>
}


export default Preloader