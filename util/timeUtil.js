
function getNowTime() {
    return Math.round(parseInt(Date.now() / 1000));
}

function formatTime(time) {
    var date = new Date(time*1000);
    return date.getFullYear + '-' + date.getMonth() + '-' + date.getDate();
}

module.exports.getNowTime = getNowTime;
module.exports.formatTime = formatTime;