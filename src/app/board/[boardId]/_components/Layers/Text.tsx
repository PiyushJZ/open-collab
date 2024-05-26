import { TextLayerProps } from '@/interfaces';
import { cn, colorToCss } from '@/lib/utils';
import { useMutation } from '@/liveblocks.config';
import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const sizeFromWidth = width * scaleFactor;
  const sizeFromHeight = height * scaleFactor;
  const fontSize = Math.min(sizeFromWidth, sizeFromHeight, maxFontSize);
  return fontSize;
};

const Text = ({ id, layer, onPointerDown, selectionColor }: TextLayerProps) => {
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
      }}
    >
      <ContentEditable
        html={value ?? 'Text'}
        onChange={handleContentChange}
        className={cn(
          'flex h-full w-full items-center justify-center text-center outline-none drop-shadow-md',
          font.className,
        )}
        style={{
          color: fill ? colorToCss(fill) : '#000',
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};

export default Text;
