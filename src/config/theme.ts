import { Theme } from 'devui-theme';
import { 
  infinityTheme, 
  provenceTheme, 
  sweetTheme, 
  deepTheme, 
  galaxyTheme 
} from 'devui-theme';

// 导出所有可用主题
export const themes = {
  infinityTheme,   // 无限主题（默认）
  provenceTheme,   // 紫罗兰主题
  sweetTheme,      // 蜜糖主题
  deepTheme,       // 深邃夜空主题
  galaxyTheme      // 追光主题
} as const;

export type ThemeType = keyof typeof themes;

// 主题配置选项
export const themeOptions = [
  { label: '无限主题', value: 'infinityTheme' },
  { label: '紫罗兰主题', value: 'provenceTheme' },
  { label: '蜜糖主题', value: 'sweetTheme' },
  { label: '深邃夜空主题', value: 'deepTheme' },
  { label: '追光主题', value: 'galaxyTheme' }
] as const; 