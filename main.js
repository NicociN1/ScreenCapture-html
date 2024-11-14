import { Capture } from './capture.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded')
    const triggerButton = document.querySelector('#capture_button');
    const videos = document.querySelector('#videos');

    triggerButton.addEventListener('click', async () => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'video-item';
        const controlDiv = document.createElement('div');
        controlDiv.className = 'control-item';

        const video = document.createElement('video');
        video.controls = true;
        video.width = 768;
        video.height = 432;
        video.autoplay = true;
        video.muted = true;

        const capture = new Capture();
        await capture.start();

        video.srcObject = capture.mediaStream;

        const downloadAnchor = document.createElement('a');
        downloadAnchor.className = 'download-anchor';
        downloadAnchor.textContent = '録画中'

        const stopButton = document.createElement('button');
        stopButton.textContent = '停止'
        stopButton.className = 'stop-button'
        stopButton.addEventListener('click', () => capture.stop());

        videoDiv.appendChild(video);
        videoDiv.appendChild(controlDiv);
        controlDiv.appendChild(downloadAnchor);
        controlDiv.appendChild(stopButton)
        videos.appendChild(videoDiv);

        capture.mediaRecorder.onstop = async function () {
            const url = await capture.toUrl()
            video.src = url;
            video.muted = false;
            downloadAnchor.href = url;
            downloadAnchor.download = 'video.mp4';
            downloadAnchor.textContent = 'ダウンロード';
            stopButton.disabled = true;
        }
    })
})