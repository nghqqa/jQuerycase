//1.设置cookie 
function setcookie(key, value, time) {
    let date = new Date();
    date.setDate(date.getDate() + time);
    document.cookie = `${key}=${value};expires=${date}`
};

//2.获取cookie
function getcookie(key) {
    let arr = decodeURI(document.cookie).split('; ');
    for (let i = 0; i < arr.length; i++) {
        let newarr = arr[i].split('=');
        if (newarr[0] === key) {
            return newarr[1]
        }
    }
}

//3删除cookie:将要删除的cookie的时间设置成过去的时间
function delcookie(key) {
    setcookie(key, '', -1)
}