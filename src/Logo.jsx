import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Video } from "remotion";
import video from './video/logo.webm'

export const Logo = () => {
  const frame = useCurrentFrame();
  return (
    <Video
      src={"https://res.cloudinary.com/isita/video/upload/v1639856896/static/logo_vertical_t7tae2.mp4"}
      startFrom={0} // if video is 30fps, then it will start at 2s
      endAt={120} // if video is 30fps, then it will end at 4s
      style={{ height: 1080 / 2, width: 1920 / 2 }}
    />
  );
};
