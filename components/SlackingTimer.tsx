
import React from 'react';

interface Props {
  seconds: number;
  dailySalary: number;
  onSalaryChange: (val: number) => void;
  levelTitle: string;
}

const SlackingTimer: React.FC<Props> = ({ seconds, dailySalary, onSalaryChange, levelTitle }) => {
  // Formula: (Salary / 8 / 3600) * seconds
  const hourlyRate = dailySalary / 8;
  const secondRate = hourlyRate / 3600;
  const earnings = (secondRate * seconds).toFixed(4);

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-4 win98-border-inset min-w-[300px] space-y-4">
      <div className="text-center">
        <p className="text-xs text-gray-500 font-bold mb-1">今日摸鱼时长</p>
        <p className="text-4xl font-mono bg-black text-green-400 p-2 win98-border-inset">
          {formatTime(seconds)}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span>带薪收益 (CNY):</span>
          <span className="font-bold text-blue-800 text-lg">¥ {earnings}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span>当前等级:</span>
          <span className="px-2 py-0.5 bg-yellow-400 font-bold win98-border">{levelTitle}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300">
        <label className="text-[10px] font-bold block mb-1">日薪设定 (别骗自己):</label>
        <div className="flex gap-2">
          <input 
            type="number" 
            value={dailySalary}
            onChange={(e) => onSalaryChange(Number(e.target.value))}
            className="flex-1 px-2 py-1 win98-border-inset text-sm focus:outline-none"
          />
          <button className="px-3 py-1 bg-[#c0c0c0] win98-border text-xs win98-button">确认</button>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 italic text-center">
        *注：每分钟收益约等于一次心理按摩。
      </p>
    </div>
  );
};

export default SlackingTimer;
