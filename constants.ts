
import { Quest, SlackingLevel } from './types';

export const INITIAL_SALARY = 300; // Average placeholder

export const QUESTS: Quest[] = [
  { id: '1', title: '敲木鱼消业障', description: '点击木鱼10次，清空今日被老板PUA产生的怨气。', icon: '🙏' },
  { id: '2', title: '假装系统更新', description: '开启全屏进度条，理直气壮地去接杯咖啡。', icon: '⏳' },
  { id: '3', title: '虚拟文档涂鸦', description: '在老板的“虚影”上画个胡子。', icon: '🎨' },
  { id: '4', title: '深呼吸大法', description: '连续深呼吸3次，告诉自己钱是公司的，命是自己的。', icon: '🧘' },
  { id: '5', title: '带薪如厕', description: '在洗手间停留超过5分钟，完成一次生理与心理的双重释放。', icon: '🚽' }
];

export const LEVEL_CONFIG = [
  { threshold: 0, title: SlackingLevel.WORK_HORSE },
  { threshold: 300, title: SlackingLevel.RESOURCEFUL_MULE },
  { threshold: 1200, title: SlackingLevel.OFFICE_PHANTOM },
  { threshold: 3600, title: SlackingLevel.SALARY_THIEF },
  { threshold: 10800, title: SlackingLevel.MO_KING },
];

export const REMINDERS = [
  "老板刚才换了特斯拉，你多加的一小时班贡献了四个轮毂。",
  "如果今天你没摸鱼，那明天你的工作量只会翻倍。",
  "摸鱼不是懒惰，是打工人的最后尊严。",
  "去接杯水吧，那是你应得的、不包含在KPI里的水分。",
  "盯屏幕太久了，看一眼窗外（如果没有窗，就看一眼同事焦虑的脸）。"
];

export const SUCCESS_MESSAGES = [
  "恭喜！你刚刚成功从公司‘偷’回了5块钱。",
  "打卡成功。今日摸鱼额度已消耗 15%，请继续保持。",
  "职场英雄！你用沉默对抗了内卷。"
];
