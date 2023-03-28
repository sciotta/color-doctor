---
sidebar_position: 2
---

# Command Line Tool

The Color Doctor CLI is your tool to analysis colors and generate report (html) or separated comma (csv) files.

:::info
We are always looking for contributors to help us make this library even better! 
:::

## Commands {#commands}


### find-colors

This is the main and unique (until now) command to find and generate report. In this first version I think it's fine and delivering a great value for who is using this project.

```bash
color-doctor find-colors [SEARCH_SHELL_PATTERN] -f report
```

| Command            | Default                        | Values         | Description                                                                                                                                                               |
| ------------------ | ------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --format \ **-f**  | report                         | report \| csv   | Export format type                                                                                                                                                        |
| --help \ **-h**    |                                |                | Show find-colors options                                                                                                                                                  |


You can use ***SEARCH_SHELL_PATTERN*** or omit it to use actual terminal folder and the folowing formats:
* css
* scss
* jsx
* js
* ts
* tsx

:::info
By default, we ignore `node_modules` in any case for performance and convenience.
:::

Let me show you an example of this pattern:

```bash
../project-folder/**/*.(js|css|jsx|ts|tsx|scss)
```

For more information about this pattern you can check [node-glob](https://github.com/isaacs/node-glob#readme) library.