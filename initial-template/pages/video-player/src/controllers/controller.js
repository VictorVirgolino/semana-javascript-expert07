export default class Controller{

    #view
    #service
    #worker
    #bothEyesBlinkedCounter = 0
    #leftBlinkedCounter = 0
    #rightBlinkedCounter = 0
    #camera
    constructor({view, service, worker, camera}){
        this.#view = view
        this.#service = service
        this.#camera = camera
        this.#worker = this.configureWorker(worker)
        this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
    }

    static async initialize(deps){
        const controller = new Controller(deps)
        controller.log('not yet detecting eye blink. Click in the button to start')
        return controller.init()
    }
 
    async init(){
        console.log('init!')
    }

    log(text){
        const timesBoth = ` -   blinked with both eyes times: ${this.#bothEyesBlinkedCounter}`
        const timesLeft = ` -   blinked with the left eye times: ${this.#leftBlinkedCounter}`
        const timesRight = ` -  blinked with the right eye times: ${this.#rightBlinkedCounter}`
        this.#view.log(`status: ${text}   <br />  ${timesBoth}  <br /> ${timesLeft}  <br /> ${timesRight}`)
    }

    onBtnStart(){
        this.log('initializing detection...')
        this.#bothEyesBlinkedCounter = 0
        this.#leftBlinkedCounter = 0
        this.#rightBlinkedCounter = 0
        this.loop()
    }

    configureWorker(worker){
        let ready = false
        worker.onmessage = ({data}) => {
            if('Ready' === data){
                console.log('worker is ready')
                this.#view.enableButton()
                ready = true
                return;
            }
            const blinked = data.blinked
            console.log({data})
            if(blinked){
                
                if(data.blinked == 'both'){
                    this.#bothEyesBlinkedCounter += 1
                    
                }
                else if(data.blinked == 'left'){
                    this.#leftBlinkedCounter += 1
                    
                }
                else if(data.blinked == 'right'){
                    this.#rightBlinkedCounter += 1
                    
                }
                this.#view.togglePlayVideo(data.blinked)
            }
        }
        return {
            send(msg){
                if(!ready) return;
                worker.postMessage(msg)
            }
        }
    }
    
    loop(){
        const video = this.#camera.video
        const img = this.#view.getVideoFrame(video)
        this.#worker.send(img)
        this.log('detecting eye blink...')
        setTimeout(()=> this.loop(), 100)
    }
}