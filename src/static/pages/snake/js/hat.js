
class Hat{
    constructor({ width,height,left,top }){
        this.w = width;
        this.h = height;
        this.l = left;
        this.t = top;
        this.key = UUIDjs.create().toString();
        this.el = null;
        this.init();
    }
    init(){
        const el = document.createElement('div');
        el.className = 'hat';
        el.style.left = `${this.l}px`;
        el.style.top = `${this.t}px`;
        el.style.width = this.w + 'px';
        el.style.height = this.h + 'px';
        this.el = el;
        document.body.appendChild(el);
    }
    destory() {
        document.body.removeChild(this.el);
    }
}