'use client';

import { CanvasMode, LayerTypes } from '@/constants';
import { Camera, CanvasProps, CanvasState, Color, Point } from '@/interfaces';
import { connectionIdToColor, pointerEventToCanvasPoint } from '@/lib/utils';
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from '@/liveblocks.config';
import { LiveObject } from '@liveblocks/client';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useState } from 'react';
import CursorsPresence from './CursorsPresence/CursorsPresence';
import Info from './Info';
import LayerPreview from './LayerPreview';
import Participants from './Participants';
import SelectionBox from './SelectionBox';
import Toolbar from './Toolbar';

const MAX_LAYERS = 100;

const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage(root => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
  });

  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const history = useHistory();
  const selections = useOthersMapped(other => other.presence.selection);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerTypes.ELLIPSE
        | LayerTypes.RECTANGLE
        | LayerTypes.TEXT
        | LayerTypes.NOTE,
      position: Point,
    ) => {
      const liveLayers = storage.get('layers');
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get('layerIds');
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.NONE });
    },
    [lastUsedColor],
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    setCamera(camera => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const handlePointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    [],
  );

  const handlePointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const handlePointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.INSERTING) {
        insertLayer(canvasState.layerTypes, point);
      } else {
        setCanvasState({ mode: CanvasMode.NONE });
      }
    },
    [camera, canvasState, history, insertLayer],
  );

  const handleLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.INSERTING ||
        canvasState.mode === CanvasMode.PENCIL
      ) {
        return;
      }
      history.pause();
      e.stopPropagation();

      const Point = pointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.TRANSLATING, current: Point });
    },
    [setCanvasState, camera, history, canvasState.mode],
  );

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);

  return (
    <main className='relative h-screen w-screen touch-none bg-neutral-100'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className='h-screen w-screen'
        onWheel={handleWheel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map(layerId => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={handleLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={() => {}} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
