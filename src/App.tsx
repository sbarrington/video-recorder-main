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
      {/* Text above the video */}
      <div className={styles.textAboveVideo}>
        <p>Video Recorder App</p>
        <p>Please use this webpage to record yourself responding to the prompts given to you in the study.</p>
        <ul class="round-bullets">
                <li>To record, press 'start recording'.</li>
                <li>To stop the recording, press 'stop recording'.</li>
            </ul>
        <p> Once you have completed recording:</p>
        <ul class="round-bullets">
                <li>A 'recording identifier' will be provided in blue. Copy this back into your survey response.</li>
                <li>You can re-record yourself as many times as you wish, but only paste the final identifier into the Turk response.</li>
            </ul>
      </div>
      {/* End of text */}

      <main className={styles.main}>
        {/* VideoStreams component with adjusted size */}
        <div className={styles.videoContainer}>
          <VideoStreams />
        </div>

        {/* Record button or other components */}
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
