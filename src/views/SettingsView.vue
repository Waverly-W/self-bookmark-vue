<template>
  <div class="settings-container">
    <d-tabs type="options" v-model="activeTab" custom-width="120px">
      <d-tab id="appearance" title="外观设置">
        <d-form :data="formData">
          <!-- 顶部预览区域 -->
          <div class="preview-section">
            <h3>预览效果</h3>
            <div class="preview-items-wrapper">
              <div class="preview-items">
                <Folder
                  folderName="示例文件夹"
                  :itemCount="5"
                  :iconSize="formData.folderIconSize"
                  :fontSize="formData.folderFontSize"
                  :padding="`${formData.itemPadding}px`"
                  :margin="`${formData.itemMargin}px`"
                  :fixedWidth="formData.folderFixedWidth"
                  :width="`${formData.folderWidth}px`"
                  :showItemCount="formData.folderShowCount"
                  :color="formData.folderIconColor"
                />
                <Item
                  bookmarkName="示例书签"
                  url="https://example.com"
                  :iconSize="formData.bookmarkIconSize"
                  :fontSize="formData.bookmarkFontSize"
                  :padding="`${formData.itemPadding}px`"
                  :margin="`${formData.itemMargin}px`"
                  :fixedWidth="formData.bookmarkFixedWidth"
                  :width="`${formData.bookmarkWidth}px`"
                  :openInNewTab="formData.bookmarkOpenInNewTab"
                />
              </div>
            </div>
          </div>

          <!-- 文件夹和书签设置并排 -->
          <div class="settings-row">
            <!-- 文件夹设置 -->
            <div class="settings-section flex-1">
              <h3>文件夹设置</h3>
              <d-form-item field="folderIconSize" label="图标大小">
                <d-slider
                  v-model="formData.folderIconSize"
                  :min="16"
                  :max="48"
                  :step="4"
                  @change="handleFolderIconSizeChange"
                />
              </d-form-item>
              <d-form-item field="folderFontSize" label="字体大小">
                <d-slider
                  v-model="formData.folderFontSize"
                  :min="12"
                  :max="24"
                  :step="2"
                  @change="handleFolderFontSizeChange"
                />
              </d-form-item>
              <d-form-item field="folderFixedWidth" label="固定宽度">
                <d-switch
                  v-model="formData.folderFixedWidth"
                  @change="handleFolderFixedWidthChange"
                />
              </d-form-item>
              <d-form-item field="folderWidth" label="宽度" v-if="formData.folderFixedWidth">
                <d-slider
                  v-model="formData.folderWidth"
                  :min="120"
                  :max="400"
                  :step="10"
                  @change="handleFolderWidthChange"
                />
              </d-form-item>
              <d-form-item field="folderShowCount" label="显示项目数量">
                <d-switch
                  v-model="formData.folderShowCount"
                  @change="handleFolderShowCountChange"
                />
              </d-form-item>
              <d-form-item field="folderIconColor" label="图标颜色">
                <color-picker
                  v-model:pureColor="formData.folderIconColor"
                  format="hex"
                  shape="square"
                  @update:pureColor="handleFolderIconColorChange"
                />
              </d-form-item>
            </div>

            <!-- 书签设置 -->
            <div class="settings-section flex-1">
              <h3>书签设置</h3>
              <d-form-item field="bookmarkIconSize" label="图标大小">
                <d-slider
                  v-model="formData.bookmarkIconSize"
                  :min="16"
                  :max="48"
                  :step="4"
                  @change="handleBookmarkIconSizeChange"
                />
              </d-form-item>
              <d-form-item field="bookmarkFontSize" label="字体大小">
                <d-slider
                  v-model="formData.bookmarkFontSize"
                  :min="12"
                  :max="24"
                  :step="2"
                  @change="handleBookmarkFontSizeChange"
                />
              </d-form-item>
              <d-form-item field="bookmarkFixedWidth" label="固定宽度">
                <d-switch
                  v-model="formData.bookmarkFixedWidth"
                  @change="handleBookmarkFixedWidthChange"
                />
              </d-form-item>
              <d-form-item field="bookmarkWidth" label="宽度" v-if="formData.bookmarkFixedWidth">
                <d-slider
                  v-model="formData.bookmarkWidth"
                  :min="120"
                  :max="400"
                  :step="10"
                  @change="handleBookmarkWidthChange"
                />
              </d-form-item>
              <d-form-item field="bookmarkOpenInNewTab" label="在新标签页打开">
                <d-switch
                  v-model="formData.bookmarkOpenInNewTab"
                  @change="handleBookmarkOpenInNewTabChange"
                />
              </d-form-item>
            </div>
          </div>

          <!-- 图标样式和边距设置并排 -->
          <div class="settings-row">
            <!-- 图标样式设置 -->
            <div class="settings-section flex-1">
              <h3>图标样式</h3>
              <d-form-item field="iconBorderWidth" label="边框粗细">
                <d-slider
                  v-model="formData.iconBorderWidth"
                  :min="0"
                  :max="4"
                  :step="1"
                  @change="handleIconBorderWidthChange"
                />
              </d-form-item>
              <d-form-item field="iconBorderRadius" label="边框圆角">
                <d-slider
                  v-model="formData.iconBorderRadius"
                  :min="0"
                  :max="24"
                  :step="2"
                  @change="handleIconBorderRadiusChange"
                />
              </d-form-item>
              <d-form-item field="iconImageSize" label="图标大小比例">
                <d-slider
                  v-model="formData.iconImageSize"
                  :min="50"
                  :max="100"
                  :step="5"
                  @change="handleIconImageSizeChange"
                />
              </d-form-item>
              <d-form-item field="iconBorderColor" label="边框颜色">
                <color-picker
                  v-model:pureColor="formData.iconBorderColor"
                  format="hex"
                  shape="square"
                  @update:pureColor="handleIconBorderColorChange"
                />
              </d-form-item>
              <d-form-item field="iconBackgroundColor" label="背景颜色">
                <color-picker
                  v-model:pureColor="formData.iconBackgroundColor"
                  format="hex"
                  shape="square"
                  @update:pureColor="handleIconBackgroundColorChange"
                />
              </d-form-item>
            </div>

            <!-- 边距设置 -->
            <div class="settings-section flex-1">
              <h3>边距设置</h3>
              <d-form-item field="itemPadding" label="内边距">
                <d-slider
                  v-model="formData.itemPadding"
                  :min="4"
                  :max="24"
                  :step="2"
                  @change="handleItemPaddingChange"
                />
              </d-form-item>
              <d-form-item field="itemMargin" label="外边距">
                <d-slider
                  v-model="formData.itemMargin"
                  :min="2"
                  :max="16"
                  :step="2"
                  @change="handleItemMarginChange"
                />
              </d-form-item>
            </div>
          </div>
        </d-form>
      </d-tab>

      <d-tab id="system" title="系统设置">
        <div class="settings-section">
          <h3>系统设置</h3>
          <d-form :data="systemSettings">
            <d-form-item field="theme" label="主题设置">
              <d-radio-group v-model="systemSettings.theme" @change="handleThemeChange">
                <d-radio v-for="theme in themeOptions" 
                        :key="theme.value" 
                        :value="theme.value">
                  {{ theme.label }}
                </d-radio>
              </d-radio-group>
            </d-form-item>
            <d-form-item field="rootFolderId" label="主页根目录">
              <div class="folder-select-container">
                <d-search
                  class="mb10"
                  style="width: 100%"
                  is-keyup-search
                  placeholder="搜索文件夹..."
                  :delay="500"
                  @search="handleSearch"
                />
                <d-tree
                  ref="treeRef"
                  :data="folderTreeData"
                  check="upward"
                  :expand-all="true"
                  @check-change="handleNodeCheck"
                  class="folder-tree"
                />
              </div>
            </d-form-item>
          </d-form>
        </div>
      </d-tab>

      <d-tab id="ai" title="AI 设置">
        <div class="settings-section">
          <h3>AI 设置</h3>
          <d-form :data="aiSettings">
            <d-form-item field="apiKey" label="API Key">
              <d-input v-model="aiSettings.apiKey" type="password" />
            </d-form-item>
          </d-form>
        </div>
      </d-tab>
    </d-tabs>

    <div class="button-container">
      <d-button variant="solid" color="primary" @click="handleSave">保存设置</d-button>
      <d-button @click="handleReset">重置默认</d-button>
      <d-button variant="text" @click="handleClose">取消</d-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed, watch, onMounted } from "vue";
import Item from "../components/Item.vue";
import Folder from "../components/Folder.vue";
import { useRouter } from "vue-router";
import { useBookmarkSettings } from "../hooks/useBookmarkSettings";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { themeOptions, type ThemeType } from '../config/theme';
import { useTheme } from '../hooks/useTheme';
import type { BookmarkRoot, BookmarkFolder } from "../utils/bookmarkParser";

const router = useRouter();
const emit = defineEmits(["save", "close", "updateRootFolder"]);
const { settings, saveSettings, resetSettings } = useBookmarkSettings();
const { currentTheme, switchTheme } = useTheme();

const activeTab = ref('appearance');

// 定义 props
const props = defineProps<{
  bookmarkData: BookmarkRoot | null
}>();

// 创建本地表单数据，用于编辑
const formData = ref({
  ...settings.value,
  folderIconColor: settings.value.folderIconColor || '#4B5CC4', // 添加默认值
});

// 新增系统设置数据
const systemSettings = ref({
  theme: currentTheme.value,
  rootFolderId: 'root', // 添加根目录ID设置
});

// 新增 AI 设置数据
const aiSettings = ref({
  apiKey: '',
  // 可以添加更多 AI 设置项
});

// 在 script setup 中添加
const treeRef = ref();

// 存储选中的节点ID
const selectedFolderId = ref<string>('root');

// 修改 folderTreeData computed
const folderTreeData = computed(() => {
  if (!props.bookmarkData) return [];
  return [{
    label: '根目录',
    id: 'root',
    checked: selectedFolderId.value === 'root',
    children: convertFoldersToTreeData(props.bookmarkData.roots.folders, selectedFolderId.value)
  }];
});

// 添加类型定义
interface TreeNode {
  label: string;
  id: string;
  checked?: boolean;
  children?: TreeNode[];
}

// 修改转换函数，添加 checked 状态
function convertFoldersToTreeData(folders: BookmarkFolder[], selectedId: string): TreeNode[] {
  return folders.map(folder => ({
    label: folder.title,
    id: folder.id,
    checked: folder.id === selectedId,
    children: folder.folders.length > 0 ? convertFoldersToTreeData(folder.folders, selectedId) : undefined
  }));
}

// 添加搜索处理函数
const handleSearch = (value: string) => {
  treeRef.value?.treeFactory.searchTree(value, { isFilter: true });
};

// 修改节点勾选处理函数
const handleNodeCheck = (node: any) => {
  console.log('节点勾选变更:', node);
  selectedFolderId.value = node.id;
  systemSettings.value.rootFolderId = node.id;  // 同步更新系统设置
};

// 监听formData的变化，实时更新预览效果
watch(
  formData,
  (newValue) => {
    // 实时更新预览效果
    Object.assign(settings.value, newValue);
  },
  { deep: true }
);

// 修改保存设置函数
const handleSave = () => {
  console.log('保存设置，根目录ID:', selectedFolderId.value);
  saveSettings(formData.value);
  // 同时保存系统设置
  emit("save", {
    ...formData.value,
    rootFolderId: selectedFolderId.value
  });
};

// 修改重置设置函数
const handleReset = () => {
  resetSettings();
  formData.value = { ...settings.value };
  selectedFolderId.value = 'root';
  emit("save");
};

// 添加关闭处理函数
const handleClose = () => {
  emit("close");
  router.push({ name: "home" });
};

// 文件夹设置处理函数
const handleFolderIconSizeChange = (val: number) => {
  formData.value.folderIconSize = val;
};

const handleFolderFontSizeChange = (val: number) => {
  formData.value.folderFontSize = val;
};

const handleFolderFixedWidthChange = (val: boolean) => {
  formData.value.folderFixedWidth = val;
};

const handleFolderWidthChange = (val: number) => {
  formData.value.folderWidth = val;
};

const handleFolderShowCountChange = (val: boolean) => {
  formData.value.folderShowCount = val;
};

// 书签设置处理函数
const handleBookmarkIconSizeChange = (val: number) => {
  formData.value.bookmarkIconSize = val;
};

const handleBookmarkFontSizeChange = (val: number) => {
  formData.value.bookmarkFontSize = val;
};

const handleBookmarkFixedWidthChange = (val: boolean) => {
  formData.value.bookmarkFixedWidth = val;
};

const handleBookmarkWidthChange = (val: number) => {
  formData.value.bookmarkWidth = val;
};

const handleBookmarkOpenInNewTabChange = (val: boolean) => {
  formData.value.bookmarkOpenInNewTab = val;
};

// 通用设置处理函数
const handleItemPaddingChange = (val: number) => {
  formData.value.itemPadding = val;
};

const handleItemMarginChange = (val: number) => {
  formData.value.itemMargin = val;
};

// 图标样式设置处理函数
const handleIconBorderWidthChange = (val: number) => {
  formData.value.iconBorderWidth = val;
};

const handleIconBorderRadiusChange = (val: number) => {
  formData.value.iconBorderRadius = val;
};

const handleIconImageSizeChange = (val: number) => {
  formData.value.iconImageSize = val;
};

const handleIconBorderColorChange = (val: string) => {
  formData.value.iconBorderColor = val;
};

const handleIconBackgroundColorChange = (val: string) => {
  formData.value.iconBackgroundColor = val;
};

// 添加文件夹图标颜色处理函数
const handleFolderIconColorChange = (val: string) => {
  formData.value.folderIconColor = val;
};

// 添加主题切换处理函数
const handleThemeChange = (themeName: string) => {
  switchTheme(themeName as ThemeType);
};

// 组件挂载时初始化选中状态
onMounted(() => {
  if (systemSettings.value.rootFolderId) {
    selectedFolderId.value = systemSettings.value.rootFolderId;
  }
});
</script>

<style scoped>
.settings-container {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  background-color: var(--devui-base-bg);
  padding-bottom: 80px;
  position: relative;
  min-height: 100%;
}

.preview-section {
  position: sticky;
  top: 0;
  z-index: 2;
  margin-bottom: 24px;
  padding: 20px;
  background-color: var(--devui-base-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.settings-row {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: stretch;
}

.flex-1 {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.settings-section {
  padding: 20px;
  background-color: var(--devui-base-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex: 1;
}

h3 {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 500;
  color: var(--devui-text);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--devui-dividing-line);
}

.form-operations {
  margin-top: 24px;
  padding: 16px 24px;
  background: #fff;
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--devui-dividing-line);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  margin-left: -24px;
  margin-bottom: -24px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  left: 0;
}

:deep(.devui-form-item) {
  margin-bottom: 16px;
}

:deep(.devui-slider) {
  width: 100%;
  margin: 8px 0;
}

:deep(.v3cp-preview) {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .settings-row {
    flex-direction: column;
  }
}

.preview-items-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.preview-items {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
}

:deep(.devui-drawer-content) {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff !important;
}

:deep(.devui-form) {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  background: var(--devui-base-bg);
  border-top: 1px solid var(--devui-dividing-line);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  z-index: 10;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

:deep(.devui-tabs-content) {
  padding: 20px 0;
}

.settings-section {
  margin-bottom: 24px;
}

.folder-select-container {
  border: 1px solid var(--devui-dividing-line);
  border-radius: 4px;
  padding: 12px;
}

.folder-tree {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 12px;
}

.mb10 {
  margin-bottom: 10px;
}
</style>
