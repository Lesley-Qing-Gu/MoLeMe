
import React, { useState, useRef } from 'react';

const RecycleBinWindow: React.FC = () => {
  const [text, setText] = useState('');
  const [isCrumpling, setIsCrumpling] = useState(false);
  const [showBall, setShowBall] = useState(false);

  const handleDiscard = () => {
    if (!text.trim()) return;
    
    setIsCrumpling(true);
    
    // Simulate crumpling and throwing
    setTimeout(() => {
      setIsCrumpling(false);
      setShowBall(true);
      setText('');
      
      // Hide the ball after animation
      setTimeout(() => {
        setShowBall(false);
      }, 800);
    }, 400);
  };

  return (
    <div className="p-4 bg-[#c0c0c0] min-w-[340px] flex flex-col gap-3 relative">
      <div className="bg-white win98-border-inset p-2">
        <p className="text-[10px] font-bold text-gray-600 mb-2 uppercase">吐槽出口 (匿名发送至异次元):</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在这里输入你对公司或老板的不满..."
          className={`w-full h-32 p-2 text-xs win98-border-inset focus:outline-none transition-all duration-400 transform origin-center ${
            isCrumpling ? 'scale-0 rotate-[720deg] opacity-0' : 'scale-100 opacity-100'
          }`}
          disabled={isCrumpling}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[9px] text-gray-500 italic">垃圾话一经丢弃，概不退还。</span>
        <button
          onClick={handleDiscard}
          disabled={!text.trim() || isCrumpling}
          className="px-6 py-1 bg-[#c0c0c0] win98-border win98-button text-xs font-bold disabled:opacity-50"
        >
          揉成纸团丢掉
        </button>
      </div>

      {/* Throwing Animation Ball */}
      {showBall && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-throw">
          <div className="w-8 h-8 bg-gray-200 rounded-full border border-gray-400 shadow-md flex items-center justify-center overflow-hidden">
            <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,gray_2px,gray_4px)]" />
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center">
         <div className="text-4xl opacity-40 grayscale">🗑️</div>
      </div>

      <style>{`
        @keyframes throw {
          0% { 
            transform: translate(-50%, -50%) scale(1.2) rotate(0); 
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, 150px) scale(0.2) rotate(360deg); 
            opacity: 0;
          }
        }
        .animate-throw {
          animation: throw 0.8s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default RecycleBinWindow;
