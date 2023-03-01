export default class Camera {

    constructor(){
        this.video = document.createElement('video')
    }

    static async init(){
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available'
            )
        }
        const videoConfig = {
            audio: false,
            video: {
                width: globalThis.screen.availWidth,
                height: globalThis.screen.availHeight,
                frameRate:{
                    ideal: 60
                }
            }
        }
        const stream = await navigator.mediaDevices.getUserMedia(videoConfig)
        const camera = new Camera()
        camera.video.srcObject = stream

        camera.video.height = 240
        camera.video.width = 320
        document.body.append(camera.video)

        //aguarda a camera está pronta
        await new Promise((res)=>{
            camera.video.onloadedmetadata = ()=>{
                res(camera.video)
            }
        })

        camera.video.play()

        return camera
    }
}