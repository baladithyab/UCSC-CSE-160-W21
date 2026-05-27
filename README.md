# UCSC CSE 160 — Introduction to Computer Graphics (Winter 2021)

WebGL assignments and LaTeX writeups for UCSC's CSE 160 graphics course.
Five assignments shipping increasing graphics complexity, from drawing
basic primitives in 2D to a full voxel-world renderer with skybox
textures and a moving camera.

This repo is also one of the projects feeding the
[`codeseys-embed`](https://github.com/topics/codeseys-embed) project-embed
pipeline — three of the assignments are live on
[codeseys.io/projects](https://codeseys.io/projects).

## Assignments

| Asg | Title | Live demo |
|---|---|---|
| **0** | Geometry and shaders — drawing colored points and triangles | [codeseys.io/projects/cse-160-asg0](https://codeseys.io/projects/cse-160-asg0) |
| **1** | Brush canvas — paint with circles, points, triangles | [codeseys.io/projects/cse-160-asg1](https://codeseys.io/projects/cse-160-asg1) |
| **2** | **Derpy Charmeleon** — fully-articulated 3D character with sliders, drag-to-rotate camera, scroll-to-zoom | [codeseys.io/projects/cse-160-asg2](https://codeseys.io/projects/cse-160-asg2) |
| **3** | Textured voxel world (deferred — 70 MB video texture) | _coming soon_ |
| **4** | Final project: extended voxel world with collectibles + camera (deferred — 70 MB video texture) | _coming soon_ |

The deferred assignments use a ~70 MB MP4 file as a video texture. They
will land on the site once the asset pipeline ships large-payload R2
delivery.

## Theory writeups (LaTeX)

The `writeups/` directory contains the four LaTeX-typeset homework
PDFs covering linear algebra, modeling and transformations, colors and
textures, and lighting + viewing/projection.

## Running locally

Each assignment is a self-contained static page. To run any of them:

```bash
cd asg2/        # or asg0, asg1
python3 -m http.server 8080
# open http://localhost:8080/asg2.html
```

Or use any static file server. There is no build step.

## Files

```
asg0/, asg1/, asg2/            interactive WebGL assignments
writeups/                      LaTeX-typeset HW writeups (PDFs)
web.codeseys.json              project-embed manifest
.github/workflows/             reusable-workflow caller for the embed pipeline
```

## Course

[UCSC CSE 160 — Introduction to Computer Graphics](https://courses.engineering.ucsc.edu/courses/cse160) — taught Winter 2021.
The shader and matrix utility code (`lib/cuon-matrix-cse160.js`,
`lib/webgl-utils.js`, `lib/webgl-debug.js`, `lib/cuon-utils.js`) is
provided by the textbook *WebGL Programming Guide* by Matsuda &
Lea (Pearson, 2013) and is reproduced here unmodified. Everything else
is original work.
