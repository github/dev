# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [6.0.3](https://github.com/tannerntannern/ts-mixer/compare/v6.0.2...v6.0.3) (2023-02-09)


### Bug Fixes

* allow abstract constructor signature for hasMixin ([f82e27b](https://github.com/tannerntannern/ts-mixer/commit/f82e27b96d142cfdec6446930a1db354167e88d2)), closes [tannerntannern/ts-mixer#56](https://github.com/tannerntannern/ts-mixer/issues/56)
* allow abstract constructor signatures for hasMixin ([8964b59](https://github.com/tannerntannern/ts-mixer/commit/8964b59e062854fde52424497930ca3e8bb98e87)), closes [#57](https://github.com/tannerntannern/ts-mixer/issues/57)
* simplify signature ([8a79197](https://github.com/tannerntannern/ts-mixer/commit/8a79197cc6bca5757d7c06560d7b26e73491b11f))

### [6.0.2](https://github.com/tannerntannern/ts-mixer/compare/v6.0.1...v6.0.2) (2022-11-10)


### Bug Fixes

* **decorators:** support class decorators that don't return anything ([7433cf3](https://github.com/tannerntannern/ts-mixer/commit/7433cf36a43bb18a1dd280aa629ac81ef532c74a))

### [6.0.1](https://github.com/tannerntannern/ts-mixer/compare/v6.0.0...v6.0.1) (2022-03-13)

### Bug Fixes

* fix bug in `directDecoratorSearch` ([51c50b8](https://github.com/tannerntannern/ts-mixer/commit/51c50b8c50a63e85b133bdd61eaad4427a22e515)) (thanks, [@AMcBain](https://github.com/AMcBain)!)

## [6.0.0](https://github.com/tannerntannern/ts-mixer/compare/v6.0.0-beta.0...v6.0.0) (2021-07-07)

## [6.0.0-beta.0](https://github.com/tannerntannern/ts-mixer/compare/v5.4.1...v6.0.0-beta.0) (2021-06-24)


### ⚠ BREAKING CHANGES

* drop TS < 4.2 support

### Features

* add abstract mixin support ([1c4b306](https://github.com/tannerntannern/ts-mixer/commit/1c4b306bae62fa6319c74d1f3040c8aba0da2c28))

### [5.4.1](https://github.com/tannerntannern/ts-mixer/compare/v5.4.0...v5.4.1) (2021-04-30)


### Bug Fixes

* "publish" workflow ([bd2e4ec](https://github.com/tannerntannern/ts-mixer/commit/bd2e4ec088b19a403bc013926c7f3a2545cc4171))
* circular dependency ([66f7e2d](https://github.com/tannerntannern/ts-mixer/commit/66f7e2dc929c90e8c15d718415114ceaa31402c2))

## [5.4.0](https://github.com/tannerntannern/ts-mixer/compare/v5.3.0...v5.4.0) (2020-11-18)


### Features

* deep decorator inheritance ([6daabc5](https://github.com/tannerntannern/ts-mixer/commit/6daabc5d340d20c8eda4fe96b635a54f6a7e18fb))

## [5.3.0](https://github.com/tannerntannern/ts-mixer/compare/v5.3.0-beta.0...v5.3.0) (2020-06-01)

## [5.3.0-beta.0](https://github.com/tannerntannern/ts-mixer/compare/v5.2.1...v5.3.0-beta.0) (2020-05-31)


### Features

* add hasMixin function ([#27](https://github.com/tannerntannern/ts-mixer/issues/27)) ([c8bfc2d](https://github.com/tannerntannern/ts-mixer/commit/c8bfc2d48854808755088332636e8d166007ed9f))

### [5.2.1](https://github.com/tannerntannern/ts-mixer/compare/v5.2.0...v5.2.1) (2020-05-08)


### Bug Fixes

* mix decorator not preserving constructor name ([7274fa2](https://github.com/tannerntannern/ts-mixer/commit/7274fa26a68e05cc59cde1108610e6a1ab51b430))

## [5.2.0](https://github.com/tannerntannern/ts-mixer/compare/v5.2.0-beta.1...v5.2.0) (2020-04-29)

## [5.2.0-beta.1](https://github.com/tannerntannern/ts-mixer/compare/v5.2.0-beta.0...v5.2.0-beta.1) (2020-04-23)


### Bug Fixes

* wrong this in init functions for Mixin(A, Mixin(B, C)) scenario ([0ba1128](https://github.com/tannerntannern/ts-mixer/commit/0ba11283c63a878271b85c282f75190758101e63))

## [5.2.0-beta.0](https://github.com/tannerntannern/ts-mixer/compare/v5.1.0...v5.2.0-beta.0) (2020-04-13)


### Features

* adds init func feature for impure constructors ([99a946b](https://github.com/tannerntannern/ts-mixer/commit/99a946b8e272773f6bafd7a7e8bf8313517dec16))

## [5.1.0](https://github.com/tannerntannern/ts-mixer/compare/v5.1.0-beta.0...v5.1.0) (2020-03-27)

## [5.1.0-beta.0](https://github.com/tannerntannern/ts-mixer/compare/v5.0.0...v5.1.0-beta.0) (2020-03-26)


### Features

* decorator support for class-validators, typeORM, etc ([2c14812](https://github.com/tannerntannern/ts-mixer/commit/2c1481237b325916ca95dbb9e33141b3220f8068))

## [5.0.0](https://github.com/tannerntannern/ts-mixer/compare/v5.0.0-beta.0...v5.0.0) (2020-03-01)

## [5.0.0-beta.0](https://github.com/tannerntannern/ts-mixer/compare/v4.0.0...v5.0.0-beta.0) (2020-02-02)


### Features

* adds and tests a nearestCommonAncestor function ([b084579](https://github.com/tannerntannern/ts-mixer/commit/b084579d5ac52e0b456be95ff6b776309b436473))
* initial static inheritance implementation ([8467c40](https://github.com/tannerntannern/ts-mixer/commit/8467c40c9748e769eebf77b45cccad5ce785bac9))
* initial version of proxyMix ([95a91c7](https://github.com/tannerntannern/ts-mixer/commit/95a91c78e5f05af75cfc95d82a65ce5b3413b9f1))
* makes mixin constructor argument inference slightly smarter ([b844b5c](https://github.com/tannerntannern/ts-mixer/commit/b844b5c93f5eab0d6f522559ed567f67291fae76))


### Bug Fixes

* mixins with shared ancestor when using proxy prototype ([5af189d](https://github.com/tannerntannern/ts-mixer/commit/5af189d9903083f675f65b5039875c4aa97be1a6))
* resolves indefinite tuple issue with `Longest` type ([68342b0](https://github.com/tannerntannern/ts-mixer/commit/68342b0a3fe224a485f220039af872050aa941fc))
* static chain inheritance ([0aca8f0](https://github.com/tannerntannern/ts-mixer/commit/0aca8f056a005ccf27cc564d5a84abe1ef999d7b))
