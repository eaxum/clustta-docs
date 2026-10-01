# Install Clustta

Clustta has two main interfaces:

- **The desktop app** - Where you actually do your work. Available for Windows, macOS, and Linux.
- **The web dashboard** - At [app.clustta.com](https://app.clustta.com). Provides browser-based access to Clustta projects and files, similar to a cloud drive. Users can manage assignments and project metadata, while desktop-specific file and versioning operations remain in the desktop app.

The web dashboard is currently available with the managed Clustta server. Support for privately hosted installations is planned as a licensed feature.

You can sign up for an account from either.

## Download the desktop app

Pick the install method that fits your platform:

### Windows

Grab the installer from [clustta.com/download](https://clustta.com/download), or install from the [Microsoft Store](https://apps.microsoft.com/detail/9PNRGHGP3LGX).

### macOS

Grab the `.dmg` from [clustta.com/download](https://clustta.com/download), or install from the [Mac App Store](https://apps.apple.com/us/app/clustta/id6748349288). Both Intel and Apple Silicon are supported.

### Linux

Download the `.deb` (Debian/Ubuntu) or `.AppImage` from [clustta.com/download](https://clustta.com/download).

For Debian/Ubuntu:

```bash
sudo dpkg -i clustta_*.deb
```

For the AppImage:

```bash
chmod +x Clustta-*.AppImage
./Clustta-*.AppImage
```

## Create an account

You'll need a Clustta account to use the app. Personal projects stay on your machine by default; sign in to **ClusttaCloud™** to sync them between your own computers or to collaborate with other indie artists.

1. Open the desktop app (or visit [app.clustta.com](https://app.clustta.com)).
2. Click **Sign up** and provide your name, email and password.
3. Verify your email when the confirmation arrives.
4. Sign in.

<!-- TODO: screenshot of sign-in screen -->

After signing in for the first time, you'll land in your **Personal studio** - your private workspace. Every Clustta user has one and projects here stay local unless you choose to sync them to ClusttaCloud™.

::: tip
Personal projects stay on your machine by default. Sign in to ClusttaCloud™ whenever you want to sync them between your own computers or share them with collaborators.
:::

During storage setup, Clustta suggests locations for its data and your working projects. Review both paths before continuing: the data location holds Clustta project data, while the working-projects location holds the files you edit in creative applications. You can accept the suggested folders or browse to suitable locations on another drive.

In the Mac App Store app, selecting folders in the system picker also grants the app permission to access them. A typed path alone does not grant that permission. If folder selection is cancelled, complete the requested selection before continuing setup.

## Switching studios

Once you have access to more than one studio (your Personal studio + any team studios you create or get added to), use the dropdown at the top-left of the app - labelled with the current studio name - to switch.

<!-- TODO: screenshot of studio switcher dropdown -->

## Using multiple accounts

Clustta Desktop can keep more than one signed-in account available on the same computer. Open the account menu from your profile avatar, then select **Add Account** and sign in. Added accounts appear in the same menu.

Select another account to switch. Clustta reloads the studios, projects, preferences, and permissions belonging to that account. Finish or cancel any active operation before switching.

Use the remove action beside an additional account to remove its saved sign-in from this computer. **Sign out** removes the current account; if another saved account remains, Clustta switches to it. Removing an account does not delete the Clustta account or its remote projects.

When the app is using an offline account, sign in before adding another account or accessing remote studios.

## What's next

- **Just want to try it?** → [Create your first project](./first-project.md)
- **Setting up a team?** → [Studios & collaboration](./studios.md)
- **Want to run your own server?** → [Self-hosting guide](./self-hosting.md)
