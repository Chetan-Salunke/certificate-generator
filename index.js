const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const photo = document.getElementById('photo');
        const captureBtn = document.getElementById('captureBtn');
        const downloadBtn = document.getElementById('downloadBtn');


        // Access the camera
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.error('Error accessing the camera: ' + err);
            });

        // Function to capture photo
        captureBtn.addEventListener('click', function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            // Show captured photo
            photo.src = canvas.toDataURL('image/png');
            // Hide the video feed
            video.style.display = 'none';
        });
        downloadBtn.addEventListener('click', function () {
            // Take screenshot of the entire webpage
            html2canvas(document.body).then(function (canvas) {
                // Convert canvas to image
                const screenshotDataUrl = canvas.toDataURL('image/png');
                // Create a temporary link element
                const link = document.createElement('a');
                link.href = screenshotDataUrl;
                link.download = 'screenshot.png';
                // Trigger the download
                link.click();
            });
        });