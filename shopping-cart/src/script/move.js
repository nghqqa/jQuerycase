function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
function buffermove(obj, json, fn) {
    let speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let bstop = true;

        for (let attr in json) {

            let stylevalue = null;
            if (attr === 'opacity') {
                stylevalue = Math.round(getStyle(obj, attr) * 100);
            } else {
                stylevalue = parseInt(getStyle(obj, attr));
            }
            speed = (json[attr] - stylevalue) / 20;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (stylevalue != json[attr]) {
                if (attr === 'opacity') {
                    obj.style.opacity = (stylevalue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (stylevalue + speed) + ')';
                } else {
                    obj.style[attr] = stylevalue + speed + 'px';
                }
                bstop = false;
            }
        }

        if (bstop) {
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn();
        }

    }, 10);
}