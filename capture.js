export class Capture {
    /**
     * @type {MediaStream}
     */
    mediaStream = null
    /**
     * @type {MediaRecorder}
     */
    mediaRecorder = null
    /**
     * @type {Blob[]}
     */
    recordedChunks = []

    constructor() { }

    //Capture Start
    async start() {
        this.mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        this.mediaRecorder = new MediaRecorder(this.mediaStream, { mimeType: 'video/mp4' })
        this.recordedChunks = []
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        }

        this.mediaRecorder.start()
    }

    //Capture Stop
    async stop() {
        this.mediaRecorder.stop()
    }

    async toUrl() {
        this.mediaStream.getTracks().forEach(x => x.stop());
        const blob = new Blob(this.recordedChunks, { type: 'video/mp4' });
        const file = new File([blob], 'video.mp4', { type: 'video/mp4' });
        const url = URL.createObjectURL(file);
        return url;
    }
}