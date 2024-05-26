import { NoteLayerProps } from '@/interfaces';
import { cn, colorToCss, getContrastColor } from '@/lib/utils';
import { useMutation } from '@/liveblocks.config';
import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const sizeFromWidth = width * scaleFactor;
  const sizeFromHeight = height * scaleFactor;
  const fontSize = Math.min(sizeFromWidth, sizeFromHeight, maxFontSize);
  return fontSize;
};

const Note = ({ id, layer, onPointerDown, selectionColor }: NoteLayerProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers');
    liveLayers.get(id)?.set('value', newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={e => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        background: fill ? colorToCss(fill) : '#000',
      }}
      className='shadow-md drop-shadow-xl'
    >
      <ContentEditable
        html={value ?? 'Note'}
        onChange={handleContentChange}
        className={cn(
          'flex h-full w-full items-center justify-center text-center outline-none',
          font.className,
        )}
        style={{
          color: fill ? getContrastColor(fill) : '#000',
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};

export default Note;
