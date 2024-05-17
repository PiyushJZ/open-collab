import { RectangleLayerProps } from '@/interfaces';

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectionColor,
}: RectangleLayerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className='drop-shadow-md'
      onPointerDown={e => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      fill={'#000'}
      stroke={'transparent'}
      strokeWidth={1}
    />
  );
};

export default Rectangle;
