import cx from 'classnames';

import Footer from 'components/Footer';
import LayoutSwitcher from 'components/LayoutSwitcher';
import PiPWindow from 'components/PiPWindow';
import VideoStreams from 'components/VideoStreams';
import { useLayout } from 'contexts/layout';
import { useMediaDevices } from 'contexts/mediaDevices';
import { usePictureInPicture } from 'contexts/pictureInPicture';
import { useStreams } from 'contexts/streams';
import useKeyboardShorcut from 'hooks/useKeyboardShortcut';

import styles from './App.module.css';

const App = () => {
  const { layout } = useLayout();
  const { cameraStream, screenshareStream } = useStreams();
  const { pipWindow } = usePictureInPicture();
  const {
    cameraEnabled,
    microphoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
  } = useMediaDevices();

  useKeyboardShorcut('e', () => setCameraEnabled(!cameraEnabled));
  useKeyboardShorcut('d', () => setMicrophoneEnabled(!microphoneEnabled));

  return (
    <div
      className={cx(styles.root, {
        [styles.placeholder]:
          layout === 'cameraOnly' ? !cameraStream : !screenshareStream,
      })}
    >
      <main className={styles.main}>
        {/* VideoStreams component with adjusted size */}
        <div className={styles.videoContainer}>
          <VideoStreams />
        </div>

        {/* Text below the video */}
        <div className={styles.textBelowVideo}>
          <p>Your text goes here</p>
        </div>
        {/* End of text */}
        
        <LayoutSwitcher />
      </main>

      {/* Footer component */}
      <Footer />

      {/* PiPWindow component */}
      {pipWindow && <PiPWindow pipWindow={pipWindow} />}
    </div>
  );
};

export default App;
