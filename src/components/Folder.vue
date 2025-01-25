<template>
  <div class="folder-wrapper" :style="wrapperStyle">
    <d-card
      class="folder-card"
      :style="cardStyle"
      :class="{ clickable: !!onClick }"
      @click="handleClick"
    >
      <div class="folder-content">
        <d-avatar
          :style="iconStyle"
          :width="iconSize"
          :height="iconSize"
          :backgroundColor="folderColor"
        >
          <template #avatar>
            <i class="icon-folder"></i>
          </template>
        </d-avatar>
        <div class="folder-info">
          <span class="folder-title" :style="titleStyle">
            {{ folderName }}
          </span>
          <span v-if="showItemCount" class="folder-count"> {{ itemCount }} 项 </span>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "FolderItem",
  props: {
    // 文件夹名称
    folderName: {
      type: String,
      required: true,
    },
    // 内边距
    padding: {
      type: String,
      default: "8px",
    },
    // 外边距
    margin: {
      type: String,
      default: "8px",
    },
    // 图标大小
    iconSize: {
      type: Number,
      default: 24,
    },
    // 字体大小
    fontSize: {
      type: Number,
      default: 14,
    },
    // 是否固定宽度
    fixedWidth: {
      type: Boolean,
      default: false,
    },
    // 固定宽度值
    width: {
      type: String,
      default: "200px",
    },
    // 文件夹颜色
    color: {
      type: String,
      default: "#4B5CC4",
    },
    // 是否显示项目数量
    showItemCount: {
      type: Boolean,
      default: true,
    },
    // 项目数量
    itemCount: {
      type: Number,
      default: 0,
    },
    // 点击事件处理函数
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: null,
    },
  },
  computed: {
    wrapperStyle() {
      return {
        margin: this.margin,
      };
    },
    cardStyle() {
      return {
        padding: this.padding,
        width: this.fixedWidth ? this.width : "auto",
        minWidth: "120px",
      };
    },
    iconStyle() {
      return {
        width: `${this.iconSize}px`,
        height: `${this.iconSize}px`,
      };
    },
    titleStyle() {
      return {
        fontSize: `${this.fontSize}px`,
      };
    },
    folderColor(): string {
      return this.color;
    },
  },
  methods: {
    handleClick(event: MouseEvent) {
      if (this.onClick) {
        this.onClick(event);
      }
    },
  },
});
</script>

<style scoped>
.folder-wrapper {
  display: inline-block;
}

.folder-card {
  border-radius: 8px;
  transition: all 0.3s;
  background-color: #fff;
}

.folder-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.folder-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.folder-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  font-weight: 500;
  line-height: 1.2;
}

.folder-count {
  font-size: 12px;
  color: #666;
}

.clickable {
  cursor: pointer;
}

.folder-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.icon-folder {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 5h-8.586L9.707 3.293A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z'/%3E%3C/svg%3E")
    center/contain no-repeat;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 5h-8.586L9.707 3.293A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z'/%3E%3C/svg%3E")
    center/contain no-repeat;
}
</style>
