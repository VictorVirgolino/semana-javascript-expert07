
export default class HandGestureView{
    #hands = document.querySelector('#hands')
    #handsContext = this.#hands.getContext('2d')
    #fingerLookupIndixes

    constructor(fingers){
        this.#fingerLookupIndixes = fingers.fingers
        this.#hands.width =  globalThis.screen.availWidth
        this.#hands.height = globalThis.screen.availHeight
    }

    clear(){
        this.#handsContext.clearRect(0,0, this.#hands.width, this.#hands.height)
    }

    drawResults(hands){
        for(const {keypoints, handedness} of hands){
            if(!keypoints) continue
            this.#handsContext.fillStyle = handedness === "Left" ? "#EE4B2B" : "#28C703"
            this.#handsContext.strokeStyle = "#E8BEAC"
            this.#handsContext.lineWidth = 8
            this.#handsContext.lineJoin = "round"

            this.#drawJoints(keypoints)
            this.#drawFingersAndHoverElements(keypoints)
        }
    }

    #drawJoints(keypoints){
        for(const {x,y} of keypoints){
            
            this.#handsContext.beginPath()
            
            const newX = x - 2
            const newY = y - 2
            const radius = 3
            const startAngle = 0
            const endAngle = 2 * Math.PI
            
            this.#handsContext.arc(newX, newY, radius, startAngle, endAngle)
            this.#handsContext.fill()

        }
    }

    #drawFingersAndHoverElements(keypoints){
        
        
        const fingers = Object.keys(this.#fingerLookupIndixes)
        for(const finger of fingers){
            
            const points = this.#fingerLookupIndixes[finger].map(
                
                index => keypoints[index]
            )
            const region = new Path2D()
            const [{x,y}] = points
            region.moveTo(x,y)
            for(const point of points){
                region.lineTo(point.x, point.y)
            }
            this.#handsContext.stroke(region)

        }
    }

    clickOnElement(x,y){
        const element = document.elementFromPoint(x,y)
        if(!element) return;
        console.log(element)
        const rect = element.getBoundingClientRect()
        const event = new MouseEvent('click',{
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: rect.left + x,
            clientY: rect.top + y
        })
        element.dispatchEvent(event)
    }

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