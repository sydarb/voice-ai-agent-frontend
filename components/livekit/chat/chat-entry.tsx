import * as React from 'react';
import type { MessageFormatter, ReceivedChatMessage } from '@livekit/components-react';
import { cn } from '@/lib/utils';
import { useChatMessage } from './hooks/utils';
import { CarouselData, CompositeMessage } from '@/lib/types';
import { Carousel } from '../../carousel';

export interface ChatEntryProps extends React.HTMLAttributes<HTMLLIElement> {
  /** The chat massage object to display. */
  entry: ReceivedChatMessage;
  /** Hide sender name. Useful when displaying multiple consecutive chat messages from the same person. */
  hideName?: boolean;
  /** Hide message timestamp. */
  hideTimestamp?: boolean;
  /** An optional formatter for the message body. */
  messageFormatter?: MessageFormatter;
}

function isCompositeMessage(data: any): data is CompositeMessage {
  return data && typeof data.spokenResponse === 'string' && data.ui && data.ui.type === 'carousel';
}

export const ChatEntry = ({
  entry,
  messageFormatter,
  hideName,
  hideTimestamp,
  className,
  ...props
}: ChatEntryProps) => {
  const { message, hasBeenEdited, time, locale, name } = useChatMessage(entry, messageFormatter);

  const isUser = entry.from?.isLocal ?? false;
  const messageOrigin = isUser ? 'remote' : 'local';

  let compositeMessage: CompositeMessage | null = null;
  try {
    const parsedMessage = JSON.parse(message);
    if (isCompositeMessage(parsedMessage)) {
      compositeMessage = parsedMessage;
    }
  } catch (error) {
    // Not a JSON message, treat as plain text
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

      {compositeMessage ? (
        <div className={cn('flex flex-col gap-2 rounded-[20px] p-2', isUser ? 'bg-muted ml-auto' : 'mr-auto')}>
          <span>{compositeMessage.spokenResponse}</span>
          <Carousel items={compositeMessage.ui.items} />
        </div>
      ) : (
        <span className={cn('max-w-4/5 rounded-[20px] p-2', isUser ? 'bg-muted ml-auto' : 'mr-auto')}>
          {message}
        </span>
      )}
    </li>
  );
};
