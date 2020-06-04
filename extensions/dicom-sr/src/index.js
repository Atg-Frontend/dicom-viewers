import React from 'react';
import getSopClassHandlerModule from './getSopClassHandlerModule';
import id from './id.js';

const Component = React.lazy(() => {
  return import('./OHIFCornerstoneSRViewport');
});

const OHIFCornerstoneSRViewport = props => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};

/**
 *
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id,

  /**
   *
   *
   * @param {object} [configuration={}]
   * @param {object|array} [configuration.csToolsConfig] - Passed directly to `initCornerstoneTools`
   */
  getViewportModule({ commandsManager }) {
    const ExtendedOHIFCornerstoneSRViewport = props => {
      const onNewImageHandler = jumpData => {
        commandsManager.runCommand('jumpToImage', jumpData);
      };
      return (
        <OHIFCornerstoneSRViewport {...props} onNewImage={onNewImageHandler} />
      );
    };

    return [{ name: 'dicom-sr', component: ExtendedOHIFCornerstoneSRViewport }];
  },
  getSopClassHandlerModule,
};