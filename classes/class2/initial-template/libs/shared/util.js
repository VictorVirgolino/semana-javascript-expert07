function suportsWorkertype(){
    let supports = false

    const tester = {
        get type() {supports = true}
    }
    try {
        new Worker('blob://', tester).terminate()
    } finally {
        return supports
    }
}


function prepareRunChecker({timerDelay}){
    let lastevent = Date.now()
    return {
        shouldRun(){
            const result = (Date.now() - lastevent) > timerDelay
            if(result) lastevent = Date.now()
            return result
        }
    }
}


export{
    suportsWorkertype,
    prepareRunChecker
}