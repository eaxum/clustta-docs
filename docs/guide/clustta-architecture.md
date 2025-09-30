
## Overview

Clustta is a distributed version control system that leverages SQLite databases for storing and managing versioned content. Unlike traditional VCS systems like Git that use file-based storage, Clustta uses a database-centric approach for tracking changes, storing content, and managing project history.

## Core Architecture

1. **SQLite Database Foundation**
   - Projects in Clustta are stored as `.clst` SQLite database files
   - Each project database contains tables for tracking tasks, checkpoints (versions), and metadata
   - Uses transactions for data integrity when creating or updating content

2. **Content-Addressable Chunking System**
   - Files are split into chunks using content-defined chunking (CDC) algorithm
   - Each chunk is identified by its SHA-256 hash
   - Chunks are compressed using zstd compression for storage efficiency
   - Deduplication occurs naturally as identical chunks share the same hash

3. **Distributed Architecture**
   - Client-server model with auto sync (only for metadata).
   - Allows for cloning projects from remote repositories
   - Uses a pull-based system to retrieve the latest checkpoints


## Data Flow

1. **File Storage Process**:
   - Files are chunked using content-defined boundaries
   - Each chunk is hashed, compressed, and stored in the database
   - File metadata references these chunks by their hash identifiers

2. **Version Creation**:
   - Create a task (equivalent to a repository in Git)
   - Create checkpoints (commits) that reference specific file states
   - Each checkpoint stores references to the chunks that make up the files

3. **File Retrieval**:
   - Reconstruct files by retrieving chunks based on their hashes
   - Decompress and reassemble chunks in the correct order
