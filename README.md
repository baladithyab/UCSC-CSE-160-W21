# UCSC CSE 160 — Introduction to Computer Graphics (Winter 2021)

Five WebGL assignments and four LaTeX writeups from UCSC's introductory graphics course, taught Winter 2021. The assignments build up from drawing colored 2D primitives to a fully-lit, textured 3D scene with an animated video skybox.

This repo also feeds the [`codeseys-embed`](https://github.com/topics/codeseys-embed) project-embed pipeline — every assignment is live and interactive on [codeseys.io/projects/cse-160](https://codeseys.io/projects/cse-160). The CI workflow optimizes the 70 MB galaxy texture down to ~13 MB before upload (see [`scripts/build-embeds.sh`](scripts/build-embeds.sh)).

## Assignments

| Asg | Title | What it teaches |
|---|---|---|
| **0** | 2D Drawing | Sets up the WebGL pipeline, gl-matrix transforms, basic event-driven drawing |
| **1** | Shapes & Transformations | Hierarchical transforms — translate/rotate/scale a hierarchy of triangles + squares |
| **2** | Derpy Charmeleon | Fully-articulated 3D character. Drag camera, scroll zoom, slide controls to pose limbs and waggle the tail. Hierarchy of joints with parent-relative transforms. |
| **3** | Textures, Skybox & Animated Galaxy | Multi-texture sampling on a 3D scene + a skybox sphere with an *animated* galaxy MP4 played as a video texture |
| **4** | Lighting, Shadows & Final Scene | Phong/Blinn-Phong lighting on the full textured world from asg3. The capstone — touches every prior assignment's concepts |

All five run live at [codeseys.io/projects/cse-160](https://codeseys.io/projects/cse-160) — pick the asset you want from the tab strip.

## Theory writeups (LaTeX)

The `writeups/` directory contains the four homework PDFs:

- **HW1** Linear algebra primer: vectors, matrix multiplication, dot/cross products, change of basis
- **HW2** 2D/3D transformation matrices, homogeneous coordinates, transformation composition
- **HW3** RGB/HSV color spaces, texture mapping, filtering (nearest/bilinear/mipmap)
- **HW4** Phong/Blinn-Phong shading, perspective vs orthographic projection, frustum culling

These show up on the project page as PDF embeds in the **Writeups** tab group.

## Running locally

Each assignment is a self-contained static page. The galaxy.mp4 textures in asg3 and asg4 are stored via Git LFS — you'll need `git lfs install` before cloning, or `git lfs pull` after.

```bash
git lfs install
git clone https://github.com/baladithyab/UCSC-CSE-160-W21
cd UCSC-CSE-160-W21/asg2
python3 -m http.server 8080
# open http://localhost:8080/asg2.html
```

Or use any static file server. There is no build step *for running locally*; the build step in CI exists only to optimize the 70 MB → 13 MB galaxy textures before R2 upload.

## Build pipeline

The `web.codeseys.json` manifest declares:

- `build.aptPackages: ["ffmpeg"]` — installed before the build step
- `build.script: scripts/build-embeds.sh` — re-encodes asg3/asg4's `galaxyfinal.mp4` from 1280×1280 / 70 MB → 720×720 / 13 MB

This is one of the showcase use-cases for the project-embed pipeline's build-step support — letting CI transform source artifacts into upload-ready ones rather than baking pre-optimized assets into the repo.

See [the architecture writeup](https://codeseys.io/blog/build-anything-make-it-playable-an-architecture-for-discoverable-project-embeds/) for how the manifest, workflow, and Worker upload endpoint fit together.

## Files

```
asg0/, asg1/, asg2/, asg3/, asg4/  interactive WebGL assignments
writeups/                          LaTeX-typeset HW writeups (PDFs)
scripts/build-embeds.sh            CI pre-upload texture optimization
web.codeseys.json                  project-embed manifest
.github/workflows/                 caller workflow → web-embed-workflows
```

## Course

[UCSC CSE 160 — Introduction to Computer Graphics](https://courses.engineering.ucsc.edu/courses/cse160), Winter 2021.

The shader and matrix utility code in each assignment's `lib/` (`cuon-matrix-cse160.js`, `webgl-utils.js`, `webgl-debug.js`, `cuon-utils.js`) is provided by the textbook *WebGL Programming Guide* by Matsuda & Lea (Pearson, 2013) and is reproduced unmodified. Everything else is original work.
