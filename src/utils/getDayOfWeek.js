export function getDayOfWeek(dateStr) {
    const date = new Date(dateStr);
    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    return daysOfWeek[date.getDay()];
}