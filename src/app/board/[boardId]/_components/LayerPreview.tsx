'use client';

import { LayerTypes } from '@/constants';
import { LayerPreviewProps } from '@/interfaces';
import { useStorage } from '@/liveblocks.config';
import { memo } from 'react';
import { Rectangle } from './Layers';

const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage(root => root.layers.get(id));
    if (!layer) {
      return null;
    }

    // Rendering the layer based on the type
    switch (layer.type) {
      case LayerTypes.RECTANGLE:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn(`Unknown layer type: ${layer.type}`);
        return null;
    }
  },
);

LayerPreview.displayName = 'LayerPreview';

export default LayerPreview;
