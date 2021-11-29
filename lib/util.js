exports.parseTimeStringToNumber = (string) => {
    let number = 0;
    let parsed = string.split(":");
    number += parseInt(parsed[0]) * 60;
    number += parseInt(parsed[1]);
    return number;
}

exports.parseTimeNumberToString = (number) => {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    if (minutes === 0) {
        return `${hours}:00`;
    }
    if (minutes < 10) {
        return `${hours}:0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

exports.parseMovie = (movie) => {
    let parsed = {};
    for (const key in movie) {
        parsed[key.trim()] = movie[key].trim();
        if (key.trim()==="Run Time") {
            parsed["Run Time Minutes"] = this.parseTimeStringToNumber(movie[key].trim());
        }
    }
    return parsed;
}

exports.getDay = (index) => {
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return week[index];
}

exports.getTimes = (beginning, end, duration, nearest, rest, times) => {
    let start = end - duration;
    const gap = start % nearest;
    start = start - gap;
    end = end - gap;
    const newStart = start - rest;
    // console.log("getTimes", beginning, end, duration, nearest, rest, times, start, gap, this.parseTimeNumberToString(start), this.parseTimeNumberToString(end), this.parseTimeNumberToString(newStart));
    if (newStart > beginning) {
        times.unshift([this.parseTimeNumberToString(start), this.parseTimeNumberToString(end)])
        return this.getTimes(beginning, newStart, duration, nearest, rest, times);
    } else {
        return times;
    }
}

