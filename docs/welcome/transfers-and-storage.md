# How Clustta Transfers Files and Saves Space

Clustta treats a big file like a puzzle made from many small pieces. This helps it save storage space and use less internet data.

## One file, many reusable pieces

When you create a checkpoint, Clustta splits the file into small pieces called **chunks**.

If a piece is already stored, Clustta reuses it instead of saving another copy. This works across different checkpoints and files.

<!-- IMAGE: Show one large creative file splitting into colored puzzle pieces. Repeated pieces should point to one stored copy. -->

## Only changes travel

Imagine a picture made from 100 puzzle pieces. If you change only 3 pieces, Clustta sends those 3 during sync instead of sending all 100 again.

This makes syncing faster and saves bandwidth - the amount of internet data you use.

<!-- IMAGE: Show two computers with only three changed puzzle pieces moving between them through a server or cloud. -->

## Your pieces stay nearby

Downloaded chunks are cached inside the project's `.clst` archive. Think of it as a local box that keeps the pieces your computer may need.

When the pieces are already there, Clustta can rebuild your files without downloading them again. This also lets you keep working offline with the file data already on your computer.

<!-- IMAGE: Show a laptop with no Wi-Fi beside a .clst box containing the puzzle pieces needed to rebuild a file. -->

## In short

Clustta stores each piece once, sends only what changed, and keeps useful pieces nearby. Your projects take less space, syncing uses less bandwidth, and your work remains available offline.
