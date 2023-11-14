import styles from './StatisticCard.module.css';

const StatisticCard = ({ name, value, icon, color = "#C4C4C4" }) => {
    return (
        <div className={styles.container}>
            <div>
                <p className={styles.name}>{name}</p>
                <p className={styles.value}>{value}</p>
            </div>
            <div>
                {icon === 'focus' &&
                    <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>}

                {icon === 'stop' &&
                    <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M28 27L102 101" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>}

                {icon === 'pause' &&
                    <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M64.3154 37.1579V64.3158L77.8944 77.8947" stroke={color} stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                }
            </div>
        </div>
    )
}

export default StatisticCard;