/**
 * 书签解析器接口定义
 */
export interface BookmarkItem {
  title: string;
  url: string;
  icon: string | null;
  add_date: string | null;
}

export interface BookmarkFolder {
  title: string;
  add_date: string | null;
  folders: BookmarkFolder[];
  bookmarks: BookmarkItem[];
}

export interface BookmarkRoot {
  roots: {
    folders: BookmarkFolder[];
    bookmarks: BookmarkItem[];
  };
}

/**
 * 解析Chrome/Edge浏览器导出的书签HTML文件
 * @param html 书签HTML字符串
 * @returns 解析后的书签数据结构
 */
export function parseBookmarks(html: string): BookmarkRoot {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function processNode(
    node: Element
  ): {
    folders: BookmarkFolder[];
    bookmarks: BookmarkItem[];
  } {
    const result = {
      folders: [] as BookmarkFolder[],
      bookmarks: [] as BookmarkItem[],
    };

    // 处理所有DT节点
    const dtElements = node.querySelectorAll(":scope > dt");
    dtElements.forEach((dt) => {
      // 处理文件夹
      const h3 = dt.querySelector("h3");
      if (h3) {
        const dl = dt.querySelector("dl");
        const folderContent = dl ? processNode(dl) : { folders: [], bookmarks: [] };

        result.folders.push({
          title: h3.textContent?.trim() || "",
          add_date: h3.getAttribute("add_date") || null,
          folders: folderContent.folders,
          bookmarks: folderContent.bookmarks,
        });
      } else {
        // 处理书签
        const a = dt.querySelector("a");
        if (a) {
          result.bookmarks.push({
            title: a.textContent?.trim() || "",
            url: a.getAttribute("href") || "",
            icon: a.getAttribute("icon") || a.getAttribute("icon_uri") || null,
            add_date: a.getAttribute("add_date") || null,
          });
        }
      }
    });

    return result;
  }

  // 从根DL开始处理
  const rootDL = doc.querySelector("dl");
  if (!rootDL) {
    throw new Error("Invalid bookmark HTML format");
  }

  return {
    roots: processNode(rootDL),
  };
}

/**
 * 使用示例：
 *
 * // 1. 读取书签HTML文件
 * const bookmarkFile = event.target.files[0];
 * const htmlContent = await file.text();
 *
 * // 2. 解析书签
 * const parsedBookmarks = parseBookmarks(htmlContent);
 *
 * // 输出格式示例：
 * {
 *   "roots": {
 *     "folders": [
 *       {
 *         "title": "书签栏",
 *         "add_date": "123",
 *         "folders": [
 *           {
 *             "title": "子文件夹",
 *             "add_date": "456",
 *             "folders": [],
 *             "bookmarks": [
 *               {
 *                 "title": "示例网站",
 *                 "url": "https://example.com",
 *                 "icon": "data:image/png;base64,iVBO...",
 *                 "add_date": "789"
 *               }
 *             ]
 *           }
 *         ],
 *         "bookmarks": [
 *           {
 *             "title": "根书签",
 *             "url": "https://root.com",
 *             "icon": null,
 *             "add_date": "321"
 *           }
 *         ]
 *       }
 *     ],
 *     "bookmarks": []
 *   }
 * }
 */
