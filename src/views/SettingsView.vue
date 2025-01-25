<template>
  <div class="settings-container">
    <d-form :data="formData">
      <!-- 顶部预览区域 -->
      <div class="preview-section">
        <h3>预览效果</h3>
        <d-row :gutter="[24, 24]">
          <div class="preview-card">
            <h4>文件夹预览</h4>
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
              color="#4B5CC4"
            />
          </div>
          <div class="preview-card">
            <h4>书签预览</h4>
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
        </d-row>
      </div>

      <!-- 设置区域 -->
      <div class="settings-content">
        <d-row :gutter="[24, 24]">
          <!-- 文件夹设置 -->
          <d-col :xs="24" :sm="24" :md="12">
            <div class="settings-section">
              <h3>文件夹设置</h3>
              <d-row :gutter="[16, 16]">
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="folderIconSize" label="图标大小">
                    <d-slider
                      v-model="formData.folderIconSize"
                      :min="16"
                      :max="48"
                      :step="4"
                      @change="handleFolderIconSizeChange"
                    />
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="folderFontSize" label="字体大小">
                    <d-slider
                      v-model="formData.folderFontSize"
                      :min="12"
                      :max="24"
                      :step="2"
                      @change="handleFolderFontSizeChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>12px</span>
                      <span>24px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="folderFixedWidth" label="固定宽度">
                    <d-switch
                      v-model="formData.folderFixedWidth"
                      @change="handleFolderFixedWidthChange"
                    />
                  </d-form-item>
                </d-col>
                <d-col
                  :xs="24"
                  :sm="12"
                  :md="12"
                  :lg="8"
                  v-if="formData.folderFixedWidth"
                >
                  <d-form-item field="folderWidth" label="宽度">
                    <d-slider
                      v-model="formData.folderWidth"
                      :min="120"
                      :max="400"
                      :step="10"
                      @change="handleFolderWidthChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>120px</span>
                      <span>400px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="folderShowCount" label="显示项目数量">
                    <d-switch
                      v-model="formData.folderShowCount"
                      @change="handleFolderShowCountChange"
                    />
                  </d-form-item>
                </d-col>
              </d-row>
            </div>
          </d-col>

          <!-- 书签设置 -->
          <d-col :xs="24" :sm="24" :md="12">
            <div class="settings-section">
              <h3>书签设置</h3>
              <d-row :gutter="[16, 16]">
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="bookmarkIconSize" label="图标大小">
                    <d-slider
                      v-model="formData.bookmarkIconSize"
                      :min="16"
                      :max="48"
                      :step="4"
                      @change="handleBookmarkIconSizeChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>16px</span>
                      <span>48px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="bookmarkFontSize" label="字体大小">
                    <d-slider
                      v-model="formData.bookmarkFontSize"
                      :min="12"
                      :max="24"
                      :step="2"
                      @change="handleBookmarkFontSizeChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>12px</span>
                      <span>24px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="bookmarkFixedWidth" label="固定宽度">
                    <d-switch
                      v-model="formData.bookmarkFixedWidth"
                      @change="handleBookmarkFixedWidthChange"
                    />
                  </d-form-item>
                </d-col>
                <d-col
                  :xs="24"
                  :sm="12"
                  :md="12"
                  :lg="8"
                  v-if="formData.bookmarkFixedWidth"
                >
                  <d-form-item field="bookmarkWidth" label="宽度">
                    <d-slider
                      v-model="formData.bookmarkWidth"
                      :min="120"
                      :max="400"
                      :step="10"
                      @change="handleBookmarkWidthChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>120px</span>
                      <span>400px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="bookmarkOpenInNewTab" label="在新标签页打开">
                    <d-switch
                      v-model="formData.bookmarkOpenInNewTab"
                      @change="handleBookmarkOpenInNewTabChange"
                    />
                  </d-form-item>
                </d-col>
              </d-row>
            </div>
          </d-col>

          <!-- 图标样式设置 -->
          <d-col :xs="24">
            <div class="settings-section">
              <h3>图标样式</h3>
              <d-row :gutter="[16, 16]">
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="iconBorderWidth" label="边框粗细">
                    <d-slider
                      v-model="formData.iconBorderWidth"
                      :min="0"
                      :max="4"
                      :step="1"
                      @change="handleIconBorderWidthChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>0px</span>
                      <span>4px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="iconBorderRadius" label="边框圆角">
                    <d-slider
                      v-model="formData.iconBorderRadius"
                      :min="0"
                      :max="24"
                      :step="2"
                      @change="handleIconBorderRadiusChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>0px</span>
                      <span>24px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24">
                  <d-form-item field="iconImageSize" label="图标大小比例">
                    <d-slider
                      v-model="formData.iconImageSize"
                      :min="50"
                      :max="100"
                      :step="5"
                      :marks="{
                        50: '50%',
                        75: '75%',
                        100: '100%',
                      }"
                      @change="handleIconImageSizeChange"
                    />
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="iconBorderColor" label="边框颜色">
                    <d-color-picker
                      v-model="formData.iconBorderColor"
                      @change="handleIconBorderColorChange"
                    />
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="iconBackgroundColor" label="背景颜色">
                    <d-color-picker
                      v-model="formData.iconBackgroundColor"
                      @change="handleIconBackgroundColorChange"
                    />
                  </d-form-item>
                </d-col>
              </d-row>
            </div>
          </d-col>

          <!-- 通用设置 -->
          <d-col :xs="24">
            <div class="settings-section">
              <h3>通用设置</h3>
              <d-row :gutter="[16, 16]">
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="itemPadding" label="内边距">
                    <d-slider
                      v-model="formData.itemPadding"
                      :min="4"
                      :max="24"
                      :step="2"
                      @change="handleItemPaddingChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>4px</span>
                      <span>24px</span>
                    </div>
                  </d-form-item>
                </d-col>
                <d-col :xs="24" :sm="12" :md="12" :lg="8">
                  <d-form-item field="itemMargin" label="外边距">
                    <d-slider
                      v-model="formData.itemMargin"
                      :min="2"
                      :max="16"
                      :step="2"
                      @change="handleItemMarginChange"
                    />
                    <div class="flex-space-between text-weak">
                      <span>2px</span>
                      <span>16px</span>
                    </div>
                  </d-form-item>
                </d-col>
              </d-row>
            </div>
          </d-col>
        </d-row>
      </div>

      <d-form-operation class="form-operations">
        <d-button variant="solid" color="primary" @click="handleSave">保存设置</d-button>
        <d-button @click="handleReset">重置默认</d-button>
        <d-button variant="text" @click="handleClose">取消</d-button>
      </d-form-operation>
    </d-form>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed, watch } from "vue";
import Item from "../components/Item.vue";
import Folder from "../components/Folder.vue";
import { useRouter } from "vue-router";
import { useBookmarkSettings } from "../hooks/useBookmarkSettings";

const router = useRouter();
const emit = defineEmits(["save", "close"]);
const { settings, saveSettings, resetSettings } = useBookmarkSettings();

// 创建本地表单数据，用于编辑
const formData = ref({ ...settings.value });

// 监听formData的变化，实时更新预览效果
watch(
  formData,
  (newValue) => {
    // 实时更新预览效果
    Object.assign(settings.value, newValue);
  },
  { deep: true }
);

// 保存设置
const handleSave = () => {
  saveSettings(formData.value);
  emit("save");
};

// 重置设置
const handleReset = () => {
  resetSettings();
  formData.value = { ...settings.value };
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
</script>

<style scoped>
.settings-container {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  background-color: var(--devui-base-bg);
}

.preview-section {
  margin-bottom: 24px;
  padding: 20px;
  background-color: var(--devui-base-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.preview-card {
  padding: 16px;
  background-color: var(--devui-area);
  border-radius: 4px;
  height: 100%;
}

.settings-content {
  margin-top: 24px;
}

.settings-section {
  height: 100%;
  padding: 20px;
  background-color: var(--devui-base-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h3 {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 500;
  color: var(--devui-text);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--devui-dividing-line);
}

h4 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: var(--devui-text-weak);
}

.form-operations {
  margin-top: 24px;
  padding: 16px;
  background: var(--devui-base-bg);
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--devui-dividing-line);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  z-index: 1;
}

:deep(.devui-form-item) {
  margin-bottom: 16px;
}

:deep(.devui-slider) {
  width: 100%;
  margin: 8px 0;
}

.flex-space-between {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 12px;
}

.text-weak {
  color: var(--devui-text-weak);
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .settings-container {
    padding: 16px;
  }

  .preview-section,
  .settings-section {
    padding: 16px;
  }

  .preview-card {
    margin-bottom: 16px;
  }
}
</style>
