import { parseBookmarks } from './bookmarkParser';
import testBookmarks from '../assets/bookmarks_2025_1_21.html?raw';
import type { BookmarkItem, BookmarkFolder, BookmarkRoot } from './bookmarkParser';

// Chrome API 类型定义
declare global {
  interface Chrome {
    bookmarks: {
      getTree(callback: (bookmarkTreeNodes: ChromeBookmarkTreeNode[]) => void): void;
    };
    runtime: {
      lastError?: {
        message: string;
      };
    };
  }

  interface ChromeBookmarkTreeNode {
    id: string;
    parentId?: string;
    index?: number;
    url?: string;
    title: string;
    dateAdded?: number;
    dateGroupModified?: number;
    children?: ChromeBookmarkTreeNode[];
  }

  var chrome: Chrome | undefined;
}

/**
 * 环境类型枚举
 */
export enum Environment {
  TEST = 'test',      // 测试环境，使用本地HTML文件
  EXTENSION = 'extension'  // 插件环境，使用Chrome API
}

/**
 * 获取当前运行环境
 * @returns Environment
 */
function getEnvironment(): Environment {
  // 通过检查 chrome.bookmarks API 是否存在来判断环境
  return typeof chrome !== 'undefined' && chrome?.bookmarks 
    ? Environment.EXTENSION 
    : Environment.TEST;
}

/**
 * 从Chrome浏览器获取书签数据
 * @returns Promise<BookmarkRoot>
 */
async function getBookmarksFromChrome(): Promise<BookmarkRoot> {
  return new Promise((resolve, reject) => {
    if (!chrome?.bookmarks) {
      reject(new Error('Chrome bookmarks API not available'));
      return;
    }

    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      // 转换Chrome API的书签格式为我们的统一格式
      const convertNode = (node: ChromeBookmarkTreeNode): BookmarkItem | BookmarkFolder => {
        if (node.url) {
          return {
            title: node.title,
            url: node.url,
            icon: null, // Chrome API 不提供图标，需要另外处理
            add_date: node.dateAdded?.toString() || null
          };
        } else {
          return {
            id: node.id,
            title: node.title,
            add_date: node.dateAdded?.toString() || undefined,
            folders: node.children
              ?.filter(child => !child.url)
              .map(child => convertNode(child) as BookmarkFolder) || [],
            bookmarks: node.children
              ?.filter(child => child.url)
              .map(child => convertNode(child) as BookmarkItem) || []
          };
        }
      };

      const roots = {
        folders: bookmarkTreeNodes[0].children
          ?.filter(node => !node.url)
          .map(node => convertNode(node) as BookmarkFolder) || [],
        bookmarks: bookmarkTreeNodes[0].children
          ?.filter(node => node.url)
          .map(node => convertNode(node) as BookmarkItem) || []
      };

      resolve({ roots });
    });
  });
}

/**
 * 从测试HTML文件获取书签数据
 * @returns Promise<BookmarkRoot>
 */
async function getBookmarksFromTestFile(): Promise<BookmarkRoot> {
  return parseBookmarks(testBookmarks);
}

/**
 * 统一的书签获取方法
 * @returns Promise<BookmarkRoot>
 */
export async function getAllBookmarks(): Promise<BookmarkRoot> {
  const env = getEnvironment();
  
  try {
    switch (env) {
      case Environment.EXTENSION:
        return await getBookmarksFromChrome();
      case Environment.TEST:
        return await getBookmarksFromTestFile();
      default:
        throw new Error(`Unsupported environment: ${env}`);
    }
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    throw error;
  }
} 