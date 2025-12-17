# PromptiX Hero Video Enhancement Guide

## Overview
This guide covers the implementation and optimization of the full-screen background video for the PromptiX hero section.

## Video Requirements
- **Dimensions**: 1920x1080 (1080p) or 1280x720 (720p)
- **Format**: MP4 (H.264) and WebM (VP9) for broader compatibility
- **Duration**: 6-10 seconds (seamless loop)
- **File Size**: Under 5MB (critical for load time)
- **Audio**: Muted / No Audio track

## Optimization Steps (FFmpeg)

If you have FFmpeg installed, use these commands to optimize your video.

### 1. Remove Audio (Reduce Size)
```bash
ffmpeg -i input_video.mp4 -c copy -an output_silent.mp4
```

### 2. Compress MP4 (H.264)
Target ~2-3MB file size.
```bash
ffmpeg -i input_video.mp4 -vcodec libx264 -crf 28 -preset slow -an output_optimized.mp4
```

### 3. Generate WebM (Better Web Performance)
WebM often provides better quality at lower file sizes.
```bash
ffmpeg -i input_video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an output_optimized.webm
```

### 4. Create Poster Image
Extract the first frame to use as a loading placeholder.
```bash
ffmpeg -i input_video.mp4 -vframes 1 -q:v 2 video-poster.jpg
```

## Implementation Details

The `Hero.jsx` component is configured to:
1.  **Attrbutes**: Use `autoplay loop muted playsinline`
2.  **Preload**: Use `preload="auto"` since it is above the fold (LCP candidate), but we rely on `poster` for immediate visual feedback.
3.  **Sources**: Prioritizes `.webm` for supported browsers, falls back to `.mp4`.
4.  **Error Handling**: Hides video element on error to show fallback gradient.

```jsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="..."
  poster="/video-poster.jpg"
>
  <source src="/hero-background.webm" type="video/webm" />
  <source src="/hero-background.mp4" type="video/mp4" />
</video>
```

## Mobile Optimization
To prevent large data usage on mobile, the video can be hidden on small screens using Tailwind:
`hidden md:block` on the video container, showing a static background image instead. 
Current implementation keeps it visible but relies on thorough compression.
