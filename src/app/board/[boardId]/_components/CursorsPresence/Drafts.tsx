import { colorToCss } from '@/lib/utils';
import { useOthersMapped } from '@/liveblocks.config';
import { shallow } from '@liveblocks/client';
import { Path } from '../Layers';

const Drafts = () => {
  const others = useOthersMapped(
    other => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow,
  );
  return others.map(([key, other]) => {
    if (other.pencilDraft) {
      return (
        <Path
          key={key}
          points={other.pencilDraft}
          fill={other.penColor ? colorToCss(other.penColor) : '#000'}
          x={0}
          y={0}
        />
      );
    }
    return null;
  });
};

export default Drafts;
