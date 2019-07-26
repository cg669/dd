class Dot {
    constructor({ left, top, radius, speed, className }) {
        this.left = left;
        this.top = top;
        this.radius = radius;
        this.speed = speed;
        this.el = null;
        this.key = UUIDjs.create().toString();
        this.dt = 0;
        this.dl = 0;
        this.new = true;
        this.className = className;
        this.init();
    }
    init() {
        const el = document.createElement('div');
        el.className = this.className || 'dot';
        el.style.left = `${this.left - this.radius / 2}px`;
        el.style.top = `${this.top - this.radius / 2}px`;
        el.style.width = this.radius + 'px';
        el.style.height = this.radius + 'px';
        this.el = el;
        document.body.appendChild(el);
    }
    move() {
        if(this.new){
            this.new  = false;
            const r = Math.pow(-1,Math.ceil( Math.random() * 1000));
            // const c = Math.pow(-1,Math.ceil( Math.random() * 1000));
            this.dt = r > 0 ? Math.PI : 0;
            this.el.style.left = Number(this.el.offsetLeft) + r * this.speed  + 'px';
            // console.log(r);
        }else{
            this.dt += 0.03;
            this.speed += 1;
            this.el.style.left = this.left + Math.sin(this.dt)*this.speed  + 'px';
            this.el.style.top =this.top + Math.cos(this.dt)*this.speed  + 'px';
        }
    }
    destory() {
        // console.log(this.el);
        document.body.removeChild(this.el);
    }
}
