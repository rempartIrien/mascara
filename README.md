# Mascara

CSS-in-JS solution.

Work in progress.

## Repository structure

This repository uses NPM workspaces and contains:

- a package named `@mascara/core` for core functions that can be used without framework
- a package named `@mascara/react` for functions that can bes used with React component
- a package named `@mascara/site` for a website showcasing Mascara to come

## FAQ

### Why don't unused styles get cleaned?

This is something I looked for at the beginning. It's seems natural, logical to remove what we add, to unsubscribe from what we subscribed to; we were told to.

That's why I sought for a solution and I did not found anything simple, so I browsed other library repositories in quest of salute. And I found stuff like:

- [Someone noting that styles do not get removed in Stitches](https://github.com/modulz/stitches/issues/884)
- [Someone noting that styles do not get removed in Emotion](https://github.com/emotion-js/emotion/issues/488)
- [Someone asking for a way to clean styles in Material UI (using Emotion)](https://github.com/mui/material-ui/issues/28877)

I guess this is because on one hand everyone has same reflexes and on the other hand it is technically difficult and is not worth it. Just think about it: why do you want to remove unused styles? and what did styles look like in the old days?

Years ago websites embedded all CSS rules at once in a big CSS file. Did you use all CSS rules at anytime? Hell no! because a single page did not use all CSS rules. It means the browser handled many unused styles at anytime.

Now think about today: when you browse the app, you get more and more CSS styles and the more you can get is... the same amount of styles as previously with the big CSS file. The _only_ difference is when these rules get generated: at build time before, at runtime now.

## Why?

I read [this article](https://blog.maximeheckel.com/posts/building-a-design-system-from-scratch/) by Maxime Heckel and wanted to make my own design system. Digging in depth makes me get interested in CSS-in-JS libraries. I still want to make a design system ultimately; however, I find it very rewarding to tackles problematics and find solutions.

Don't forget to check [Stitches](https://stitches.dev/) and [Radix](https://www.radix-ui.com/) projects my [Modulz](https://github.com/modulz) which inspired me.
