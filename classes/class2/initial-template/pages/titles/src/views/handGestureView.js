
export default class HandGestureView{
    constructor(){}

    loop(fn){
        requestAnimationFrame(fn)
    }

    scrollPage(top){
        scroll({
            top: top,
            behavior: "smooth"
        })
    }
}