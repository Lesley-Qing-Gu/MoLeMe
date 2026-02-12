
import React, { useState, useEffect } from 'react';

interface Props {
  onFinish: () => void;
}

const FakeUpdate: React.FC<Props> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }

        // 模拟 99% 卡顿
        if (prev >= 99 && !isStuck) {
           setIsStuck(true);
           setTimeout(() => {
             setProgress(100);
           }, 4000); // 卡顿4秒
           return 99;
        }

        if (isStuck) return 99;

        const inc = prev < 85 ? Math.random() * 4 : Math.random() * 0.4;
        return Math.min(99, prev + inc);
      });
    }, 400);
    
    return () => clearInterval(timer);
  }, [isStuck]);

  return (
    <div className="fixed inset-0 z-[200] bg-blue-800 text-white flex flex-col items-center justify-center p-12 font-sans select-none">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl mb-6 font-light">正在配置更新</h1>
        <p className="text-xl mb-4 font-light">已完成 {Math.floor(progress)}%</p>
        <p className="text-sm opacity-80 mb-10">请勿关闭计算机。这将需要一段时间。</p>
        
        <div className="w-full h-1 bg-white/20 overflow-hidden relative rounded-full">
          <div 
            className="h-full bg-white transition-all duration-300 ease-linear shadow-[0_0_8px_white]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {isDone && (
          <div className="mt-16 flex flex-col items-center animate-fade-in">
             <p className="text-blue-200 font-bold mb-6">✓ 系统补丁包已成功加载</p>
             <button 
                onClick={onFinish}
                className="px-8 py-2 bg-white text-blue-800 font-bold win98-border hover:bg-gray-100"
             >
               完成并返回
             </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FakeUpdate;
