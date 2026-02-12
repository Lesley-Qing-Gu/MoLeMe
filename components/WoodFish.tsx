
import React, { useState } from 'react';

interface Props {
  onFinish?: () => void;
}

const WoodFish: React.FC<Props> = ({ onFinish }) => {
  const [count, setCount] = useState(0);
  const [isHitting, setIsHitting] = useState(false);
  const [pops, setPops] = useState<{ id: number, text: string }[]>([]);

  const handleKnock = () => {
    const newCount = count + 1;
    setCount(newCount);
    setIsHitting(true);
    
    const id = Date.now();
    setPops(prev => [...prev, { id, text: '功德 +1' }]);
    
    // 震动回弹效果
    setTimeout(() => setIsHitting(false), 80);
    // 1秒后移除弹出文字
    setTimeout(() => setPops(prev => prev.filter(p => p.id !== id)), 1000);

    if (newCount === 10 && onFinish) {
      onFinish();
    }
  };

  return (
    <div className="p-10 bg-gray-100 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden win98-border-inset">
      <div className="absolute top-2 right-2 text-[9px] font-mono text-gray-500 bg-white/50 px-1">
        功德进度: {count}/10
      </div>

      <div className="relative cursor-pointer select-none group" onClick={handleKnock}>
        {/* 锦缎软垫 - 红黄相间方格样式 */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-16 bg-[#ef4444] border-2 border-[#eab308] shadow-md flex items-center justify-center overflow-hidden">
            {/* 方格纹理 */}
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,#eab308_20px,#eab308_40px)]" />
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(-45deg,transparent,transparent_20px,#eab308_20px,#eab308_40px)]" />
            <div className="w-full h-1 bg-yellow-400/30 absolute top-0" />
        </div>

        {/* 梨形木鱼 SVG */}
        <svg 
            viewBox="0 0 200 160" 
            className={`w-52 h-auto drop-shadow-xl transition-transform duration-75 ${isHitting ? 'scale-90 translate-y-1' : 'hover:scale-105'}`}
        >
          {/* 主体 - 梨形优化 */}
          <path 
            d="M40,110 Q30,110 30,90 Q30,45 100,35 Q180,45 180,90 Q180,125 150,135 Q125,145 100,145 Q55,145 40,110" 
            fill="#bd804b" 
            stroke="#5d3a1a" 
            strokeWidth="4"
          />
          {/* 木质纹理光泽 */}
          <ellipse cx="80" cy="70" rx="30" ry="15" fill="#d4a373" opacity="0.2" transform="rotate(-20 80 70)"/>
          
          {/* 发声孔/开口 - 模拟实物深色缝隙 */}
          <path 
            d="M180,90 L105,90 Q85,90 80,105 Q75,120 95,125 L165,125" 
            fill="#3d240e" 
            stroke="#2a180a" 
            strokeWidth="1"
          />
          {/* 装饰细节 */}
          <circle cx="60" cy="80" r="4" fill="#3d240e" opacity="0.6" />
        </svg>

        {/* 敲击锤 - 模拟实物木棍 */}
        <div 
          className={`absolute -right-16 -top-4 transition-transform origin-bottom ${isHitting ? 'rotate-[-45deg]' : 'rotate-0'}`}
          style={{ transitionDuration: '60ms' }}
        >
          <div className="w-2 h-24 bg-[#dcc4a3] border border-[#a66e38] rounded-sm" />
          <div className="absolute -top-4 -left-3 w-8 h-8 bg-[#fdfdfd] rounded-full border-2 border-gray-200 shadow-sm" />
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-5xl font-mono font-bold text-gray-800 drop-shadow-sm">{count}</p>
        <p className="text-[11px] text-gray-500 mt-2 uppercase tracking-[0.2em] font-bold">心中无KPI 功德自然来</p>
      </div>

      {/* 动画弹窗 */}
      {pops.map(pop => (
        <div 
          key={pop.id}
          className="absolute text-blue-900 font-bold text-xl animate-muyu-float pointer-events-none"
          style={{ left: '50%', top: '30%', transform: 'translateX(-50%)' }}
        >
          {pop.text}
        </div>
      ))}

      <style>{`
        @keyframes muyu-float {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -80px); }
        }
        .animate-muyu-float {
          animation: muyu-float 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WoodFish;
