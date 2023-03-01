export default class View{
    #btnInit = document.querySelector('#init')
    #statusElement = document.querySelector('#status')
    #videoFrameCanvas = document.createElement('canvas')
    #canvasContext = this.#videoFrameCanvas.getContext('2d', {willReadFrequently: true})
    #videoElement = document.querySelector('#video')
    enableButton(){
        this.#btnInit.disabled = false
    }

    configureOnBtnClick(fn){
        this.#btnInit.addEventListener('click', fn)
    }

    log(text){
        this.#statusElement.innerHTML = text
    }
    
    getVideoFrame(video){
        const canvas = this.#videoFrameCanvas
        const [width, height] = [video.videoWidth, video.videoHeight]
        canvas.width = width
        canvas.height = height

        this.#canvasContext.drawImage(video, 0, 0, width, height)
        return this.#canvasContext.getImageData(0,0,width,height)
    }

    togglePlayVideo(eye){
        if(eye == 'right'){
            if(this.#videoElement.paused) this.#videoElement.play()
            return;
        }
        else if(eye == 'left'){
            if(!this.#videoElement.paused) this.#videoElement.pause()
            return;
        }
        else if(eye == 'both'){
            if(this.#videoElement.paused){
                this.#videoElement.play()
                return;
            }
            this.#videoElement.pause()
        }
        

    }
}