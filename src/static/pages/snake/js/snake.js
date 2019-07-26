

var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if (element.detachEvent)
            element.detachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;
        function handleTouchEvent(event) {
            switch (event.type) {
                case "touchstart":
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var spanX = event.changedTouches[0].pageX - startX;
                    var spanY = event.changedTouches[0].pageY - startY;

                    if (Math.abs(spanX) > Math.abs(spanY)) {      //认定为水平方向滑动
                        if (spanX > 30) {         //向右
                            if (rightCallback)
                                rightCallback();
                        } else if (spanX < -30) { //向左
                            if (leftCallback)
                                leftCallback();
                        }
                    } else {                                    //认定为垂直方向滑动
                        if (spanY > 30) {         //向下
                            if (downCallback)
                                downCallback();
                        } else if (spanY < -30) {//向上
                            if (upCallback)
                                upCallback();
                        }
                    }

                    break;
                case "touchmove":
                    //阻止默认行为
                    if (isPreventDefault)
                        event.preventDefault();
                    break;
            }
        }
    }
};

class WorkBus extends BaseWorkBus {
    constructor(props) {
        super(props);
        this.hatList = [];
        this.dotList = [];
    }
    addDot(hat,num=1){
        console.log(num)
        while(num > 0){
            num--;
            const dot = new Dot({ left: hat.l , top: hat.t, radius: 5, speed: 10,className: 'heart' });
            this.dotList.push(dot);
        }
        
    }
    addHat(hat) {
        this.hatList.push(hat);
    }
    addBiu(num=1){
        while(num > 0){
            num--;
            const lastOne = this.list[this.list.length-1];
            const snake = new Biu({ left: lastOne.px, top: lastOne.py, radius: 10 });
            this.add(snake);
        }
    }
    deleteDot(key){
        const list = this.dotList;
        this.dotList = list.filter(el => el.key !== key);
    }
    removeHat(key){
        const list = this.hatList;
        this.hatList = list.filter(el => el.key !== key);
    }
    playWork() {
        if (this.times % 200 === 9) {
            const w = Math.random() * 20 + 10;
            const md = (Math.random() * 6 + 2) / 10
            const hat = new Hat({ width: w, height: w, left: md * winWidth, top: md * winHeight })
            this.addHat(hat);
        }
        this.times++;
        this.isWorking = true;
        this.iTimer = requestAnimationFrame(() => {
            if (this.change) {
                this.list.reduce((a, b) => {
                    if (a && a.left) {
                        b.changePxy(a.left, a.top);
                    } else if (b) {
                        this.callBackFunc(b);
                    }
                    return b;
                }, null);
            }
            this.dotList.forEach( dot => {
                if(dot.dt > Math.PI * 2){
                    dot.destory();
                    this.deleteDot(dot.key);
                }else{
                    dot.move();
                }
            })
            this.list.forEach( (el,index) => {
                if(index === 0){
                    if(this.times % 100 === 9){
                        el.changeColor(false);
                    }
                    this.hatList.forEach(hat=>{
                        if(collText(el.el,hat.el)){
                            hat.destory();
                            this.removeHat(hat.key);
                            
                            const num = Math.round(hat.w /10);
                            el.changeColor(true);
                            this.addBiu(num);
                            this.addDot(hat,num);
                        }
                    })
                    this.collectionFirst(el);
                }
                el.move();
                // el.changeRadius(10);
            });
            if (!this.isWorking) {
                return;
            };
            this.playWork();
        })
    }
    collectionFirst(item) {
        const el = item.el;
        if (el) {
            if(el.offsetLeft < 0){
                el.style.left = winWidth + 'px';
            }else if(el.offsetLeft > winWidth){
                el.style.left = 0 + 'px';
            }else if(el.offsetTop < 0){
                el.style.top = winHeight + 'px';
            }else if(el.offsetTop > winHeight){
                el.style.top = 0 + 'px';
            }
        }
    }
}
const bus = new WorkBus();
bus.playWork();
var snakeNum = 10;
while (snakeNum > 0) {
    snakeNum--;
    const t = winHeight / 2 + 10 * snakeNum;
    const snake = new Biu({ left: winWidth / 2, top: t, radius: 10 });
    bus.add(snake);
}
function up() {
    // console.log("上");
    bus.callFunc(el => el.changeSpeed(0, -1));
}
function right() {
    // console.log("右");
    bus.callFunc(el => el.changeSpeed(1, 0));
}
function down() {
    // console.log("下");
    bus.callFunc(el => el.changeSpeed(0, 1));

}
function left() {
    // console.log("左");
    bus.callFunc(el => el.changeSpeed(-1, 0));
}
document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, { passive: false }); //passive 参数不能省略，用来兼容ios和android
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault()
    }
});
document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
});
EventUtil.listenTouchDirection(document.body, true, up, right, down, left)