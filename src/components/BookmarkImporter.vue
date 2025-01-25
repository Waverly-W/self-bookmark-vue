<script setup lang="ts">
import { ref } from 'vue';
import { parseBookmarks } from '../utils/bookmarkParser';

const emit = defineEmits<{
  (e: 'import-complete', data: { roots: { bookmarks: any[] } }): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  
  if (!file) {
    error.value = '请选择文件';
    return;
  }

  if (!file.name.toLowerCase().endsWith('.html')) {
    error.value = '请选择HTML格式的书签文件';
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;
    
    const htmlContent = await file.text();
    const parsedBookmarks = parseBookmarks(htmlContent);
    
    emit('import-complete', parsedBookmarks);
  } catch (e) {
    error.value = e instanceof Error ? e.message : '导入失败，请检查文件格式';
  } finally {
    isLoading.value = false;
    if (fileInput.value) {
      fileInput.value.value = ''; // 清空文件输入
    }
  }
};
</script>

<template>
  <div class="bookmark-importer">
    <input
      ref="fileInput"
      type="file"
      accept=".html"
      @change="handleFileSelect"
      :disabled="isLoading"
      class="file-input"
    />
    <div class="import-wrapper">
      <button
        class="import-button"
        @click="() => fileInput?.click()"
        :disabled="isLoading"
      >
        {{ isLoading ? '导入中...' : '导入书签' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.bookmark-importer {
  margin: 20px 0;
}

.file-input {
  display: none;
}

.import-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.import-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.import-button:hover:not(:disabled) {
  background-color: #45a049;
}

.import-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin: 0;
  font-size: 14px;
}
</style> 