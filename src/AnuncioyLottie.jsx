import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Logo } from './Logo'

export const AnuncioyLottie = () => {
  const frame = useCurrentFrame();



  return (
    <Sequence from={0}>
      <Logo />
    </Sequence>

  );
};
