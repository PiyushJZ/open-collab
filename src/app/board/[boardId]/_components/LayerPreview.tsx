'use client';

import { LayerTypes } from '@/constants';
import { LayerPreviewProps } from '@/interfaces';
import { colorToCss } from '@/lib/utils';
import { useStorage } from '@/liveblocks.config';
import { memo } from 'react';
import { Ellipse, Note, Path, Rectangle, Text } from './Layers';

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
      case LayerTypes.ELLIPSE:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerTypes.TEXT:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerTypes.NOTE:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerTypes.PATH:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={e => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : '#000'}
            stroke={selectionColor}
          />
        );
      default:
        return null;
    }
  },
);

LayerPreview.displayName = 'LayerPreview';

export default LayerPreview;
