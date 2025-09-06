# Asset states, Checkpoints and Task Status

## Asset states

Recall that assets in Clustta are files you work with or links to external resources for your project. As you collaborate and iterate on your creative work, these assets will transition between different states based on your actions and team collaboration.


<br>
<div align="center">
  <img src="/images/asset-states/asset-state-example.png" alt="Description">
</div>
<br>

### Understanding Asset states

Each asset displays a visual indicator showing its current state. Clicking on the state button will trigger the appropriate action to resolve or manage that state.

---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/asset-states/layers-plus-danger.svg" alt="Description">

<div class ="header-text" >

#### **Untracked**

</div>
</div>

<div align="center">
  <img src="/images/asset-states/asset-state-untracked.png" alt="Description">
</div>

These are files that Clustta hasn't registered yet. They exist in your project directory but aren't being managed by Clustta's version control system.  

**Action**: Clicking will add the file to Clustta's tracking system and create an initial checkpoint.

**When this occurs:**
- Files created outside of Clustta but within the project folder
- Assets imported from external sources
- Files added by other software
- Resources copied directly into the project directory


::: tip Tip
Track files as soon as you want to start managing their versions and collaborate on them.
:::

---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/asset-states/jigsaw.svg" alt="Description">

<div class ="header-text" >

**Rebuild**

</div>
</div>

<div align="center">
  <img src="/images/asset-states/asset-state-rebuild.png" alt="Description">
</div>
<br>

This indicates that the asset either isn't downloaded or is missing from your computer.  

**Action**: Clicking will download the file to your computer and make it available for use.

**When this occurs:**
- First time accessing a shared project
- Asset was manually deleted from your computer
- Working on a new device

---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/asset-states/circle-check-go.svg" alt="Description">

<div class ="header-text" >

**Normal**

</div>
</div>

<div align="center">
  <img src="/images/asset-states/asset-state-normal.png" alt="Description">
</div>
<br>

The asset is on your computer and is up to date with the latest version.  

**Action**: No action needed - you're ready to work!

**When this occurs:**
- After successfully downloading an asset
- When you're working with the latest version
- Immediately after creating a new checkpoint

---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/asset-states/layers-plus-alert.svg" alt="Description">

<div class ="header-text" >

**Modified**

</div>
</div>

<div align="center">
  <img src="/images/asset-states/asset-state-modified.png" alt="Description">
</div>
<br>

You have made changes to the asset after your last checkpoint.  

**Action**: Clicking will prompt you to add a checkpoint to save your progress. You can also choose to discard changes by reverting to the last checkpoint.

**When this occurs:**
- After editing and saving a file
- When you've made progress since your last checkpoint


::: tip Tip
Regular checkpoints help you track progress and provide safety points you can return to if needed.
:::
---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/asset-states/circle-check-alert.svg" alt="Description">

<div class ="header-text" >

**Outdated**

</div>
</div>

<div align="center">
  <img src="/images/asset-states/asset-state-outdated.png" alt="Description">
</div>
<br>


Your copy of the file is not the latest version. A collaborator has made changes that you haven't downloaded yet.  

**Action**: Clicking will update the file and download the latest version from your team.

**When this occurs:**
- A teammate has shared updates to the asset

**⚠️ Important**: Before updating, ensure you've saved any local changes or they may be overwritten.

---

## Quick Reference

| State | Icon | Action Required | Click Result |
|-------|------|----------------|--------------|
| **Untracked** | <img class="icon-24" src="/icons/asset-states/layers-plus-danger.svg" alt="Description">  | Registration needed | Adds file to Clustta tracking |
| **Rebuild** | <img class="icon-24" src="/icons/asset-states/jigsaw.svg" alt="Description">  | Download needed | Downloads asset to computer |
| **Normal** | <img class="icon-24" src="/icons/asset-states/circle-check-go.svg" alt="Description">  | None | No action needed |
| **Modified** | <img class="icon-24" src="/icons/asset-states/layers-plus-alert.svg" alt="Description">  | Checkpoint recommended | Prompts to save checkpoint or revert |
| **Outdated** | <img class="icon-24" src="/icons/asset-states/circle-check-alert.svg" alt="Description">  | Update available | Downloads latest version |

---

## Checkpoints

Checkpoints are a core concept when working with assets in Clustta. They provide a powerful, efficient way to manage your creative work without the traditional hassles of file versioning.

### What Are Checkpoints?

Think of checkpoints as smart snapshots of your work that go far beyond simple file copies. They're designed to give you complete control over your project's evolution while maintaining efficiency and collaboration.

---

#### 📍 **Progress Tracking**

Checkpoints let you mark significant milestones in your project. Whether you've completed a major section, tried a new approach, or reached a stable point, checkpoints give you the confidence to experiment knowing you can always return to a known good state.

---

#### 🛡️ **File Protection**

If your file gets corrupted due to software crashes, power outages, or other technical issues, you won't lose your work. Clustta can instantly rollback to your last checkpoint, ensuring your creative efforts are always protected.

---

#### ⚡ **Efficient Storage**

Unlike traditional versioning (v1, v2, v3, etc.), checkpoints are not duplicates of the entire file. Clustta efficiently breaks down files and stacks new changes over each other, storing only what actually changed between versions.

**Traditional Approach:**
```
Project_v1.psd (500MB)
Project_v2.psd (510MB) 
Project_v3.psd (530MB)
Total: ~1.54GB for 3 versions
```

**Clustta Approach:**
```
Project.psd + Changes_1 + Changes_2
Total: ~550MB 
```

---

#### 🚀 **Fast Collaboration**

This efficient approach makes collaboration incredibly fast. When sharing files with teammates, you never have to download or upload entire files. Only the changes (deltas) are transferred, making even large creative files quick to sync across your team.

---

###  **Creating checkpoints**

1. Locate the **Modified** icon <img class="icon-24" src="/icons/asset-states/layers-plus-alert.svg" alt="Description"> on the asset you want to creat a checkpoint for.

<div align="center">
  <img src="/images/asset-states/add-checkpoint-screen.png" alt="Description">
</div>

2. Clicking it will trigger a modal prompting you to add a descriptive comment for the new checkpoint.
Go ahead and click on **Create**.

<div align="center">
  <img src="/images/asset-states/add-checkpoint-modal.png" alt="Description">
</div>



<!-- ###  **Accessing checkpoints** -->

###  **Best Practices**

- **Checkpoint Frequently**: Create checkpoints at natural stopping points or before trying risky experiments
- **Use Descriptive Names**: Give your checkpoints meaningful names so you can easily identify them later
- **Before Major Changes**: Always checkpoint before attempting significant modifications
- **Daily Checkpoints**: Consider creating at least one checkpoint per work session

---

### Quick Actions

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+C` | Create new checkpoint |
| Click **Modified** state | Prompted to checkpoint or revert |

<br>

---


## Task Status

As you work, whether individually or with a team, you might want to track the progress of each asset. Task statuses provide a clear visual indicator of where each piece of your project stands in the creative workflow.

Clustta offers five distinct task statuses that cover the complete lifecycle of creative work:

---


<div class ="header-with-icon" >
<img class="icon-24" src="/icons/task-status/status_todo.svg" alt="Description">

<div class ="header-text" >

**Todo**

</div>
</div>

**Status**: Not started  
**Description**: The asset or task is identified and planned but work hasn't begun yet.

**When to use:**
- New assets added to the project scope
- Tasks in the project backlog
- Items scheduled for future work sessions

---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/task-status/status_wip.svg" alt="Description">

<div class ="header-text" >

**WIP** (Work in Progress)

</div>
</div>

**Status**: Actively being worked on  
**Description**: The asset is currently being created, edited, or modified.

**When to use:**
- When you start working on a task
- Files that are actively being edited
- Assets undergoing revisions or iterations

---


<div class ="header-with-icon" >
<img class="icon-24" src="/icons/task-status/status_wfa.svg" alt="Description">

<div class ="header-text" >

**WFA** (Waiting for Approval)

</div>
</div>

**Status**: Pending review or feedback  
**Description**: The work is complete but requires approval, feedback, or sign-off before proceeding.

**When to use:**
- Completed work awaiting client review
- Assets pending team lead approval
- Items requiring stakeholder feedback
- Creative work ready for quality review

---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/task-status/status_ready.svg" alt="Description">

<div class ="header-text" >

**Ready** 

</div>
</div>


**Status**: Approved and ready for next phase  
**Description**: The asset has been reviewed, approved, and is ready for the next stage of the workflow or final delivery.

**When to use:**
- Assets approved after review
- Files ready for final export or delivery
- Tasks cleared to move to production
- Work approved for implementation

---

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/task-status/status_done.svg" alt="Description">

<div class ="header-text" >

**Done**

</div>
</div>


**Status**: Completed and delivered  
**Description**: The asset is fully complete, delivered, and requires no further action.

**When to use:**
- Final deliverables sent to client
- Assets successfully integrated into final product
- Tasks that are completely finished
- Archive-ready work

---

### Workflow Example

A typical creative asset might flow through statuses like this:

<div class ="header-with-icon" >
<img class="icon-24" src="/icons/task-status/status_todo.svg" alt="Description"> Todo → 
<img class="icon-24" src="/icons/task-status/status_wip.svg" alt="Description"> WIP → 
<img class="icon-24" src="/icons/task-status/status_wfa.svg" alt="Description"> WFA → 
<img class="icon-24" src="/icons/task-status/status_ready.svg" alt="Description"> Ready → 
<img class="icon-24" src="/icons/task-status/status_done.svg" alt="Description"> Done
</div>


<!-- **Team Collaboration Benefits:**
- **Clear Communication**: Everyone knows exactly where each asset stands
- **Workflow Transparency**: Easy to identify bottlenecks or dependencies
- **Progress Tracking**: Visual overview of project completion status
- **Accountability**: Clear ownership and responsibility for each stage -->

<br>

---

### Quick Status Reference

| Status | Icon | Meaning | Next Action |
|--------|------|---------|-------------|
| **Todo** | <img class="icon-24" src="/icons/task-status/status_todo.svg" alt="Description"> | Not started | Begin work |
| **WIP** | <img class="icon-24" src="/icons/task-status/status_wip.svg" alt="Description"> | In progress | Continue/complete work |
| **WFA** | <img class="icon-24" src="/icons/task-status/status_wfa.svg" alt="Description"> | Awaiting approval | Review and approve |
| **Ready** | <img class="icon-24" src="/icons/task-status/status_ready.svg" alt="Description"> | Approved | Proceed to delivery |
| **Done** | <img class="icon-24" src="/icons/task-status/status_done.svg" alt="Description"> | Complete | Archive/celebrate |

<!-- ---

*Task statuses help maintain project momentum and ensure nothing falls through the cracks in your creative workflow.* -->