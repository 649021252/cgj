# 曹国军｜数字产品作品集

可直接自动部署到 GitHub Pages 的 React + Vite 静态网站，包含完整作品展示、分类筛选、项目详情、合作介绍和微信二维码。

## 本地运行

需要 Node.js 22 或更高版本：

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## GitHub Pages 自动部署

工程已包含 `.github/workflows/deploy-pages.yml`。代码推送到 `main` 或 `master` 后会自动构建并发布。

首次发布仅需设置一次：

1. 打开仓库的 `Settings` → `Pages`。
2. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
3. 推送代码后打开 `Actions`，等待 `Deploy GitHub Pages` 显示绿色对勾。

仓库为 `649021252/cgj` 时，访问地址为：

https://649021252.github.io/cgj/

## 提交代码

把本压缩包内容放到仓库根目录，再执行：

```bash
git add -A
git commit -m "发布数字产品作品集并配置 GitHub Pages"
git push origin main
```

如果默认分支是 `master`，最后一条改为 `git push origin master`。
