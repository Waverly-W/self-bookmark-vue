import { ref } from 'vue';
import { ThemeServiceInit, type Theme } from 'devui-theme';
import { themes, type ThemeType } from '../config/theme';

// 创建一个单例的 themeService
const themeService = ThemeServiceInit(themes, 'infinityTheme');
const currentTheme = ref<ThemeType>('infinityTheme');

export function useTheme() {
  const switchTheme = (themeName: ThemeType) => {
    const theme = themes[themeName];
    if (theme && themeService) {
      themeService.applyTheme(theme);
      currentTheme.value = themeName;
      localStorage.setItem('theme', themeName);
    }
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      switchTheme(savedTheme);
    }
  };

  return {
    currentTheme,
    switchTheme,
    initTheme
  };
} 