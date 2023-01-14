import loading from '../../../assets/img/loading.gif'
import s from './Preloader.module.css'

let Preloader = (props) => {
    return <img className={s.loading} src={loading} />
}


export default Preloader