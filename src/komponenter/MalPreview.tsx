// ./CustomPreview.js
import React from 'react';

import { PreviewProps } from 'sanity';

export const MalPreview: React.FC<PreviewProps> = ({ title, subtitle }) => {
  return (
    <div>
      <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
        <strong>
          {typeof title === 'function' ? React.createElement(title, { layout: 'default' }) : title}
        </strong>
      </div>
      {typeof subtitle === 'function'
        ? React.createElement(subtitle, { layout: 'default' })
        : subtitle}
    </div>
  );
};
