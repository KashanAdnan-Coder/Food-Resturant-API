function getRandomTime(start, end) {
    const startHour = start.getHours();
    const endHour = end.getHours();
    const randomHour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;

    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);

    const randomDate = new Date(start);
    randomDate.setHours(randomHour);
    randomDate.setMinutes(randomMinute);
    randomDate.setSeconds(randomSecond);

    return randomDate;
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function generateUniqueRandomTimes(start, end, count) {
    const times = new Set();

    while (times.size < count) {
        const randomTime = getRandomTime(start, end);
        const formattedTime = formatTime(randomTime);
        times.add(formattedTime);
    }

    return Array.from(times);
}




export default generateUniqueRandomTimes