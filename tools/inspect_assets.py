from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(r"D:\Echo_Web\素材")
OUTPUT = Path(
    r"C:\Users\Administrator\.codex\visualizations\2026\10\14\01a139f7-d741-72c0-9a69-ced8b8dda81a"
)

GROUPS = {
    "brochure": sorted((ROOT / "宣传手册").glob("*.jpg")),
    "boards": sorted((ROOT / "宣传版面").glob("*.jpg")),
    "models": sorted((ROOT / "仿真模型示例").glob("*.jpg")),
    "adams": sorted((ROOT / "ADAMS文件的导入和求解").glob("*.jpg")),
}


def create_contact_sheet(name: str, files: list[Path]) -> Path:
    columns = 2
    tile_width, tile_height, label_height = 620, 420, 40
    rows = (len(files) + columns - 1) // columns
    sheet = Image.new(
        "RGB", (columns * tile_width, rows * (tile_height + label_height)), "#101b2e"
    )
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 22)

    for index, path in enumerate(files):
        image = Image.open(path).convert("RGB")
        fitted = ImageOps.contain(image, (tile_width - 20, tile_height - 20))
        x = (index % columns) * tile_width + (tile_width - fitted.width) // 2
        y = (index // columns) * (tile_height + label_height) + (
            tile_height - fitted.height
        ) // 2
        sheet.paste(fitted, (x, y))
        draw.text(
            (
                (index % columns) * tile_width + 16,
                (index // columns) * (tile_height + label_height) + tile_height + 4,
            ),
            path.name,
            fill="white",
            font=font,
        )

    output_path = OUTPUT / f"{name}-contact-sheet.jpg"
    sheet.save(output_path, quality=88)
    return output_path


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for group_name, group_files in GROUPS.items():
        print(create_contact_sheet(group_name, group_files))
