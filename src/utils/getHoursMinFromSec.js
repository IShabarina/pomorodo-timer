export function formatWorkTime(sec) {
    console.log(sec);
    if (sec && sec !== null) {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);

        const hoursText = hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов';
        const minutesText = minutes === 1 ? 'минута' : minutes < 5 ? 'минуты' : 'минут';

        return {
            hours,
            hoursText,
            minutes,
            minutesText
        }

    } else {
        return null;
    }
}