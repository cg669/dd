
class WorkBus extends BaseWorkBus{
    constructor(props){
        super(props);
    }
    playWork() {
        this.isWorking = true;
        this.iTimer = requestAnimationFrame(() => {
            this.list.forEach(el => {
                this.collection(el);
                el.move();
            });
            if (!this.isWorking) {
                return;
            };
            this.playWork();
        })
    }
}
const bus = new WorkBus();
bus.playWork();
var num = 200;

function addDot(){
    if(bus.list.length < num){
        const r = winHeight > winWidth ? winWidth : winHeight;
        const rd = Math.random() * r / 2;
        const dot = new Dot({ left: winWidth /2 , top: winHeight / 2, radius: 10, speed: rd });
        bus.add(dot);
    }
    // console.log(bus.list.length);
    requestAnimationFrame( () => {
        addDot();
    })
}

addDot();

window.onclick = function(){
    window.location.href = 'snake.html';
}
