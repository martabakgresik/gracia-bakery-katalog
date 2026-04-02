import ReactMarkdown from 'react-markdown';
import { MessageSquare, Phone, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  loadingTime: number;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, isLoading, loadingTime, messagesEndRef }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-900/50">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${msg.role === 'user'
              ? 'bg-primary text-white rounded-tr-sm'
              : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-tl-sm shadow-sm'
            }`}>
            {msg.role === 'assistant' ? (
              <div className="prose prose-sm prose-stone dark:prose-invert max-w-none [&_p]:mb-4 last:[&_p]:mb-0 leading-relaxed">
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => {
                      const isWhatsApp = props.href?.includes('wa.me');
                      const isTel = props.href?.startsWith('tel:');

                      if (isWhatsApp) {
                        return (
                          <a
                            {...(props as any)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl font-medium no-underline my-2 transition-colors shadow-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            WhatsApp Kami
                          </a>
                        );
                      }

                      if (isTel) {
                        return (
                          <a
                            {...(props as any)}
                            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-medium no-underline my-2 transition-colors shadow-sm"
                          >
                            <Phone className="w-4 h-4" />
                            Hubungi Telepon
                          </a>
                        );
                      }

                      return <a {...(props as any)} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />;
                    }
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex flex-col gap-1">
            <div className="flex items-center gap-2 text-primary dark:text-primary-light">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-medium animate-pulse">Gracia sedang berpikir...</span>
            </div>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 ml-6">
              Waktu tunggu: {loadingTime} detik
            </span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
