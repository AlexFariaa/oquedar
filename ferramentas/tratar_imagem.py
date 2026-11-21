"""Trata a foto de um produto no padrão do oquedar.

Uso:
    python ferramentas/tratar_imagem.py <entrada> <saida.webp> [--lado 900] [--manter-fundo]

- Recorta o fundo: usa o rembg se estiver instalado; senão, remove o fundo
  branco/quase branco que encosta nas bordas da foto.
- Corta a sobra transparente, reduz para no máximo --lado px e salva em WebP.
- --manter-fundo: só reduz e converte (para quando o recorte estraga o produto).

Precisa de Pillow (pip install pillow). O rembg é opcional (pip install rembg).
"""

import argparse
import sys
from collections import deque
from pathlib import Path

from PIL import Image

LIMIAR_BRANCO = 238  # canal a partir do qual o pixel conta como fundo branco


def recortar_rembg(img):
    try:
        from rembg import remove  # type: ignore
    except ImportError:
        return None
    return remove(img.convert("RGBA"))


def recortar_fundo_branco(img):
    """Torna transparente o fundo claro conectado às bordas (flood fill)."""
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()

    def claro(x, y):
        r, g, b, a = px[x, y]
        return a == 0 or (r >= LIMIAR_BRANCO and g >= LIMIAR_BRANCO and b >= LIMIAR_BRANCO)

    visto = bytearray(w * h)
    fila = deque()
    for x in range(w):
        fila.append((x, 0))
        fila.append((x, h - 1))
    for y in range(h):
        fila.append((0, y))
        fila.append((w - 1, y))

    while fila:
        x, y = fila.popleft()
        i = y * w + x
        if visto[i]:
            continue
        visto[i] = 1
        if not claro(x, y):
            continue
        r, g, b, _ = px[x, y]
        px[x, y] = (r, g, b, 0)
        if x > 0:
            fila.append((x - 1, y))
        if x < w - 1:
            fila.append((x + 1, y))
        if y > 0:
            fila.append((x, y - 1))
        if y < h - 1:
            fila.append((x, y + 1))
    return img


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("entrada")
    ap.add_argument("saida")
    ap.add_argument("--lado", type=int, default=900, help="lado maior máximo, em px (padrão 900)")
    ap.add_argument("--manter-fundo", action="store_true", help="não recorta o fundo")
    ap.add_argument("--qualidade", type=int, default=82)
    a = ap.parse_args()

    img = Image.open(a.entrada)
    img.load()

    metodo = "sem recorte"
    if not a.manter_fundo:
        recortada = recortar_rembg(img)
        if recortada is not None:
            img, metodo = recortada, "rembg"
        else:
            img, metodo = recortar_fundo_branco(img), "fundo branco"
        caixa = img.getchannel("A").getbbox()
        if caixa is None:
            sys.exit("A imagem ficou vazia depois do recorte. Tente --manter-fundo.")
        img = img.crop(caixa)
    elif img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA")

    img.thumbnail((a.lado, a.lado), Image.LANCZOS)

    saida = Path(a.saida)
    saida.parent.mkdir(parents=True, exist_ok=True)
    img.save(saida, "WEBP", quality=a.qualidade, method=6)
    kb = saida.stat().st_size // 1024
    print(f"{saida} | {img.size[0]}x{img.size[1]} | {kb} KB | recorte: {metodo}")


if __name__ == "__main__":
    main()
