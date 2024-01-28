<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/snowflake

**Deconstruct and generate snowflake IDs using BigInts.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/utilities)](https://github.com/sapphiredev/utilities/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/utilities/branch/main/graph/badge.svg?token=OEGIV6RFDO)](https://codecov.io/gh/sapphiredev/utilities)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/snowflake?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/snowflake)
[![npm](https://img.shields.io/npm/v/@sapphire/snowflake?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/snowflake)

</div>

**Table of Contents**

-   [Description](#description)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
    -   [Constructing snowflakes](#constructing-snowflakes)
        -   [Snowflakes with custom epoch](#snowflakes-with-custom-epoch)
        -   [Snowflake with Discord epoch constant](#snowflake-with-discord-epoch-constant)
        -   [Snowflake with Twitter epoch constant](#snowflake-with-twitter-epoch-constant)
    -   [Deconstructing snowflakes](#deconstructing-snowflakes)
        -   [Snowflakes with custom epoch](#snowflakes-with-custom-epoch-1)
        -   [Snowflake with Discord epoch constant](#snowflake-with-discord-epoch-constant-1)
        -   [Snowflake with Twitter epoch constant](#snowflake-with-twitter-epoch-constant-1)
-   [Buy us some doughnuts](#buy-us-some-doughnuts)
-   [Contributors ✨](#contributors-%E2%9C%A8)

## Description

There is often a need to get a unique ID for entities, be that for Discord messages/channels/servers, keys in a database or many other similar examples. There are many ways to get such a unique ID, and one of those is using a so-called "snowflake". You can read more about snowflake IDs in [this Medium article](https://medium.com/better-programming/uuid-generation-snowflake-identifiers-unique-2aed8b1771bc).

## Features

-   Written in TypeScript
-   Bundled with esbuild so it can be used in NodeJS and browsers
-   Offers CommonJS, ESM and UMD bundles
-   Offers predefined epochs for Discord and Twitter
-   Fully tested

## Installation

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/snowflake
```

## Usage

**Note:** While this section uses `require`, the imports match 1:1 with ESM imports. For example `const { Snowflake } = require('@sapphire/snowflake')` equals `import { Snowflake } from '@sapphire/snowflake'`.

### Constructing snowflakes

#### Snowflakes with custom epoch

```typescript
// Import the Snowflake class
const { Snowflake } = require('@sapphire/snowflake');

// Define a custom epoch
const epoch = new Date('2000-01-01T00:00:00.000Z');

// Create an instance of Snowflake
const snowflake = new Snowflake(epoch);

// Generate a snowflake with the given epoch
const uniqueId = snowflake.generate();
```

#### Snowflake with Discord epoch constant

```typescript
// Import the Snowflake class
const { DiscordSnowflake } = require('@sapphire/snowflake');

// Generate a snowflake with Discord's epoch
const uniqueId = DiscordSnowflake.generate();

// Alternatively, you can use the method directly
const uniqueId = DiscordSnowflake.generate();
```

#### Snowflake with Twitter epoch constant

```typescript
// Import the Snowflake class
const { TwitterSnowflake } = require('@sapphire/snowflake');

// Generate a snowflake with Twitter's epoch
const uniqueId = TwitterSnowflake.generate();

// Alternatively, you can use the method directly
const uniqueId = TwitterSnowflake.generate();
```

### Deconstructing snowflakes

#### Snowflakes with custom epoch

```typescript
// Import the Snowflake class
const { Snowflake } = require('@sapphire/snowflake');

// Define a custom epoch
const epoch = new Date('2000-01-01T00:00:00.000Z');

// Create an instance of Snowflake
const snowflake = new Snowflake(epoch);

// Deconstruct a snowflake with the given epoch
const uniqueId = snowflake.deconstruct('3971046231244935168');
```

#### Snowflake with Discord epoch constant

```typescript
// Import the Snowflake class
const { DiscordSnowflake } = require('@sapphire/snowflake');

// Deconstruct a snowflake with Discord's epoch
const uniqueId = DiscordSnowflake.deconstruct('3971046231244935168');

// Alternatively, you can use the method directly
const uniqueId = DiscordSnowflake.deconstruct('3971046231244935168');
```

#### Snowflake with Twitter epoch constant

```typescript
// Import the Snowflake class
const { TwitterSnowflake } = require('@sapphire/snowflake');

// Deconstruct a snowflake with Twitter's epoch
const uniqueId = TwitterSnowflake.deconstruct('3971046231244935168');

// Alternatively, you can use the method directly
const uniqueId = TwitterSnowflake.deconstruct('3971046231244935168');
```

---

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, PayPal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/sapphiredev/utilities/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sapphiredev/utilities" />
</a>

[contributing]: https://github.com/sapphiredev/.github/blob/main/.github/CONTRIBUTING.md
