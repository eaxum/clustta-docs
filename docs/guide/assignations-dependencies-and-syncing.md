# Assignations, Dependencies and Syncing

Clustta is designed around security and efficiency of data transmission. By default, collaborators on your project have no access to any files or only collections that are marked as 'Library'. This ensures your creative work remains secure while enabling precise collaboration control.

> **Important**: Assets are **resources** by default. To assign an asset to a collaborator, you need to convert it to a task. This also makes it possible to change its status as well as display on the Kanban board.

---

## 👥 Assignations

For a collaborator to have access to any assets, those assets must be 'assigned' to them. This system ensures clear ownership and prevents collaboration conflicts.

### How Assignations Work

**Single Ownership**: Only one collaborator can be assigned to a given asset at any time. This eliminates confusion about who is responsible for what and prevents conflicting changes.

**Checkpoint Control**: To avoid conflicts, only the assignee can create checkpoints on their assigned asset. This ensures a clear chain of responsibility and version control.

**Conflict Resolution**: In the rare event of a conflict, Clustta intelligently saves checkpoints over each other, so you never actually lose any work. The system prioritizes data preservation over strict version control.

<!-- ### Assignment Benefits

- **Clear Responsibility**: Everyone knows who owns what
- **Conflict Prevention**: Single-owner model eliminates merge conflicts
- **Security**: Precise control over who accesses which assets
- **Accountability**: Easy tracking of who made which changes -->

---

## 🔗 Dependencies

In many creative projects, completing one task requires access to other resources. Rather than assigning multiple individual tasks, Clustta uses a dependency system to grant access to all necessary resources efficiently.

### How Dependencies Work

**Recursive Access**: When you assign a task to a collaborator, they automatically gain access to that asset as well as all of its dependencies recursively. This means if Asset A depends on Asset B, which depends on Asset C, assigning Asset A grants access to all three.

**Automatic Resolution**: Dependencies are resolved automatically - you don't need to manually assign each required resource.

**Hierarchical Structure**: Dependencies create a clear hierarchy of resources, making it easy to understand project structure and relationships.

### Dependency Examples

```
🎨 Main Design (assigned to Designer A)
├── 📷 Product Photos (dependency)
├── 🎨 Brand Guidelines (dependency)
│   └── 🖼️ Logo Files (sub-dependency)
└── 📝 Copy Document (dependency)
```

When Designer A is assigned the Main Design task, they automatically get access to all the dependencies they need to complete their work.

### Benefits of Dependencies

- **Efficient Assignment**: Assign one task, grant access to all necessary resources
- **Logical Organization**: Dependencies reflect real workflow relationships
- **Reduced Management**: Less manual work assigning individual assets
- **Complete Context**: Collaborators get everything they need automatically

---

## 🔄 Syncing

Clustta features a decentralized version control system that balances offline capability with team collaboration.

### How Syncing Works

**Local-First Approach**: All of your changes and checkpoints are handled locally on your computer. This means you can work without an internet connection and never lose progress due to connectivity issues.

**Manual Sync Control**: For your collaborators to access your changes, you need to actively sync. This gives you control over when your work becomes available to the team.

**Checkpoint Upload**: Syncing uploads all of your new checkpoints to the studio server, making them available to everyone else on the project.

### Syncing Benefits

**Offline Capability**:
- Work anywhere, anytime
- No dependency on internet connectivity
- Local storage ensures fast performance

**Controlled Sharing**:
- Choose when to share your progress
- Sync major milestones rather than every small change
- Maintain privacy during experimental work

**Efficient Transfer**:
- Only new checkpoints are uploaded
- Delta-based system minimizes data transfer
- Fast sync even for large creative files

### Sync Workflow

1. **Work Locally**: Make changes, create checkpoints offline
2. **Ready to Share**: Use `Ctrl+S` or click sync when ready
3. **Upload Changes**: New checkpoints are sent to the studio server
4. **Team Access**: Collaborators can now see and work with your updates

---

## 🚀 Quick Actions

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+S` | Sync Project | Upload new checkpoints to studio server |
| Convert Asset | Right-click → Convert to Task | Make asset assignable to collaborators |

---

## Security & Efficiency Summary

- **Default Privacy**: Collaborators only see assigned assets and Library collections
- **Single Ownership**: One person per asset eliminates conflicts  
- **Smart Dependencies**: Automatic access to required resources
- **Local-First**: Work offline, sync when ready
- **Efficient Transfer**: Only changes are uploaded, not entire files

---

*This system ensures your creative work stays secure while enabling seamless collaboration when and where you need it.*