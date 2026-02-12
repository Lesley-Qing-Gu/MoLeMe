
import React, { useState, useEffect } from 'react';
import { SlackingData } from './types';
import { INITIAL_SALARY, QUESTS, LEVEL_CONFIG, REMINDERS, SUCCESS_MESSAGES } from './constants';
import Window from './components/Window';
import SlackingTimer from './components/SlackingTimer';
import WoodFish from './components/WoodFish';
import FakeUpdate from './components/FakeUpdate';
import PanicOverlay from './components/PanicOverlay';
import DoodleWindow from './components/DoodleWindow';
import RecycleBinWindow from './components/RecycleBinWindow';

const App: React.FC = () => {
  const [data, setData] = useState<SlackingData>(() => {
    const saved = localStorage.getItem('mo-le-me-data');
    if (saved) return JSON.parse(saved);
    return {
      dailySalary: INITIAL_SALARY,
      totalSeconds: 0,
      questsCompleted: [],
      level: 0,
      lastCheckIn: new Date().toLocaleDateString()
    };
  });

  const [isSlacking, setIsSlacking] = useState(false);
  const [isPanic, setIsPanic] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | null>('timer');
  const [showFakeUpdate, setShowFakeUpdate] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(REMINDERS[0]);
  const [showCheckInToast, setShowCheckInToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('mo-le-me-data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    let interval: any;
    if (isSlacking) {
      interval = setInterval(() => {
        setData(prev => ({
          ...prev,
          totalSeconds: prev.totalSeconds + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSlacking]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReminder(REMINDERS[Math.floor(Math.random() * REMINDERS.length)]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSalaryChange = (val: number) => {
    setData(prev => ({ ...prev, dailySalary: val }));
  };

  const completeQuest = (id: string) => {
    if (!data.questsCompleted.includes(id)) {
      setData(prev => ({
        ...prev,
        questsCompleted: [...prev.questsCompleted, id]
      }));
    }
  };

  const toggleSlacking = () => {
    const newState = !isSlacking;
    setIsSlacking(newState);
    if (newState) {
      setShowCheckInToast(true);
      setTimeout(() => setShowCheckInToast(false), 3000);
    }
  };

  const handleQuestAction = (id: string) => {
    switch(id) {
      case '1': setActiveWindow('muyu'); break;
      case '2': setShowFakeUpdate(true); break;
      case '3': setActiveWindow('doodle'); break;
      default: completeQuest(id); break;
    }
  };

  const currentLevelInfo = LEVEL_CONFIG.reduce((prev, curr) => 
    data.totalSeconds >= curr.threshold ? curr : prev
  , LEVEL_CONFIG[0]);

  return (
    <div className="relative w-screen h-screen select-none overflow-hidden">
      {/* Desktop Icons */}
      <div className="p-4 grid grid-cols-1 gap-6 w-24">
        <DesktopIcon icon="💻" label="我的电脑" onClick={() => setActiveWindow('timer')} />
        <DesktopIcon icon="🗂️" label="我的文件" onClick={() => setActiveWindow('quests')} />
        <DesktopIcon 
          icon={
            <svg viewBox="0 0 200 160" className="w-10 h-10">
              <path d="M40,110 Q30,110 30,90 Q30,50 100,40 Q170,40 170,90 Q170,120 150,130 Q130,140 100,140 Q60,140 40,110" fill="#a66e38" stroke="#5d3a1a" strokeWidth="4"/>
              <path d="M170,95 L110,95 Q90,95 85,105 Q80,115 95,120 L160,120" fill="#3d240e" stroke="#2a180a" strokeWidth="1"/>
              <rect x="50" y="140" width="100" height="15" fill="#ef4444" stroke="#eab308" strokeWidth="2" />
            </svg>
          } 
          label="我的邮箱" 
          onClick={() => setActiveWindow('muyu')} 
        />
        <DesktopIcon icon="🗑️" label="回收站" onClick={() => setActiveWindow('recycle')} />
      </div>

      {activeWindow === 'timer' && (
        <Window title="我的电脑 - 收益统计" onClose={() => setActiveWindow(null)}>
          <SlackingTimer 
            seconds={data.totalSeconds} 
            dailySalary={data.dailySalary} 
            onSalaryChange={handleSalaryChange}
            levelTitle={currentLevelInfo.title}
          />
        </Window>
      )}

      {activeWindow === 'quests' && (
        <Window title="我的文件 - 任务清单" onClose={() => setActiveWindow(null)}>
          <div className="p-4 bg-[#c0c0c0] min-w-[320px]">
            <h3 className="font-bold mb-2 underline">打工人自救目标</h3>
            <div className="space-y-2">
              {QUESTS.map(q => (
                <div key={q.id} className="flex items-center gap-2 p-2 win98-border-inset bg-white">
                  <span className="text-xl">{q.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-xs">{q.title}</p>
                    <p className="text-[9px] text-gray-500">{q.description}</p>
                  </div>
                  <button 
                    onClick={() => handleQuestAction(q.id)}
                    className={`px-2 py-1 text-xs win98-button bg-[#c0c0c0] win98-border ${data.questsCompleted.includes(q.id) ? 'text-green-800 font-bold' : ''}`}
                  >
                    {data.questsCompleted.includes(q.id) ? '✓ 已达成' : '去摸鱼'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Window>
      )}

      {activeWindow === 'muyu' && (
        <Window title="我的邮箱 - 功德接收" onClose={() => setActiveWindow(null)}>
          <WoodFish onFinish={() => {
            completeQuest('1');
            setTimeout(() => setActiveWindow('quests'), 1000);
          }} />
        </Window>
      )}

      {activeWindow === 'recycle' && (
        <Window title="回收站 - 垃圾话收集中心" onClose={() => setActiveWindow(null)}>
          <RecycleBinWindow />
        </Window>
      )}

      {activeWindow === 'doodle' && (
        <Window title="虚拟涂鸦窗口" onClose={() => setActiveWindow(null)}>
          <DoodleWindow onFinish={() => {
            completeQuest('3');
            setActiveWindow('quests');
          }} />
        </Window>
      )}

      {/* Floating Panic Button */}
      <button 
        onMouseEnter={() => setIsPanic(true)}
        onMouseLeave={() => setIsPanic(false)}
        className="fixed bottom-16 right-6 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-50 animate-pulse border-4 border-white"
      >
        <span className="text-xs font-bold text-center leading-none">老板<br/>来了</span>
      </button>

      {isPanic && <PanicOverlay />}
      {showFakeUpdate && <FakeUpdate onFinish={() => {
        setShowFakeUpdate(false);
        completeQuest('2');
        setActiveWindow('quests');
      }} />}

      {showCheckInToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] win98-border bg-[#ffffcc] p-4 shadow-lg animate-bounce border-2 border-black">
          <p className="font-bold text-sm text-green-800">✨ {SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)]}</p>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 taskbar flex items-center px-1 z-40">
        <button 
          onClick={toggleSlacking}
          className={`h-10 px-4 flex items-center gap-2 win98-border bg-[#c0c0c0] win98-button font-bold text-sm ${isSlacking ? 'win98-border-inset pt-1 pl-1' : ''}`}
        >
          <span className="bg-blue-800 text-white px-1 rounded-sm text-xs">Start</span>
          {isSlacking ? '工了么' : '摸了么'}
        </button>
        
        <div className="flex-1 ml-4 overflow-hidden h-8 bg-black/10 mx-2 px-2 win98-border-inset leading-8">
          <div className="text-[11px] text-gray-700 whitespace-nowrap animate-[scroll_25s_linear_infinite]">
             📢 当前状态：{isSlacking ? '🚀 带薪摸鱼中' : '💤 等待搬砖'} | 提示：{currentReminder} | 当前职级：{currentLevelInfo.title}
          </div>
        </div>

        <div className="win98-border-inset px-3 py-1 flex items-center gap-2 text-xs h-8">
          <span className="font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

const DesktopIcon: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/20 p-2 rounded group">
    <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all flex items-center justify-center">
      {typeof icon === 'string' ? icon : icon}
    </div>
    <span className="text-white text-[10px] text-center font-bold px-1 group-hover:bg-blue-800 whitespace-nowrap">
      {label}
    </span>
  </div>
);

export default App;
