export function formatWorkTime(sec) {
    if (sec === 0) return 0;
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);

    const hoursText = hours === 1 ? ' часа ' : ' часов ';
    const minutesText = minutes === 1 ? ' минуты ' : ' минут ';

    const getWorkTimeToString = () => hours
        ? `${hours} ${hoursText} ${minutes} ${minutesText}`
        : `${minutes} ${minutesText}`;

    return getWorkTimeToString();
}


export function formatPauseTime(sec) {
    if (sec === 0) return '0 м';
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);

    const getPauseTimeToString = () => hours
        ? `${hours}  ч  ${minutes}  м`
        : `${(minutes)} м`

    return getPauseTimeToString();

}
