export function getTimeStamp(string) {
    var parts = string.match(/\d+/g);
    return new Date(parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5]).getTime();
}