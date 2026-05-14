# 王兴平面视觉设计师作品集网站

技术栈：Next.js + React + Tailwind CSS + Framer Motion。

## 运行方式

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。

## 更新作品

1. 把图片放入 `public/portfolio`。
2. 编辑 `src/data/works.json`。
3. 每个作品保持以下字段：

```json
{
  "title": "作品标题",
  "category": "品牌VI",
  "description": "作品说明",
  "image": "/portfolio/your-image.jpg",
  "tags": ["品牌", "VI", "印刷"],
  "year": "2026"
}
```

支持分类：`品牌VI`、`电商设计`、`包装设计`、`AIGC视觉`、`Logo设计`。

## 主要结构

- `src/app/page.tsx`：首页入口
- `src/components`：导航、作品卡片、弹窗、首页分区组件
- `src/data/works.json`：作品数据
- `public/portfolio`：作品图片
