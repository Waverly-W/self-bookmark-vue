import { ref, onMounted, watch } from 'vue';

export interface BookmarkSettings {
  // 文件夹设置
  folderIconSize: number;
  folderFontSize: number;
  folderFixedWidth: boolean;
  folderWidth: number;
  folderShowCount: boolean;
  
  // 书签设置
  bookmarkIconSize: number;
  bookmarkFontSize: number;
  bookmarkFixedWidth: boolean;
  bookmarkWidth: number;
  bookmarkOpenInNewTab: boolean;
  
  // 通用设置
  itemPadding: number;
  itemMargin: number;

  // 图标样式设置
  iconBorderWidth: number;
  iconBorderColor: string;
  iconBorderRadius: number;
  iconImageSize: number;
  iconBackgroundColor: string;
}

const defaultSettings: BookmarkSettings = {
  // 文件夹设置
  folderIconSize: 24,
  folderFontSize: 14,
  folderFixedWidth: false,
  folderWidth: 200,
  folderShowCount: true,
  
  // 书签设置
  bookmarkIconSize: 24,
  bookmarkFontSize: 14,
  bookmarkFixedWidth: false,
  bookmarkWidth: 200,
  bookmarkOpenInNewTab: true,
  
  // 通用设置
  itemPadding: 8,
  itemMargin: 4,

  // 图标样式设置
  iconBorderWidth: 1,
  iconBorderColor: "#E5E6EB",
  iconBorderRadius: 4,
  iconImageSize: 80, // 图标中图片占比，百分比
  iconBackgroundColor: "#FFFFFF",
};

// 创建一个全局的响应式设置对象
const globalSettings = ref<BookmarkSettings>({ ...defaultSettings });

export function useBookmarkSettings() {
  // 加载设置
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('bookmarkSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        globalSettings.value = { ...defaultSettings, ...parsedSettings };
      }
    } catch (error) {
      console.error('加载设置失败:', error);
    }
  };
  
  // 保存设置
  const saveSettings = (newSettings: Partial<BookmarkSettings>) => {
    globalSettings.value = { ...globalSettings.value, ...newSettings };
    localStorage.setItem('bookmarkSettings', JSON.stringify(globalSettings.value));
  };
  
  // 重置设置
  const resetSettings = () => {
    globalSettings.value = { ...defaultSettings };
    localStorage.setItem('bookmarkSettings', JSON.stringify(defaultSettings));
  };
  
  // 组件挂载时加载设置
  onMounted(() => {
    loadSettings();
  });
  
  return {
    settings: globalSettings,
    saveSettings,
    resetSettings,
    loadSettings,
  };
} 