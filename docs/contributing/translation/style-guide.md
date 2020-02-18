---
title: Translation Style Guide
---

Each language translation may have some specific ways it differs from the advice Gatsby provides for writing in English, such as the use of "you" as the pronoun or the Oxford comma. Each translation group should decide on conventions and stick with them for consistency, documenting those decisions in the repo's [style guide](https://github.com/gatsbyjs/gatsby-i18n-source/blob/master/style-guide.md) file to set contributors up for success. Use the [English style guide](/contributing/gatsby-style-guide/) as a reference to determine the equivalent rules in your language.

Guidelines that remain firm no matter the language stem from the goals and values of Gatsby as a project: to provide a **friendly community for Gatsby learners of all skill and experience levels** that's also **safe and welcoming to contributors**. Translated docs and learning materials should [maintain these values](/blog/2019-04-19-gatsby-why-we-write/) with **high-quality spelling and grammar**, accurate information, similar structure and purpose. For any questions about guidelines, feel free to [get in touch](/contributing/how-to-contribute/#not-sure-how-to-start-contributing) with the Gatsby team.

### Glossary

The style guide has a [glossary section](https://github.com/gatsbyjs/gatsby-i18n-source/blob/master/style-guide.md#glossary) that you can use to fill in common translations. Look at the English [Glossary](/docs/glossary/) for a list of terms that are useful to have translations for.

### Universal style guide

The following rules should apply in all translations and can serve as a basis for your language-specific style guide.

#### Keep the meaning of the source

Keep the meaning of the original English source even if it is confusing or has a typo. If you find an error that can be fixed, create an issue or pull request to the original [gatsby repo](https://github.com/gatsbyjs/gatsby) so that all translations can benefit from the change.

#### Text in code blocks

Leave text in code blocks untranslated except for comments. You may optionally translate text in strings, but be careful not to translate strings that refer to code!

✅ DO:

```jsx
// Ejemplo
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div>
)
```

✅ ALSO OKAY:

```jsx
// Ejemplo
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>¡Hola Gatsby!</div>
)
```

❌ DON'T:

```jsx
// Ejemplo
import React from "react"
export default () => (
  // 'purple' is a CSS keyword
  <div style={{ color: `morado`, fontSize: `72px` }}>¡Hola Gatsby!</div>
)
```

❌ DEFINITELY DON'T:

```jsx
importar Reaccionar desde "reaccionar"
exportar defecto () => (
   <div estilo = {{color: `morado`, fontSize:` 72px`}}> ¡Hola Gatsby! </div>
)
```

#### Internal links

Translate link text but keep all slugs and hashes in links the same as they are in English.

✅ OK:

```markdown
- [Configure su entorno de desarrollo](/tutorial/set-up-your-development-environment)
```

❌ DON'T:

```markdown
- [Configura tu entorno de desarrollo](/tutorial/configura-tu-entorno-de-desarrollo)
```

#### External links

If an external link is to an article in a reference like [MDN] or [Wikipedia], and a version of that article exists in your language that is of decent quality, consider linking to that version instead.

[mdn]: https://developer.mozilla.org/en-US/
[wikipedia]: https://en.wikipedia.org/wiki/Main_Page

✅ OK:

```markdown
Los elementos de React son [inmutables](https://es.wikipedia.org/wiki/Objeto_inmutable).
```

For links that have no equivalent (Stack Overflow, YouTube videos, etc.), use the English link.
