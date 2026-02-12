
export interface SlackingData {
  dailySalary: number;
  totalSeconds: number;
  questsCompleted: string[];
  level: number;
  lastCheckIn: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export enum SlackingLevel {
  WORK_HORSE = '职场牛马',
  RESOURCEFUL_MULE = '进阶骡子',
  OFFICE_PHANTOM = '办公室幽灵',
  SALARY_THIEF = '薪水神偷',
  MO_KING = '摸鱼至尊'
}
