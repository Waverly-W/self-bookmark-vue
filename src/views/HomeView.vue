<script setup lang="ts">
import Item from "../components/Item.vue";
import Folder from "../components/Folder.vue";
import SettingsView from "./SettingsView.vue";
import { ref, onMounted } from "vue";
import { getAllBookmarks } from "../utils/bookmarkService";
import type { BookmarkRoot, BookmarkFolder } from "../utils/bookmarkParser";
import { useBookmarkSettings } from "../hooks/useBookmarkSettings";
import { useRouter } from "vue-router";
import ResizableDrawer from "../components/ResizableDrawer.vue";

interface BookmarkDisplay {
  bookmarkName: string;
  url: string;
  iconUrl?: string;
  dateAdded?: string;
  iconSize?: number;
  fontSize?: number;
  padding?: string;
  margin?: string;
  fixedWidth?: boolean;
  width?: string;
  openInNewTab?: boolean;
}

interface FolderDisplay {
  folderName: string;
  itemCount: number;
  dateAdded?: string;
  iconSize?: number;
  fontSize?: number;
  padding?: string;
  margin?: string;
  color?: string;
  fixedWidth?: boolean;
  width?: string;
  showItemCount?: boolean;
}

// 存储完整的书签数据
const bookmarkData = ref<BookmarkRoot | null>(null);

// 当前文件夹的书签和子文件夹
const bookmarks = ref<BookmarkDisplay[]>([]);
const folders = ref<FolderDisplay[]>([]);

// 当前路径栈
const currentPath = ref<BookmarkFolder[]>([]);

// 获取设置
const { settings } = useBookmarkSettings();

// 设置抽屉板控制
const settingsVisible = ref(false);
const router = useRouter();

// 将书签数据转换为显示格式
function convertBookmarkToDisplay(bookmark: any): BookmarkDisplay {
  return {
    bookmarkName: bookmark.title,
    url: bookmark.url,
    iconUrl: bookmark.icon || undefined,
    dateAdded: bookmark.add_date || undefined,
    iconSize: settings.value.bookmarkIconSize,
    fontSize: settings.value.bookmarkFontSize,
    padding: `${settings.value.itemPadding}px`,
    margin: `${settings.value.itemMargin}px`,
    fixedWidth: settings.value.bookmarkFixedWidth,
    width: `${settings.value.bookmarkWidth}px`,
    openInNewTab: settings.value.bookmarkOpenInNewTab,
  };
}

// 将文件夹转换为显示格式
function convertFolderToDisplay(folder: BookmarkFolder): FolderDisplay {
  return {
    folderName: folder.title,
    itemCount: folder.bookmarks.length + folder.folders.length,
    dateAdded: folder.add_date || undefined,
    iconSize: settings.value.folderIconSize,
    fontSize: settings.value.folderFontSize,
    padding: `${settings.value.itemPadding}px`,
    margin: `${settings.value.itemMargin}px`,
    color: "#4B5CC4",
    fixedWidth: settings.value.folderFixedWidth,
    width: `${settings.value.folderWidth}px`,
    showItemCount: settings.value.folderShowCount,
  };
}

// 获取当前文件夹
function getCurrentFolder(): BookmarkFolder | null {
  if (currentPath.value.length === 0) return null;
  return currentPath.value[currentPath.value.length - 1];
}

// 更新当前视图
function updateCurrentView() {
  const current = getCurrentFolder();
  if (!current) {
    // 根目录
    const rootData = bookmarkData.value?.roots;
    if (rootData) {
      bookmarks.value = rootData.bookmarks.map(convertBookmarkToDisplay);
      folders.value = rootData.folders.map(convertFolderToDisplay);
    }
  } else {
    // 文件夹内
    bookmarks.value = current.bookmarks.map(convertBookmarkToDisplay);
    folders.value = current.folders.map(convertFolderToDisplay);
  }
}

// 处理文件夹点击
function handleFolderClick(index: number) {
  const current = getCurrentFolder();
  const targetFolder = current
    ? current.folders[index]
    : bookmarkData.value?.roots.folders[index];

  if (targetFolder) {
    currentPath.value.push(targetFolder);
    updateCurrentView();
  }
}

// 处理返回上一级
function handleBack() {
  if (currentPath.value.length === 0) return;
  currentPath.value.pop();
  updateCurrentView();
}

// 处理面包屑点击
function handleBreadcrumbClick(index: number) {
  if (index < currentPath.value.length) {
    // 移除多余的路径
    currentPath.value = currentPath.value.slice(0, index + 1);
    updateCurrentView();
  }
}

// 加载书签数据
async function loadBookmarks() {
  try {
    const data = await getAllBookmarks();
    console.log("获取的书签数据:", data);
    bookmarkData.value = data;
    updateCurrentView();
  } catch (error) {
    console.error("加载书签失败:", error);
  }
}

// 显示设置面板
function showSettings() {
  settingsVisible.value = true;
  router.push({ name: "settings" });
}

// 处理关闭
const handleClose = () => {
  settingsVisible.value = false;
  router.push({ name: "home" });
};

// 处理设置保存
const handleSettingsSave = () => {
  settingsVisible.value = false;
  router.push({ name: "home" });
  // 重新加载书签视图以应用新设置
  updateCurrentView();
};

// 组件挂载时加载书签
onMounted(() => {
  loadBookmarks();
});
</script>

<template>
  <main class="home-container">
    <div class="navigation">
      <button
        class="back-button"
        @click="handleBack"
        :disabled="currentPath.length === 0"
      >
        返回上级
      </button>
      <d-breadcrumb separator-icon="/">
        <d-breadcrumb-item
          :noNavigation="false"
          @click="
            () => {
              currentPath.length = 0;
              updateCurrentView();
            }
          "
        >
          <span class="breadcrumb-link">根目录</span>
        </d-breadcrumb-item>
        <template v-for="(folder, index) in currentPath" :key="index">
          <d-breadcrumb-item
            :noNavigation="index === currentPath.length - 1"
            @click="() => handleBreadcrumbClick(index)"
          >
            <span class="breadcrumb-link">{{ folder.title }}</span>
          </d-breadcrumb-item>
        </template>
      </d-breadcrumb>
      <d-button
        variant="text"
        class="settings-button"
        @click="showSettings"
        icon="settings"
      >
        设置
      </d-button>
    </div>

    <div class="content">
      <template v-if="folders.length > 0">
        <h3>文件夹</h3>
        <div class="folders-grid">
          <Folder
            v-for="(folder, index) in folders"
            :key="`folder-${index}`"
            v-bind="folder"
            :onClick="() => handleFolderClick(index)"
          />
        </div>
      </template>

      <template v-if="bookmarks.length > 0">
        <h3>书签</h3>
        <div class="bookmarks-grid">
          <Item
            v-for="(bookmark, index) in bookmarks"
            :key="`bookmark-${index}`"
            v-bind="bookmark"
          />
        </div>
      </template>

      <div v-if="folders.length === 0 && bookmarks.length === 0" class="empty-message">
        当前文件夹为空
      </div>
    </div>

    <!-- 替换设置抽屉板 -->
    <ResizableDrawer
      v-model="settingsVisible"
      title="书签设置"
      :initial-width="1200"
      :min-width="800"
      :max-width="2000"
      :show-overlay="true"
      :close-on-click-overlay="true"
      @close="handleClose"
    >
      <SettingsView @save="handleSettingsSave" @close="settingsVisible = false" />
    </ResizableDrawer>
  </main>
</template>

<style scoped>
.home-container {
  padding: 20px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.back-button {
  padding: 8px 16px;
  background-color: #4b5cc4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.back-button:hover:not(:disabled) {
  background-color: #3b4ba4;
}

.back-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

:deep(.devui-breadcrumb) {
  flex: 1;
  min-width: 0;
}

:deep(.devui-breadcrumb-item) {
  color: #666;
  font-size: 14px;
}

:deep(.devui-breadcrumb-item:last-child) {
  color: #252b3a;
  font-weight: 500;
}

.breadcrumb-link {
  transition: color 0.3s;
}

:deep(.devui-breadcrumb-item:not([nonavigation="true"])) {
  cursor: pointer;
}

:deep(.devui-breadcrumb-item:not([nonavigation="true"])) .breadcrumb-link:hover {
  color: #4b5cc4;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.folders-grid,
.bookmarks-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.empty-message {
  text-align: center;
  color: #666;
  padding: 32px;
  font-size: 16px;
}

.settings-button {
  margin-left: auto;
  color: #4b5cc4;
}

/* 添加抽屉板样式覆盖 */
:deep(.devui-drawer) {
  max-width: 90vw !important;
}

:deep(.devui-drawer-content) {
  width: 100% !important;
  max-width: 2000px !important;
}
</style>
