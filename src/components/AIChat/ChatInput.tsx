import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  isLoading: boolean;
  onSend: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function ChatInput({ input, setInput, isLoading, onSend, textareaRef }: ChatInputProps) {
  return (
    <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Ketik pesan..."
          className="flex-1 bg-stone-100 dark:bg-stone-800 border-transparent focus:bg-white dark:focus:bg-stone-900 focus:border-primary dark:focus:border-primary-light focus:ring-1 focus:ring-primary dark:focus:ring-primary-light rounded-2xl px-4 py-2.5 text-sm transition-all text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 resize-none max-h-[150px] overflow-y-auto scrollbar-thin"
          disabled={isLoading}
        />
        <button
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className="p-2.5 bg-primary text-white rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-[2px]"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
