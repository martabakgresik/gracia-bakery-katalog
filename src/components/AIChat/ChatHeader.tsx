import { Store, Trash2, Minimize2, Maximize2, X } from 'lucide-react';

interface ChatHeaderProps {
  isLoading: boolean;
  isMaximized: boolean;
  setIsMaximized: (val: boolean) => void;
  onClear: () => void;
  onClose: () => void;
}

export function ChatHeader({ isLoading, isMaximized, setIsMaximized, onClear, onClose }: ChatHeaderProps) {
  return (
    <div className="bg-primary p-4 flex justify-between items-center text-white shrink-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/20">
          <Store className="w-6 h-6 text-white" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full"></span>
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold leading-tight truncate">Gracia Asisten</h3>
          <div className="flex items-center gap-1.5">
            {isLoading ? (
              <span className="text-[10px] text-white/80 flex items-center gap-1">
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                </span>
                Sedang mengetik...
              </span>
            ) : (
              <span className="text-[10px] text-white/80">Online</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-2 shrink-0">
        <button
          onClick={onClear}
          className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
          title="Hapus Percakapan"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsMaximized(!isMaximized)}
          className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
          title={isMaximized ? "Kecilkan" : "Besarkan"}
        >
          {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
