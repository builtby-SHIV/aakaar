export async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 3840 }, height: { ideal: 2160 }, deviceId: {  } },
        audio: true
    });

    const mimeTypes = [
        'video/webm;codecs=av1,opus',       // Next-gen (High Res / Highly Efficient)
        'video/mp4;codecs=hvc1,mp4a.40.2',  // HEVC / H.265 (Excellent 4K for Safari/Apple)
        'video/webm;codecs=vp9,opus',      // VP9 (Great 4K for Chrome/Firefox)
        'video/webm;codecs=h264,opus',     // H.264 WebM (High Compatibility)
        'video/mp4;codecs=avc1.4d401f,mp4a.40.2', // Universal H.264 MP4 (Fallback)
    ];

    let selectedMime = '';
    for ( const mime of mimeTypes ) {
        if (MediaRecorder.isTypeSupported(mime)) {
            selectedMime = mime;
            break;
        }
    }

    const options = selectedMime ? { mimeType: selectedMime } : {};
    const mediaRecorder = new MediaRecorder(stream, options);
    
    console.log(`Recording started using: ${selectedMime || 'Browser Default'}`);
    return mediaRecorder;
}