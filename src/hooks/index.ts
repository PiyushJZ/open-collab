import { LayerType, XYWH } from '@/interfaces';
import {
  useMutation as useDeleteMutation,
  useSelf,
  useStorage,
} from '@/liveblocks.config';
import { shallow } from '@liveblocks/react';
import { useMutation } from 'convex/react';
import { useState } from 'react';

const boundingBox = (layers: LayerType[]): XYWH | null => {
  const first = layers[0];
  if (!first) {
    return null;
  }

  let left = first.x;
  let top = first.y;
  let right = first.x + first.width;
  let bottom = first.y + first.height;

  for (const layer of layers) {
    const { x, y, width, height } = layer;
    if (x < left) {
      left = x;
    }
    if (y < top) {
      top = y;
    }
    if (x + width > right) {
      right = x + width;
    }
    if (y + height > bottom) {
      bottom = y + height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        setPending(false);
      });
  };

  return { mutate, pending };
};

export const useSelectionBounds = () => {
  const selection = useSelf(me => me.presence.selection);

  return useStorage(root => {
    const selectedLayers = selection
      .map(layerId => root.layers.get(layerId)!)
      .filter(Boolean);

    return boundingBox(selectedLayers);
  }, shallow);
};

export const useDeleteLayers = () => {
  const selection = useSelf(me => me.presence.selection);

  return useDeleteMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get('layers');
      const liveLayerIds = storage.get('layerIds');
      for (const id of selection) {
        liveLayers.delete(id);
        const index = liveLayerIds.indexOf(id);
        if (index != -1) {
          liveLayerIds.delete(index);
        }
      }
      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection],
  );
};
