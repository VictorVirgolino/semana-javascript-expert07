import { knownGestures, gesturesStrings } from "../util/gestures.js"

export default class HandGestureService{
    #gestureEstimator
    #handPoseDetection
    #handsVersion
    #detector = null

    constructor({fingerpose, handPoseDetection, handsVersion}){
        this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures)
        this.#handPoseDetection = handPoseDetection
        this.#handsVersion = handsVersion
    }

    async estimate(keypoints3D){
        const predictions = await this.#gestureEstimator.estimate(
            this.#getLandMarksFromKeypoints(keypoints3D),
            9
        )
        return predictions.gestures
    }

    async * detectGestures(predictions){
        for(const hand of predictions){
            if(!hand.keypoints3D) continue
            const gestures = await this.estimate(hand.keypoints3D)
            if(!gestures.length) continue
            const {x,y} = hand.keypoints.find(keypoint=> keypoint.name ==='index_finger_tip')
            const result = gestures.reduce((p,n) => (p.score > n.score) ? p : n)
            yield {event: result.name,x,y}
            console.log('detected', gesturesStrings[result.name])
        }
    }

    #getLandMarksFromKeypoints(keypoints3D){
        return keypoints3D.map(keypoint => [keypoint.x, keypoint.y, keypoint.z])
    }

    async initializeDetector(){
        if(this.#detector) return this.#detector

        const detectorConfig = {
            runtime: 'mediapipe',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`,
            //full é mais pesado e preciso
            modelType: 'lite',
            maxHands: 2
        }
       this.#detector = await this.#handPoseDetection.createDetector(this.#handPoseDetection.SupportedModels.MediaPipeHands, detectorConfig)

        return this.#detector
    }


    async estimateHands(video){
        return this.#detector.estimateHands(video,{
            flipHorizontal: true,

        })
    }
}