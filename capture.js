export class Capture {
    /**
     * @type {MediaStream}
     */
    mediaStream = null
    mediaRecorder = null

    constructor() { }

    //Capture Start
    async start() {
        this.mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        this.mediaRecorder = new MediaRecorder(this.mediaStream, { mimeType: 'video/mp4' })
        const recordedChunks = []
        this.mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        }

        this.mediaRecorder.start()
    }

    //Capture Stop
    async stop() {
        this.mediaRecorder.stop()
    }
}