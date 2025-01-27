<template>
  <div class="bookmark-wrapper" :style="wrapperStyle">
    <d-card
      v-ripple="rippleConfig"
      class="bookmark-card"
      :style="cardStyle"
      :class="{ clickable: !!url }"
      @click="handleClick"
    >
      <div class="bookmark-content">
        <div class="icon-wrapper" :style="iconWrapperStyle">
          <template v-if="showCustomIcon">
            <img
              :src="iconUrl"
              :style="iconImageStyle"
              class="bookmark-icon"
              @error="handleIconError"
              :alt="bookmarkName"
            />
          </template>
          <d-avatar
            v-else
            :style="iconImageStyle"
            :name="getFirstLetter"
            :width="avatarSize"
            :height="avatarSize"
            :backgroundColor="getAvatarColor"
          />
        </div>
        <span class="bookmark-title" :style="titleStyle">
          {{ bookmarkName }}
        </span>
      </div>
    </d-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useBookmarkSettings } from "../hooks/useBookmarkSettings";

export default defineComponent({
  name: "BookmarkItem",
  props: {
    // 书签名称
    bookmarkName: {
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
    // 书签链接
    url: {
      type: String,
      default: "",
    },
    // 是否在新窗口打开
    openInNewTab: {
      type: Boolean,
      default: true,
    },
    // 图标URL或base64
    iconUrl: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { settings } = useBookmarkSettings();
    const iconLoadError = ref(false);

    // 处理图标加载错误
    const handleIconError = () => {
      iconLoadError.value = true;
    };

    // 判断是否显示自定义图标
    const showCustomIcon = computed(() => {
      if (!props.iconUrl || iconLoadError.value) return false;

      if (props.iconUrl.startsWith("data:image")) {
        return true;
      }

      try {
        new URL(props.iconUrl);
        return true;
      } catch {
        return false;
      }
    });

    // 图标容器样式
    const iconWrapperStyle = computed(() => ({
      width: `${props.iconSize}px`,
      height: `${props.iconSize}px`,
      borderWidth: `${settings.value.iconBorderWidth}px`,
      borderColor: settings.value.iconBorderColor,
      borderRadius: `${settings.value.iconBorderRadius}px`,
      backgroundColor: settings.value.iconBackgroundColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box" as const,
      padding: "0",
      margin: "0",
    }));

    // 图标图片样式
    const iconImageStyle = computed(() => {
      const size = (props.iconSize * settings.value.iconImageSize) / 100;
      return {
        width: `${size}px`,
        height: `${size}px`,
        objectFit: "contain" as const,
        display: "flex",
        flexShrink: 0,
        padding: 0,
        margin: 0,
      };
    });

    // 头像尺寸计算
    const avatarSize = computed(() => {
      return (props.iconSize * settings.value.iconImageSize) / 100;
    });

    const rippleConfig = computed(() => ({
      duration: 300,
      color: '#00000030',
      disabled: !props.url
    }));

    return {
      showCustomIcon,
      handleIconError,
      iconWrapperStyle,
      iconImageStyle,
      avatarSize,
      rippleConfig,
    };
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
    titleStyle() {
      return {
        fontSize: `${this.fontSize}px`,
      };
    },
    getFirstLetter(): string {
      return this.bookmarkName.charAt(0).toUpperCase();
    },
    getAvatarColor(): string {
      const colors = ["#7B68EE", "#4169E1", "#6495ED", "#4682B4", "#5F9EA0"];
      const index = this.getFirstLetter.charCodeAt(0) % colors.length;
      return colors[index];
    },
  },
  methods: {
    handleClick() {
      if (!this.url) return;

      if (this.openInNewTab) {
        window.open(this.url, "_blank");
      } else {
        window.location.href = this.url;
      }
    },
  },
});
</script>

<style scoped>
.bookmark-wrapper {
  display: inline-block;
}

.bookmark-card {
  border-radius: 8px;
  transition: all 0.3s;
  background-color: #fff;
}

.bookmark-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.bookmark-icon {
  flex-shrink: 0;
  display: flex;
}

.bookmark-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  font-weight: 500;
}

.clickable {
  cursor: pointer;
}

.bookmark-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.d-avatar) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.d-avatar-text) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  line-height: 1 !important;
}
</style>
