
import React, { useRef, useState } from 'react';

interface Props {
  onFinish: () => void;
}

const DoodleWindow: React.FC<Props> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <div className="p-4 bg-[#c0c0c0] flex flex-col gap-3 min-w-[360px]">
      <div className="bg-white win98-border-inset p-2 text-[10px] text-red-600 font-bold">
        ⚠ 检测到老板的敏感邮件，请立刻通过乱涂乱画进行覆盖！
      </div>
      
      <div className="relative bg-white win98-border-inset overflow-hidden cursor-crosshair">
        <div className="absolute inset-0 p-4 opacity-10 pointer-events-none text-[8px] leading-relaxed">
            <h2 className="font-bold text-lg">TOP SECRET: KPI REDUCTION PLAN</h2>
            <p>1. Target: Reduce departmental coffee budget by 95%...</p>
            <p>2. Strategy: Implement compulsory weekend overtime without pay...</p>
            <p>3. Goal: Reach 300% growth with 0% investment...</p>
            <div className="mt-4 border-t border-black pt-2">APPROVED BY: BOSS</div>
        </div>
        
        <canvas 
          ref={canvasRef}
          width={360}
          height={260}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="relative z-10"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            ctx?.clearRect(0,0,360,260);
        }} className="px-3 py-1 bg-[#c0c0c0] win98-border text-xs win98-button">清除</button>
        <button onClick={onFinish} className="px-3 py-1 bg-blue-800 text-white win98-border text-xs win98-button font-bold">保存并隐藏</button>
      </div>
    </div>
  );
};

export default DoodleWindow;
