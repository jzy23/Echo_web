from pathlib import Path

from PIL import Image


ROOT = Path(r"D:\Echo_Web")
OUTPUT = ROOT / "frontend" / "src" / "assets" / "capabilities"
APPLICATION_OUTPUT = ROOT / "frontend" / "src" / "assets" / "applications"


def crop(
    source: str,
    destination: str,
    box: tuple[int, int, int, int],
    output: Path = OUTPUT,
) -> None:
    image = Image.open(ROOT / "素材" / source).convert("RGB")
    image.crop(box).save(output / destination, quality=92, optimize=True)


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    APPLICATION_OUTPUT.mkdir(parents=True, exist_ok=True)

    # The four crops come from the real capability panels in 宣传版面/10.jpg.
    # Keeping the extraction coordinates here makes the asset provenance easy to update.
    crop("宣传版面/10.jpg", "dynamics.jpg", (18, 226, 392, 476))
    crop("宣传版面/10.jpg", "model-library.jpg", (402, 226, 765, 476))
    crop("宣传版面/10.jpg", "co-simulation.jpg", (775, 226, 1143, 476))
    crop("宣传版面/10.jpg", "validation.jpg", (1150, 226, 1518, 476))

    # Application scenes are the small image panels near the bottom of the same
    # board. The passenger and ADAS references are clear enough to reuse directly.
    crop("宣传版面/10.jpg", "passenger.jpg", (134, 742, 264, 855), APPLICATION_OUTPUT)
    crop("宣传版面/10.jpg", "adas.jpg", (526, 742, 655, 855), APPLICATION_OUTPUT)

    # Use the dedicated CarSim / TruckSim and special-vehicle panels for clearer
    # application semantics than the small mixed application strip.
    crop("宣传版面/5.jpg", "commercial.jpg", (760, 340, 1140, 680), APPLICATION_OUTPUT)
    crop("宣传版面/5.jpg", "special-vehicle.jpg", (1140, 1590, 1390, 1840), APPLICATION_OUTPUT)

