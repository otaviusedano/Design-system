import React from 'react';

import './full-screen-loader.css';

export interface FullScreenLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const FullScreenLoader = ({
  message,
  size = 'medium',
}: FullScreenLoaderProps) => {
  return (
    <div className="storybook-full-screen-loader">
      <div
        className={[
          'storybook-full-screen-loader__spinner',
          `storybook-full-screen-loader__spinner--${size}`,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="storybook-full-screen-loader__spinner-ring"></div>
      </div>
      {message && (
        <p className="storybook-full-screen-loader__message">{message}</p>
      )}
    </div>
  );
};
