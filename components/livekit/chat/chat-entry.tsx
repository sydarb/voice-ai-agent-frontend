import * as React from 'react';
import type { MessageFormatter, ReceivedChatMessage } from '@livekit/components-react';
import { cn } from '@/lib/utils';
import { useChatMessage } from './hooks/utils';
import { CarouselData, CompositeMessage, CarouselCardItem } from '@/lib/types';
import { Carousel } from '../../carousel';

// global state for last carousel
let lastCarouselRef: { items: CarouselCardItem[], selectItem: (index: number) => void } | null = null;

const setLastCarousel = (ref: { items: CarouselCardItem[], selectItem: (index: number) => void }) => {
  lastCarouselRef = ref;
};

const selectInLastCarousel = (index: number) => {
  if (lastCarouselRef) {
    lastCarouselRef.selectItem(index);
  }
};

export interface ChatEntryProps extends React.HTMLAttributes<HTMLLIElement> {
  /** The chat massage object to display. */
  entry: ReceivedChatMessage;
  /** Hide sender name. Useful when displaying multiple consecutive chat messages from the same person. */
  hideName?: boolean;
  /** Hide message timestamp. */
  hideTimestamp?: boolean;
  /** An optional formatter for the message body. */
  messageFormatter?: MessageFormatter;
  /** Function to send messages to the agent. */
  onSendMessage?: (message: string) => void;
}

function isCompositeMessage(data: any): data is CompositeMessage {
  return data && typeof data.spokenResponse === 'string' && (data.ui || data.ui_actions);
}

export const ChatEntry = ({
  entry,
  messageFormatter,
  hideName,
  hideTimestamp,
  className,
  onSendMessage,
  ...props
}: ChatEntryProps) => {
  const { message, hasBeenEdited, time, locale, name } = useChatMessage(entry, messageFormatter);

  const isUser = entry.from?.isLocal ?? false;
  const messageOrigin = isUser ? 'remote' : 'local';

  const [compositeMessage, setCompositeMessage] = React.useState<CompositeMessage | null>(null);

  React.useEffect(() => {
    if (typeof message === 'string' && message.trim().startsWith('{')) {
      try {
        const parsedMessage = JSON.parse(message);
        if (isCompositeMessage(parsedMessage)) {
          setCompositeMessage(parsedMessage);
        }
      } catch (e) {
        // Not a full JSON yet, do nothing
      }
    } else if (compositeMessage) {
        // Reset if the message is no longer a composite message
        setCompositeMessage(null);
    }
  }, [message]);

  React.useEffect(() => {
    if (compositeMessage?.ui_actions?.action === 'select_item') {
      selectInLastCarousel(compositeMessage.ui_actions.payload.index);
    }
  }, [compositeMessage]);
  
  const showCarousel = compositeMessage?.ui?.type === 'carousel';

  let displayMessage = message;
  if(compositeMessage){
    displayMessage = compositeMessage.spokenResponse;
  } else if (typeof message === 'string' && message.trim().startsWith('{')) {
      // It's likely a streaming, incomplete JSON
      const match = message.match(/"spokenResponse"\s*:\s*"([^"]*)/);
      if (match && match[1]) {
        displayMessage = match[1];
      } else {
        // If we can't even find a partial spokenResponse, don't show anything
        displayMessage = '...';
      }
  }


  return (
    <li
      data-lk-message-origin={messageOrigin}
      title={time.toLocaleTimeString(locale, { timeStyle: 'full' })}
      className={cn('group flex flex-col gap-0.5', className)}
      {...props}
    >
      {(!hideTimestamp || !hideName || hasBeenEdited) && (
        <span className="text-muted-foreground flex text-sm">
          {!hideName && <strong className="mt-2">{name}</strong>}

          {!hideTimestamp && (
            <span className="align-self-end ml-auto font-mono text-xs opacity-0 transition-opacity ease-linear group-hover:opacity-100">
              {hasBeenEdited && '*'}
              {time.toLocaleTimeString(locale, { timeStyle: 'short' })}
            </span>
          )}
        </span>
      )}

      <div className={cn('flex flex-col gap-2 rounded-[20px] p-2 min-w-0', isUser ? 'bg-muted ml-auto' : 'mr-auto')} style={{ maxWidth: '100%' }}>
          <span className="sticky left-0 bg-inherit z-10">{displayMessage}</span>
          {showCarousel && (
            <Carousel 
              items={compositeMessage.ui.items} 
              onSendToAgent={onSendMessage}
              onCarouselMount={setLastCarousel}
            />
          )}
        </div>
    </li>
  );
};