class Biu {
    constructor({ left, top, radius, speed }) {
        this.left = left;
        this.top = top;
        this.radius = radius;
        this.speed = speed;
        this.el = null;
        this.key = UUIDjs.create().toString();
        this.dt = 0;
        this.dl = 0;
        this.new = true;
        this.rx = 0;
        this.ry = 1;

        this.next = false;
        this.px = left;
        this.py = top;
        this.changeNum = 10;

        this.oldRadius = radius;
        this.init();
    }
    changeRadius(radius){
        this.el.style.width = radius + 'px';
        this.el.style.height = radius + 'px';
    }
    changeColor(bool){
        this.el.className = bool ? 'dot eat' : 'dot';
    }
    changeSpeed(rx, ry) {
        this.rx = rx;
        this.ry = ry;
    }
    changePxy(x, y) {
        this.next = true;
        this.px = x;
        this.py = y;
    }
    init() {
        const el = document.createElement('div');
        el.className = 'dot';
        el.style.left = `${this.left - this.radius / 2}px`;
        el.style.top = `${this.top - this.radius / 2}px`;
        el.style.width = this.radius + 'px';
        el.style.height = this.radius + 'px';
        this.el = el;
        document.body.appendChild(el);
    }
    move() {
        if (this.next && this.changeNum) {
            this.changeNum--;
            this.el.style.left = this.px + 'px';
            this.el.style.top = this.py + 'px';
        } else {
            this.changeNum = 10;
            this.next = false;
            this.left = Number(this.el.offsetLeft) + this.rx;
            this.top = Number(this.el.offsetTop) + this.ry;
            this.el.style.left = this.left + 'px';
            this.el.style.top = this.top + 'px';
        }
    }
    destory() {
        document.body.removeChild(this.el);
    }
}
