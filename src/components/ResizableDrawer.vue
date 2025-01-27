<template>
  <div class="drawer-container" :class="{ 'drawer-open': modelValue }">
    <div class="drawer-overlay" v-if="showOverlay" @click="handleOverlayClick"></div>
    <div
      class="drawer-content"
      :style="{
        width: `${currentWidth}px`,
      }"
      ref="drawerRef"
    >
      <!-- 拖动调整区域 -->
      <div class="drawer-resizer" @mousedown="startResize">
        <div class="resizer-handle"></div>
      </div>

      <!-- 抽屉头部 -->
      <div class="drawer-header">
        <h2 class="drawer-title">{{ title }}</h2>
        <button class="drawer-close" @click="handleClose">
          <span class="close-icon">×</span>
        </button>
      </div>

      <!-- 抽屉内容 -->
      <div class="drawer-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  initialWidth: {
    type: Number,
    default: 800,
  },
  minWidth: {
    type: Number,
    default: 400,
  },
  maxWidth: {
    type: Number,
    default: 2000,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const currentWidth = ref(props.initialWidth);
const isResizing = ref(false);
const startX = ref(0);
const startWidth = ref(0);
const drawerRef = ref<HTMLElement | null>(null);

// 处理关闭
const handleClose = () => {
  emit("update:modelValue", false);
  emit("close");
};

// 处理遮罩层点击
const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    handleClose();
  }
};

// 开始调整大小
const startResize = (e: MouseEvent) => {
  e.preventDefault(); // 防止文本选择
  isResizing.value = true;
  startX.value = e.clientX;
  startWidth.value = currentWidth.value;
  document.addEventListener("mousemove", handleResize);
  document.addEventListener("mouseup", stopResize);
  document.body.style.cursor = "ew-resize";
  document.body.style.userSelect = "none";
};

// 处理调整大小
const handleResize = (e: MouseEvent) => {
  if (!isResizing.value) return;

  const diff = e.clientX - startX.value;
  let newWidth = startWidth.value - diff;

  // 限制最小和最大宽度
  newWidth = Math.max(props.minWidth, Math.min(props.maxWidth, newWidth));
  currentWidth.value = newWidth;
};

// 停止调整大小
const stopResize = () => {
  if (!isResizing.value) return;

  isResizing.value = false;
  document.removeEventListener("mousemove", handleResize);
  document.removeEventListener("mouseup", stopResize);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
};

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

// 组件卸载时清理
onUnmounted(() => {
  document.body.style.overflow = "";
  if (isResizing.value) {
    stopResize();
  }
});
</script>

<style scoped>
.drawer-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  visibility: hidden;
}

.drawer-container.drawer-open {
  visibility: visible;
}

.drawer-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.drawer-content {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  transform: translateX(100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.drawer-open .drawer-content {
  transform: translateX(0);
}

.drawer-resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 8px;
  cursor: ew-resize;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resizer-handle {
  width: 4px;
  height: 40px;
  background-color: var(--devui-brand, #5e7ce0);
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.2s;
}

.drawer-resizer:hover .resizer-handle {
  opacity: 0.6;
}

.drawer-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--devui-dividing-line, #dfe1e6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}

.drawer-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--devui-text, #252b3a);
}

.drawer-close {
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--devui-text-weak, #575d6c);
  font-size: 20px;
  line-height: 1;
  transition: color 0.2s;
}

.drawer-close:hover {
  color: var(--devui-text, #252b3a);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

:deep(.devui-drawer-content) {
  background-color: #fff;
}
</style>
