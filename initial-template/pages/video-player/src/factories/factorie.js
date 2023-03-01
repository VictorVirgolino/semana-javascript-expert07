import Controller from "../controllers/controller.js"
import Service from "../services/service.js"
import View from "../views/view.js"
import Camera from "../../../../libs/shared/camera.js"
import { suportsWorkertype } from "../../../../libs/shared/util.js"

async function getWorker(){
    if(suportsWorkertype){
        console.log('initializing esm worker')
        const worker = new Worker('./src/workers/worker.js', {type: "module"})
        return worker
    }
    console.warn(`Your Browser doesn't support esm modules on  webworkers`)
    console.warn(`Importing Libraries...`)
    await import ("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js")
    await import ("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js")
    await import ("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js")
    await import ("https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js")
    
    console.log(`using worker mock instead`)
    const service = new Service({
        faceLandmarksDetection: window.faceLandmarksDetection
    })
    const workerMock = {
        async postMessage(video){
            const blinked = await service.handBlicked(video)
            if(!blinked) return
            workerMock.onmessage({data: {blinked}})
        },
        //vai ser sobrescrito pelo controller
        onmessage(msg){}
    }
    console.log("loading tf model...")
    await service.loadModel()
    console.log("tf model loaded...")
    setTimeout(()=>{
        worker.onmessage({data: "Ready"}, 200)
    })
    return workerMock
    
}

const worker = await getWorker()


const camera = await Camera.init()
const [rootPath] = window.location.href.split('/pages/')
const factory = {
    async initialize(){
        return Controller.initialize({
            view: new View(),
            service: new Service({}), 
            worker,
            camera
        })
    }
}

export default factory