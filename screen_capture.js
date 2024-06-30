document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded')
    const triggerButton = document.querySelector('#capture_button');
    const videos = document.querySelector('#videos');

    triggerButton.addEventListener('click', async () => {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/mp4' })
        const recordedChunks = []
        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.start()

        const div = document.createElement('div');
        div.className = 'video-item';

        const video = document.createElement('video');
        video.srcObject = mediaStream;
        video.controls = true;
        video.width = 768;
        video.height = 432;
        video.autoplay = true;

        const downloadAnchor = document.createElement('a');
        downloadAnchor.className = 'download-anchor';
        downloadAnchor.textContent = '録画中...'

        div.appendChild(video);
        div.appendChild(downloadAnchor);
        videos.appendChild(div);

        mediaRecorder.onstop = function () {
            video.srcObject = null;
            const blob = new Blob(recordedChunks, { type: 'video/mp4' });
            const file = new File([blob], 'recorded-video.mp4', { type: 'video/mp4' });
            const url = URL.createObjectURL(file);
            video.src = url;
            downloadAnchor.href = url;
            downloadAnchor.download = file.name;
            downloadAnchor.textContent = 'ダウンロード';
        }
    })
})