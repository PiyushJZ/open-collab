'use client';

import { CanvasMode, LayerTypes, Side } from '@/constants';
import { useDisableScrollBounds } from '@/hooks';
import {
  Camera,
  CanvasProps,
  CanvasState,
  Color,
  FromInterface,
  LayerType,
  Point,
  XYWH,
} from '@/interfaces';
import {
  colorToCss,
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from '@/lib/utils';
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from '@/liveblocks.config';
import { LiveObject } from '@liveblocks/client';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useState } from 'react';
import CursorsPresence from './CursorsPresence/CursorsPresence';
import Info from './Info';
import LayerPreview from './LayerPreview';
import { Path } from './Layers';
import Participants from './Participants';
import SelectionBox from './SelectionBox';
import SelectionTools from './SelectionTools';
import Toolbar from './Toolbar';

const MAX_LAYERS = 100;
const THRESHOLD_AREA = 5;

const Canvas = ({ boardId }: CanvasProps) => {
  useDisableScrollBounds();
  const layerIds = useStorage(root => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
  });

  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const history = useHistory();
  const selections = useOthersMapped(other => other.presence.selection);
  const pencilDraft = useSelf(me => me.presence.pencilDraft);

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

  const deselectAllLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.TRANSLATING) {
        return;
      }
      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get('layers');
      for (const layerId of self.presence.selection) {
        const layer = liveLayers.get(layerId);
        if (layer) {
          layer.update({
            x: layer.get('x') + offset.x,
            y: layer.get('y') + offset.y,
          });
        }
      }
      setCanvasState({ current: point, mode: CanvasMode.TRANSLATING });
    },
    [canvasState],
  );

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get('layers');
      setCanvasState({ mode: CanvasMode.SELECTION_NET, origin, current });
      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current,
      );
      setMyPresence({ selection: ids }, { addToHistory: true });
    },
    [],
  );

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    const currentArea =
      Math.abs(current.x - origin.x) * Math.abs(current.y - origin.y);
    if (currentArea > THRESHOLD_AREA) {
      setCanvasState({ mode: CanvasMode.SELECTION_NET, origin, current });
    }
  }, []);

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor],
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;
      if (
        canvasState.mode !== CanvasMode.PENCIL ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get('layers');
      const { pencilDraft } = self.presence;
      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      const pathLayer = penPointsToPathLayer(pencilDraft, lastUsedColor);
      liveLayers.set(id, new LiveObject<FromInterface<LayerType>>(pathLayer));

      const liveLayerIds = storage.get('layerIds');
      liveLayerIds.push(id);
      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.PENCIL });
    },
    [lastUsedColor],
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.RESIZING) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBound,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get('layers');
      const layer = liveLayers.get(self.presence.selection[0]);
      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState],
  );

  const handleResizeHandlePointerDown = useCallback(
    (corner: Side, initialBound: XYWH) => {
      history.pause();
      setCanvasState({ mode: CanvasMode.RESIZING, initialBound, corner });
    },
    [history],
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
      if (canvasState.mode === CanvasMode.PRESSING) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SELECTION_NET) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.TRANSLATING) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasMode.RESIZING) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.PENCIL) {
        continueDrawing(current, e);
      }

      setMyPresence({ cursor: current });
    },
    [
      camera,
      canvasState,
      resizeSelectedLayer,
      translateSelectedLayers,
      continueDrawing,
    ],
  );

  const handlePointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (canvasState.mode === CanvasMode.INSERTING) {
        return;
      }
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.PENCIL) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ mode: CanvasMode.PRESSING, origin: point });
    },
    [camera, canvasState, setCanvasState, startDrawing],
  );

  const handlePointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.PRESSING ||
        canvasState.mode === CanvasMode.NONE
      ) {
        deselectAllLayers();
        setCanvasState({ mode: CanvasMode.NONE });
      } else if (canvasState.mode === CanvasMode.PENCIL) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.INSERTING) {
        insertLayer(canvasState.layerTypes, point);
      } else {
        setCanvasState({ mode: CanvasMode.NONE });
      }
    },
    [
      camera,
      canvasState,
      setCanvasState,
      history,
      insertLayer,
      deselectAllLayers,
      insertPath,
    ],
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
      <SelectionTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
      />
      <svg
        className='h-screen w-screen'
        onWheel={handleWheel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
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
          <SelectionBox
            onResizeHandlePointerDown={handleResizeHandlePointerDown}
          />
          {canvasState.mode === CanvasMode.SELECTION_NET &&
          !!canvasState.current ? (
            <>
              <rect
                className='fill-blue-500/5 stroke-blue-500 stroke-1'
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            </>
          ) : (
            <></>
          )}
          <CursorsPresence />
          {pencilDraft != null && pencilDraft.length > 0 ? (
            <Path
              points={pencilDraft}
              fill={colorToCss(lastUsedColor)}
              x={0}
              y={0}
            />
          ) : (
            <></>
          )}
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
