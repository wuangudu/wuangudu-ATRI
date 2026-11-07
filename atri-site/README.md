# ATRI · 亚托莉 宣传页

一个纯静态的 QQ 机器人宣传页：深海底色 + 气泡 + 玻璃拟态卡片 + 「海底 / 海面」主题切换。
页面包含**加入 QQ 群**按钮（所有按钮都指向同一个加群链接），可直接部署到 GitHub Pages。

## 文件结构

```
atri-site/
├─ index.html   # 页面结构（唯一需要改内容的文件）
├─ style.css    # 样式与动画
├─ script.js    # 加群链接注入、复制链接、气泡、打字机、主题切换、滚动渐显
├─ .nojekyll    # GitHub Pages 用，跳过 Jekyll 处理
├─ preview-hero.png / preview-full.png  # 效果预览图（不用可删）
└─ README.md    # 本说明
```

## 效果预览

- `preview-hero.png`：首屏（海底主题）
- `preview-full.png`：整页长图
- 右上角「海底 / 海面」按钮可切换两套主题，选择会记在浏览器里。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个仓库（例如 `atri-site`），公开（Public）。
2. 把本文件夹里的 **所有文件** 上传到仓库根目录（拖拽上传 / `git push` 均可）。
3. 打开仓库 **Settings → Pages**：
   - **Source** 选 `Deploy from a branch`
   - **Branch** 选 `main`、目录选 `/ (root)`，点 **Save**。
4. 等 1–2 分钟，访问 `https://<你的用户名>.github.io/atri-site/`。

> 也可以用 GitHub Desktop、`git init && git add . && git commit -m "init" && git push`。

## 修改加群链接

加群链接在 `index.html` 里出现多处（主按钮、悬浮按钮、页脚按钮等），另外 `body` 上还有一个
`data-join-url` 属性。**最省事的改法**：

- 打开 `index.html`，改 `body` 标签上的 `data-join-url="..."` 与各 `<a class="... join-link" href="...">`
  里的链接；
- 页面脚本会把链接统一注入到所有 `.join-link` 元素，所以只需要保证链接一致。

> 链接里包含 `&`，在 HTML 中要写成 `&amp;`；在脚本/浏览器里会自动还原成 `&`。

## 改文案 / 改内容

- 所有文字都在 `index.html` 中，按章节（Hero / 关于她 / 她会怎么陪你 / 45 天旅程 / 如何开始 / FAQ）分段。
- 配色在 `style.css` 顶部的 `:root` 变量里（`--cyan`、`--peach`、`--bg` 等），海面主题在 `html.theme-day` 里。

## 本地预览

直接双击 `index.html` 即可；也可以用任意静态服务器：

```bash
python -m http.server 8080
# 浏览器打开 http://127.0.0.1:8080/
```

## 注意

- 页面为粉丝向作品，非官方页面；「ATRI -My Dear Moments-」角色版权归原权利人所有，页面美术均为原创 CSS / SVG。
- QQ 加群链接在**手机 QQ** 中会直接拉起加群界面；在电脑浏览器里一般会打开 qun.qq.com 的分享页，
  若没有反应，复制链接到手机 QQ 中打开即可。
