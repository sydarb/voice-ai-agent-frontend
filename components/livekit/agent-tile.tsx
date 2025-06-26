import { type AgentState, BarVisualizer, type TrackReference } from '@livekit/components-react';
import { cn } from '@/lib/utils';

interface AgentAudioTileProps {
  state: AgentState;
  audioTrack: TrackReference;
  className?: string;
}

export const AgentTile = ({
  state,
  audioTrack,
  className,
  ref,
}: React.ComponentProps<'div'> & AgentAudioTileProps) => {
  return (
    <div ref={ref} className={cn(className)}>
      <BarVisualizer
        barCount={3}
        state={state}
        trackRef={audioTrack}
        className={cn(
          'agent-waveform-bars',
          'flex w-40 h-24 items-end justify-center gap-2 -rotate-90',
        )}
      >
        <span
          className={cn([
            'bg-orange-700 h-full rounded-full',
            'origin-center transition-colors duration-250 ease-linear',
            'data-[lk-highlighted=true]:bg-orange-600 data-[lk-muted=true]:bg-muted',
          ])}
        />
      </BarVisualizer>
    </div>
  );
};