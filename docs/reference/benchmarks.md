# Benchmarks

How does Clustta perform against established version control systems on real creative production data? This page summarises the public benchmark we publish at [github.com/eaxum/clustta-benchmarks](https://github.com/eaxum/clustta-benchmarks), which extends [Blender Studio's 2023 VCS benchmark](https://studio.blender.org/blog/benchmarking-version-control-git-lfs-svn-mercurial/) by adding Clustta and Perforce.

## Headline result

Across **788 commits** and **148 GB** of real creative assets (`.BLEND`, `.PSD`, `.FBX`, `.MOV` and friends), Clustta finished the replay in **12.8 minutes** and stored the entire history in just **36.6 GB** - the fastest commit time *and* the smallest repository footprint of every system tested.

| System    |  Commit time | Repository size |
| --------- | -----------: | --------------: |
| **Clustta** |  **12.8 min** |     **36.6 GB** |
| Git LFS   |    14.7 min |       143.2 GB |
| Git       |    38.0 min |        78.6 GB |
| SVN       |    42.9 min |       145.1 GB |
| Perforce  |   111.3 min |        78.8 GB |

Git LFS came closest on speed but used roughly **4×** the disk because it stores every version of every binary file in full. Git and SVN took 3× longer than Clustta and used 2-4× the storage. Perforce was the clear outlier on time.

## Why these numbers

Clustta uses **content-defined chunking** + **Zstandard compression** + **content-addressed deduplication** at the storage layer. Identical chunks across versions, files and even collaborators are stored exactly once. A small edit to a 2 GB scene typically writes only a few new chunks; the rest are referenced.

That's also why the *commit* operation is fast: most of the work in a typical creative checkpoint is "this file has 12 new chunks, here they are". There's no full re-zip, no whole-file diff, no copy of the previous version.

See [Storage & Versioning](../architecture/storage.md) for the full design.

## Methodology

The benchmark uses a **replay** approach: every commit from a real Clustta project is reconstructed and replayed into each system in chronological order, measuring per-commit time and cumulative repository size.

- **Project**: [Tired King (ikegwudike)](https://eaxum.com/portfolio/ikegwudike/) - a 3D animation production
- **Assets**: 199 files, 788 commit groups, 1,167 checkpoints, ~148 GB total
- **Largest single file**: 3.6 GB
- **Hardware**: Intel i7-14700F, 16 GB DDR5, Samsung PM9A1 NVMe SSD, Windows 11 Pro
- **Versions**: Git 2.45.2 · SVN 1.14.5 · Perforce 2025.2 · Clustta v0.4.33

Streaming extraction means only one commit's worth of files exists on disk at a time, so the benchmark can run on projects much larger than free disk space.

### What each system actually does

| System    | Commit operation timed                                | Storage measured                |
| --------- | ----------------------------------------------------- | ------------------------------- |
| Git       | `git add .` (staging into packfiles)                 | `.git/` directory               |
| Git LFS   | `git add .` + `git commit` + `git push` to upstream  | `.git/` + bare upstream         |
| SVN       | `svn commit` to local `svnadmin` repository          | `.svn/` + upstream repo         |
| Perforce  | `p4 reconcile` + `p4 submit` to local `p4d`          | Server root (`db.*` + depot)    |
| Clustta   | Process and store via Clustta pipeline               | `.clst` database file           |

## Reproduce it yourself

The benchmark harness, raw CSVs and gnuplot scripts are open source:

> [github.com/eaxum/clustta-benchmarks](https://github.com/eaxum/clustta-benchmarks)

Bring your own project (any `.clst` file with enough history will do), or use the published dataset. Pull requests adding new systems or new project shapes are welcome.

## Further reading

- [Blender Studio: SVN vs Git LFS benchmark](https://studio.blender.org/blog/svn-vs-git-lfs/) - the original methodology that inspired this work
- [Storage & Versioning](../architecture/storage.md) - how Clustta's chunked storage works under the hood
