import styles from './Button.module.css'
import { Icon } from '../Icon/Icon'


export const Button = ({ onClick, text = '', iconcomponent, iconsize, disabled=false }) => {
        return (
        <button disabled={disabled} onClick={() => onClick()} className={(text.length > 0) ? styles.withText : ''}>
            <Icon componentName={iconcomponent} size={iconsize} />
            <span>{text}</span>
        </button>
    )
}