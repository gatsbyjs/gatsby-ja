---
title: Data Storage (Redux)
---

During Gatsby's bootstrap & build phases, the state is stored and manipulated using the [Redux](https://redux.js.org/) library. The key purpose of using Redux in Gatsby internals is to centralize all of the state logic. Reviewing the Gatsby [reducers](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby/src/redux/reducers) and [actions](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby/src/redux/actions) folders gives a comprehensive picture of what state manipulations are possible.

Please use the [Gatsby Style Guide](/contributing/gatsby-style-guide/) to ensure your
Pull Request gets accepted.
