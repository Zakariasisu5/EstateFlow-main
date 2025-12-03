import { useState, useCallback } from 'react';
import { dummyProperties } from '@/data/dummyProperties';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useRealtimeChat = () => {
  const [isStreaming, setIsStreaming] = useState(false);

  const streamChat = useCallback(async ({
    messages,
    onDelta,
    onPropertyIds,
    onDone,
    onError,
  }: {
    messages: Message[];
    onDelta: (deltaText: string) => void;
    onPropertyIds: (ids: string[]) => void;
    onDone: () => void;
    onError: (error: string) => void;
  }) => {
    setIsStreaming(true);
    let fullResponse = '';

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/realtime-concierge`;
      
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages,
          properties: dummyProperties 
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          onError('Rate limit exceeded. Please try again in a moment.');
          setIsStreaming(false);
          return;
        }
        if (resp.status === 402) {
          onError('AI service unavailable. Please contact support.');
          setIsStreaming(false);
          return;
        }
        throw new Error('Failed to start stream');
      }

      if (!resp.body) {
        throw new Error('No response body');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullResponse += content;
              onDelta(content);
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Parse property IDs from response
      const propertyMatch = fullResponse.match(/PROPERTIES:\s*\[([\d,\s]+)\]/);
      if (propertyMatch) {
        const ids = propertyMatch[1].split(',').map(id => id.trim());
        onPropertyIds(ids);
      }

      onDone();
    } catch (error) {
      console.error('Stream error:', error);
      onError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return {
    streamChat,
    isStreaming,
  };
};
