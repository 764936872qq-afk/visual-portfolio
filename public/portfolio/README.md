# Portfolio Image Folder

作品数据以 `src/data/works.json` 为唯一数据源。图片路径不要手写完整 URL，由代码按分类、项目文件夹和文件名自动拼接。

推荐结构：

```text
public/portfolio/
  品牌VI/
    项目A/
      cover.jpg
      01.jpg
      02.jpg
  电商设计/
    项目B/
      cover.jpg
      01.jpg
```

`works.json` 中每个项目只维护项目级字段：

```json
{
  "title": "项目A",
  "category": "品牌VI",
  "projectFolder": "项目A",
  "description": "项目说明",
  "imageFiles": ["cover.jpg", "01.jpg", "02.jpg"],
  "tags": ["品牌设计", "视觉设计"],
  "year": "2026"
}
```

维护规则：

- 作品卡片封面自动拼接为 `/portfolio/{category}/{projectFolder}/cover.jpg`。
- 弹窗轮播图由 `imageFiles` 自动拼接为同项目文件夹下的图片路径。
- `imageFiles` 可以省略，默认只展示 `cover.jpg`。
- 移动项目文件夹后，只需要同步修改该项目的 `category` 或 `projectFolder`。
- 不要在 `works.json` 里维护 `image`、`images` 这类完整路径字段。
