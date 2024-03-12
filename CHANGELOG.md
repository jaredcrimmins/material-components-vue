# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.7.11](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.10...v0.7.11) (2024-03-12)


### Bug Fixes

* **menu-surface:** add `notifyClosing` adapter method ([f4e4d54](https://github.com/jaredcrimmins/material-components-vue/commit/f4e4d54a44ecbef20247f9dae51002b36bcfded4))
* **menu-surface:** set style using a Vue mechanism ([882b1bf](https://github.com/jaredcrimmins/material-components-vue/commit/882b1bfc3adb2eaf240f672b575e745481ef3364))
* **select:** add/remove CSS classes from root el using `classList` ([f55d724](https://github.com/jaredcrimmins/material-components-vue/commit/f55d7246fb91ba9bb8d3e31b1ac679a6a3909009))
* **select:** listen for `MDCMenuSurface:closing` event on anchor ([95de400](https://github.com/jaredcrimmins/material-components-vue/commit/95de40048269ad89eb1fe3a33331234e626e058c))

## [0.7.10](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.9...v0.7.10) (2024-03-08)


### Bug Fixes

* **multiple:** remove attrs with nullish values from linkable components ([6ffaafb](https://github.com/jaredcrimmins/material-components-vue/commit/6ffaafbb0b6fd6b537a92881af2afd58912bba11))

## [0.7.9](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.8...v0.7.9) (2024-03-07)


### Features

* **fab:** create `MdcFab` component ([bd92d51](https://github.com/jaredcrimmins/material-components-vue/commit/bd92d5172bc715fdedc11444c519b29eb385055d))
* **top-app-bar:** create `MdcTopAppBar` components ([e5876cc](https://github.com/jaredcrimmins/material-components-vue/commit/e5876cc41030195a11ed8b8078e31522f3205abe))


### Bug Fixes

* **drawer:** modify init and deinit process ([2876082](https://github.com/jaredcrimmins/material-components-vue/commit/2876082e5717ee202ff3ce5d8d7a215ece2afaa5)), closes [#6](https://github.com/jaredcrimmins/material-components-vue/issues/6)
* **icon-button:** emit `click` event ([38ec267](https://github.com/jaredcrimmins/material-components-vue/commit/38ec2679fc3fb768a6142b99ece19d44091dfb90))
* **layout-grid:** properly check if `align` prop value equals `'bottom'` ([32eb2ae](https://github.com/jaredcrimmins/material-components-vue/commit/32eb2ae8686093dd104522d7f3d283169248a06c))

## [0.7.8](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.7...v0.7.8) (2024-02-16)


### Bug Fixes

* **buttonable:** correct misspelling of the property `default` ([6b8028f](https://github.com/jaredcrimmins/material-components-vue/commit/6b8028f300f72713451fa175ace27054ad5cc144))

## [0.7.7](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.6...v0.7.7) (2024-02-15)


### Features

* define `types` field in `package.json` ([b46fa34](https://github.com/jaredcrimmins/material-components-vue/commit/b46fa3454af93100cc848f31461f1b50488d0880))
* **drawer:** create `MdcDrawer` and child components ([99db106](https://github.com/jaredcrimmins/material-components-vue/commit/99db10640305e423ea5e86370378c995fa5581bc)), closes [#6](https://github.com/jaredcrimmins/material-components-vue/issues/6)
* **list:** add `tag` prop to `MdcList` component ([a1ba20f](https://github.com/jaredcrimmins/material-components-vue/commit/a1ba20fb8904470aef3ea60a9ec30454b2cdfb8c))
* **list:** create `MdcListGroupSubheader` component ([4d0f5c8](https://github.com/jaredcrimmins/material-components-vue/commit/4d0f5c893dcbc53b9789a4975ec214caf35fb37c))
* **list:** make the `MdcListItem` component linkable ([895fa37](https://github.com/jaredcrimmins/material-components-vue/commit/895fa3714c1400121a6fe37027e2678f6eb1ef4e))


### Bug Fixes

* **multiple:** adjust priority of the `linkable` mixin ([eb6deb1](https://github.com/jaredcrimmins/material-components-vue/commit/eb6deb157a79bbc6872b3679778a5a2a41a649cb))
* **segmented-button:** fix circular dependency ([c42b97b](https://github.com/jaredcrimmins/material-components-vue/commit/c42b97b39ca1b89fed2ef15b7df8874d7daae640))
* **textfield:** modify when `mdc-textfield--no-label` class is active ([51401c9](https://github.com/jaredcrimmins/material-components-vue/commit/51401c9bb61bc16d6b3e9bc37de4dec3eb4f9615))

## [0.7.6](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.5...v0.7.6) (2024-02-07)


### Features

* **chips:** create `MdcChip` components ([c6faa1d](https://github.com/jaredcrimmins/material-components-vue/commit/c6faa1d76ec7efe715241f1eea166402bda2ddb3)), closes [#4](https://github.com/jaredcrimmins/material-components-vue/issues/4)
* **layout-grid:** create `MdcLayoutGrid` component ([71ff765](https://github.com/jaredcrimmins/material-components-vue/commit/71ff765ac593dea6207c49ccc93796ba95fd42ed)), closes [#7](https://github.com/jaredcrimmins/material-components-vue/issues/7)
* **segmented-button:** create `MdcSegmentedButton` component ([c219a6c](https://github.com/jaredcrimmins/material-components-vue/commit/c219a6c473270ec6b96313f2792b5ccb9895965e)), closes [#8](https://github.com/jaredcrimmins/material-components-vue/issues/8)


### Bug Fixes

* **tabs:** change active tab when the `MdcTabBar` `value` prop changes ([1865cb3](https://github.com/jaredcrimmins/material-components-vue/commit/1865cb365013edc801d129d16179099e3b82f30c))
* **tabs:** correctly implement the `MdcRipple` component into `MdcTab` ([12973e0](https://github.com/jaredcrimmins/material-components-vue/commit/12973e04eac496e830712aea9fa07f9ba9dff95f))
* **tabs:** render the `MdcTab` ripple element as a `&lt;span&gt;` ([099a63d](https://github.com/jaredcrimmins/material-components-vue/commit/099a63d7a36d3fe31aec9a7e39b820e6193ab2b4))

## [0.7.5](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.4...v0.7.5) (2024-01-07)


### Features

* **multiple:** implement `MdcTouchTargetWrapper` functionality ([5b7be95](https://github.com/jaredcrimmins/material-components-vue/commit/5b7be95eb779b9e6e4b8a24260d4518c5dade41c)), closes [#11](https://github.com/jaredcrimmins/material-components-vue/issues/11)
* **touch-target:** create `MdcTouchTargetWrapper` component ([4727dba](https://github.com/jaredcrimmins/material-components-vue/commit/4727dbafed786793dcbe19d9e29ffde2838bbf41)), closes [#11](https://github.com/jaredcrimmins/material-components-vue/issues/11)

## [0.7.4](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.3...v0.7.4) (2024-01-05)


### Features

* **slider:** create `MdcSlider` component ([16d1940](https://github.com/jaredcrimmins/material-components-vue/commit/16d1940da7ff700cf994b034d762cf750970c5bb)), closes [#9](https://github.com/jaredcrimmins/material-components-vue/issues/9)


### Bug Fixes

* **slider:** disable `inheritAttrs` and forward attrs to native input ([0841a49](https://github.com/jaredcrimmins/material-components-vue/commit/0841a49fbf682451341f1a88d18bc9f44ccc8a7a))
* **slider:** invoke the `deinit` method in the `beforeDestroy` hook ([13af4f6](https://github.com/jaredcrimmins/material-components-vue/commit/13af4f6e8893c28b9e68c3bff6d546e4603de6ef))

## [0.7.3](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.2...v0.7.3) (2023-12-19)


### Bug Fixes

* **tabs:** fix issue that prevented classes from being prg'ly removed ([32d6ac4](https://github.com/jaredcrimmins/material-components-vue/commit/32d6ac461b7e493b17100ebe1d2438984290d225))
* **tabs:** modify `MdcTab` `removeClass` method to actually remove class ([37a1fd0](https://github.com/jaredcrimmins/material-components-vue/commit/37a1fd0c34ba8cd664e204efd72ebee97a26e1f6))

## [0.7.2](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.1...v0.7.2) (2023-12-19)


### Bug Fixes

* **menu-surface:** set `this.open` using `this.value` at `mounted` ([98fd1d5](https://github.com/jaredcrimmins/material-components-vue/commit/98fd1d50bd41827485c6fed043794ba881046a39))
* **menu:** set `this.open` using `this.value` at `mounted` ([7582b1d](https://github.com/jaredcrimmins/material-components-vue/commit/7582b1d79a0e4daecf820b48b55f872f3585f23d))
* **snackbar:** sync the `open` data prop with `value` on mount ([fbfa738](https://github.com/jaredcrimmins/material-components-vue/commit/fbfa738e1fe0ca00a7443f1912a1f1ac6809119f))

## [0.7.1](https://github.com/jaredcrimmins/material-components-vue/compare/v0.7.0...v0.7.1) (2023-12-11)


### Bug Fixes

* **dialog:** add/remove CSS classes using Vue mechanism and `classList` ([57828ea](https://github.com/jaredcrimmins/material-components-vue/commit/57828eaa070679c6537a400306b0ed3fbb91f742))

## [0.7.0](https://github.com/jaredcrimmins/material-components-vue/compare/v0.6.0...v0.7.0) (2023-08-26)


### ⚠ BREAKING CHANGES

* **switch:** disable `inheritAttrs` and forward attrs to native input

### Features

* **switch:** rewrite `MdcSwitch` component using the advanced approach ([b3b471a](https://github.com/jaredcrimmins/material-components-vue/commit/b3b471a6c891b8cbd3ed2f6d38f196dacd84b7ed))


### Bug Fixes

* **switch:** disable `inheritAttrs` and forward attrs to native input ([6686a9c](https://github.com/jaredcrimmins/material-components-vue/commit/6686a9c44d1a5f90969afff703d94370746ab12f))

## [0.6.0](https://github.com/jaredcrimmins/material-components-vue/compare/v0.5.0...v0.6.0) (2023-08-26)


### ⚠ BREAKING CHANGES

* **banner:** convert the `graphic` slot to a scoped slot
* **button:** convert `append` and `trailing` slots to scoped slots
* **icon-button:** add `iconVariant` `icon` and `on-icon` scoped slot prop.
* **list:** remove functionless `preselected` `MdcListItem` prop
* **icon-button:** rename `tagName` prop to `tag`
* rename `MaterialComponentsVuejs` to `MaterialComponentsVue`
* **notched-outline:** rename `labelID` prop to use camel case

### Features

* **banner:** add `centered` prop ([8039c24](https://github.com/jaredcrimmins/material-components-vue/commit/8039c24a2c3969fa5851aae3c7c1837ae74b4b99))
* **banner:** create `MdcBanner` component ([98a5bac](https://github.com/jaredcrimmins/material-components-vue/commit/98a5bac91f8528a690816414d6d5d9be4b243331))
* **card:** create `MdcCard` component ([62c2f46](https://github.com/jaredcrimmins/material-components-vue/commit/62c2f46fad75d1782db0adf5a164e309883c0423))
* **icon-button:** add `iconVariant` prop ([70ae248](https://github.com/jaredcrimmins/material-components-vue/commit/70ae24802a8dce64fa96e65cabe378ec9bdb6fd1))
* **icon-button:** add `to` prop to allow the component to be linkable ([81d2911](https://github.com/jaredcrimmins/material-components-vue/commit/81d2911aa51d9af989b7df0754fd4466514f4ba0))
* **material-icon:** add `iconVariant` prop ([dd2cea6](https://github.com/jaredcrimmins/material-components-vue/commit/dd2cea613a9a2407c0b19594ea8debe8493e1e7b))
* **material-icon:** add `root` scoped slot ([8eabd70](https://github.com/jaredcrimmins/material-components-vue/commit/8eabd70d5cf29b1ecf199c1a4f949df068861fed))


### Bug Fixes

* **banner:** convert the `graphic` slot to a scoped slot ([3c61b51](https://github.com/jaredcrimmins/material-components-vue/commit/3c61b5187adbf30aa8ec4b98efc3f6aa42b3958b))
* **banner:** match open state with `value` prop on mount ([5f7cbe4](https://github.com/jaredcrimmins/material-components-vue/commit/5f7cbe4fa6ee99494dd4963e6b6a5350aadacf5c))
* **button:** convert `append` and `trailing` slots to scoped slots ([660f605](https://github.com/jaredcrimmins/material-components-vue/commit/660f6057d157df94da80ab417f76f6fc69a2ecaa))
* **checkbox:** add/remove classes using a Vue mechanism ([401e030](https://github.com/jaredcrimmins/material-components-vue/commit/401e0300bc79721e8aba76152dd8a8c9653b3d72))
* **circular-progress:** add/remove classes using a Vue mechanism ([a845531](https://github.com/jaredcrimmins/material-components-vue/commit/a8455312ed294fa952d6a7b7cb004d55890a8eb6))
* **dialog:** add/remove classes using a Vue mechanism ([f27182e](https://github.com/jaredcrimmins/material-components-vue/commit/f27182e66f10304c7adca5cb035395da5de2a4f9))
* export `MaterialComponentsVue` from package entry ([c60a138](https://github.com/jaredcrimmins/material-components-vue/commit/c60a13885a7e0f558894f0a29700940930114a21))
* **floating-label:** add/remove classes using a Vue mechanism ([a974af6](https://github.com/jaredcrimmins/material-components-vue/commit/a974af64e81b69181aa83b777c69338637b5dcc3))
* **floating-label:** set element `id` attribute using `id` prop ([1f79373](https://github.com/jaredcrimmins/material-components-vue/commit/1f7937305f018f19d390a28b3b526354c88c6c71))
* **line-ripple:** add/remove classes using a Vue mechanism ([f64850d](https://github.com/jaredcrimmins/material-components-vue/commit/f64850dfe30e572778dfca7979afb0c93cff4364))
* **linear-progress:** add missing adapter methods ([ae128a5](https://github.com/jaredcrimmins/material-components-vue/commit/ae128a5865b03160e130832b89e3e33f0120a965))
* **linear-progress:** add/remove classes using a Vue mechanism ([9bfc499](https://github.com/jaredcrimmins/material-components-vue/commit/9bfc499b2dc9fa2f64df7ab17764d31fd6f378ee))
* **linear-progress:** fix `setBufferBarStyle` and `setPrimaryBarStyle` ([7ccf1c3](https://github.com/jaredcrimmins/material-components-vue/commit/7ccf1c3f13eb430db01201262a725a6e64de13a8))
* **list:** appropriately set `tabindex` attr on all list items ([6b8a723](https://github.com/jaredcrimmins/material-components-vue/commit/6b8a7236853ed702bc3b935bd4918cf3f796ffcb))
* **list:** listen for `focusout` event, not `foucsOut` ([9fadb32](https://github.com/jaredcrimmins/material-components-vue/commit/9fadb32cc5676173cf8a0a969266ad3b19cbdeec))
* **list:** provide `tabindex` as `checkbox` and `radio` scoped slot prop ([ecbf76c](https://github.com/jaredcrimmins/material-components-vue/commit/ecbf76cd62ddf42bd2cee6020f35eeb88af333a1))
* **list:** remove functionless `preselected` `MdcListItem` prop ([78cdd72](https://github.com/jaredcrimmins/material-components-vue/commit/78cdd72e29e9c03b9d26d7e865f737b3af13d85b))
* **list:** use `MdcRipple` `tag` prop, instead of `tagName` ([45044e6](https://github.com/jaredcrimmins/material-components-vue/commit/45044e6bb59cd957bc35bba74a5109393c53afc6))
* **material-icon:** set `name` property to `'mdc-material-icon'` ([98225fb](https://github.com/jaredcrimmins/material-components-vue/commit/98225fb2c120724ee5b7f5776ca6deacf64ca312))
* **menu-surface:** add/remove classes using a Vue mechanism ([4797783](https://github.com/jaredcrimmins/material-components-vue/commit/47977833388201eb81a810d8a74c9ba238d4aebd))
* **notched-outline:** add/remove classes using a Vue mechanism ([aaecba3](https://github.com/jaredcrimmins/material-components-vue/commit/aaecba332f50f69ca8df8f5801b14dbafc27919e))
* **radio:** add/remove classes using a Vue mechanism ([8aca42a](https://github.com/jaredcrimmins/material-components-vue/commit/8aca42a7644a83dbdea3a77d9bfe5d718cd68f31))
* **select:** add/remove classes using a Vue mechanism ([145bf9a](https://github.com/jaredcrimmins/material-components-vue/commit/145bf9a392ba50fa92918114fc59c94dcfb3531b))
* **snackbar:** add/remove classes using a Vue mechanism ([518f53b](https://github.com/jaredcrimmins/material-components-vue/commit/518f53b103861b0d18e087fd90eaadf7de012c0c))
* **tabs:** add/remove classes using a Vue mechanism ([84b513e](https://github.com/jaredcrimmins/material-components-vue/commit/84b513ef94294408fbff7f2989cbcda0c05f0873))
* **textfield:** add/remove classes from root el using a Vue mechanism ([45d484b](https://github.com/jaredcrimmins/material-components-vue/commit/45d484b2f3b9ba548c006fbdc052ba46292989cd))
* **textfield:** add/remove classes using a Vue mechanism ([cd48746](https://github.com/jaredcrimmins/material-components-vue/commit/cd48746e672d3ae00c0517c92b2992ad7e0b56e9))
* **textfield:** automatically generate unique label and helper text IDs ([eadf61b](https://github.com/jaredcrimmins/material-components-vue/commit/eadf61b091f286a78f86cfcb57601d6fabcb6c66))
* **textfield:** modify `hasClass` method to use the `classList` property ([9d48198](https://github.com/jaredcrimmins/material-components-vue/commit/9d48198866c9595b22e625dcdc9676a35cd45152))
* **textfield:** modify how classes are added/removed ([9ffc55e](https://github.com/jaredcrimmins/material-components-vue/commit/9ffc55e9d968734b3de2fe4c496bae2e40d19887))
* **textfield:** set HTML attribute props default values to `null` ([bb49754](https://github.com/jaredcrimmins/material-components-vue/commit/bb497543abf79188207df0156d5ccaa96d36fc14))


### Code Refactoring

* **icon-button:** rename `tagName` prop to `tag` ([f1b1358](https://github.com/jaredcrimmins/material-components-vue/commit/f1b1358a3030fc5321a692f595ff494ed31c2b20))
* **notched-outline:** rename `labelID` prop to use camel case ([4f5072c](https://github.com/jaredcrimmins/material-components-vue/commit/4f5072c846b66602073f70ac557490963e534528))
* rename `MaterialComponentsVuejs` to `MaterialComponentsVue` ([2ab20e8](https://github.com/jaredcrimmins/material-components-vue/commit/2ab20e8f57a3da3445c5d0021aa91c8f1e0a8075))

## [0.5.0](https://github.com/jaredcrimmins/material-components-vue/compare/v0.4.2...v0.5.0) (2022-12-02)


### ⚠ BREAKING CHANGES

* rename package to `@jaredcrimmins/material-components-vue`
* **ripple:** rename `tagName` prop to `tag`
* **button:** The `tag` prop must be provided if a root element with
a tag name of anything besides `button` is desired.

### Features

* **button:** implement `linkable` mixin ([66c7253](https://github.com/jaredcrimmins/material-components-vue/commit/66c72535328c225bb4ecbc039483653648855393))
* **tooltip:** create `MDCTooltip` component ([1343216](https://github.com/jaredcrimmins/material-components-vue/commit/134321649e59ac73b00c4ee9557f35df1d85fc04))


### Bug Fixes

* **list:** add/remove classes from list items using a Vue mechanism ([c749faf](https://github.com/jaredcrimmins/material-components-vue/commit/c749faf3952bb52d5dfcdf6f2e7b905bfc0dbf15))
* **list:** annotate `provide` method return type ([5479d2b](https://github.com/jaredcrimmins/material-components-vue/commit/5479d2bd5ecdaa20d000833812328097084796a6))
* **multiple:** annotate prop validator parameter value types ([b94c357](https://github.com/jaredcrimmins/material-components-vue/commit/b94c357f06ebfa60fbf70e63b736028dd179cea9))


### Code Refactoring

* **linkable:** create `linkable` mixin ([6af8728](https://github.com/jaredcrimmins/material-components-vue/commit/6af87280a21dbc363719f0c5bd5f5c10476fc250))
* **ripple:** consolidate `@/utils` imports ([4d0e28d](https://github.com/jaredcrimmins/material-components-vue/commit/4d0e28de2cfb91ed577b65d3e39b8421f59f5746))
* **ripple:** don't return primitive prop defaults from factories ([97b36aa](https://github.com/jaredcrimmins/material-components-vue/commit/97b36aa1372f5a9dd67600c95d07a5dd02af4d73))
* **ripple:** rename `tagName` prop to `tag` ([d965645](https://github.com/jaredcrimmins/material-components-vue/commit/d965645d8f43f3c9c63debfae722f6990ec431ef))
* **ripple:** use `window.scrollX` and `window.scrollY` ([7ec613a](https://github.com/jaredcrimmins/material-components-vue/commit/7ec613ac86b79f6235328563931338e45d93f179))


* rename package to `@jaredcrimmins/material-components-vue` ([15d8d09](https://github.com/jaredcrimmins/material-components-vue/commit/15d8d097e69e62e7009101e78cabfda22b751d78))


### Build

* rename Rollup output files to reflect new package name ([eafaf19](https://github.com/jaredcrimmins/material-components-vue/commit/eafaf19ac7982d228a739075621ffdfa61192d21))

### [0.4.2](https://github.com/jaredcrimmins/material-components-vuejs/compare/v0.4.1...v0.4.2) (2022-09-09)


### Features

* **checkbox:** implement `MDCRipple` ([50ef950](https://github.com/jaredcrimmins/material-components-vuejs/commit/50ef950f005f3a77f2a3a9f865ca891f7e94e6dc))
* **form-field:** create `MDCFormField` component ([23a31d1](https://github.com/jaredcrimmins/material-components-vuejs/commit/23a31d1ef286235b33374bec2ed40fa89309fb18))
* **radio:** implement `MDCRipple` ([fcced16](https://github.com/jaredcrimmins/material-components-vuejs/commit/fcced16c910fcf2b58baffce5babc4b353598f3e))


### Bug Fixes

* **icon-button:** fix toggle functionality ([7a5f14e](https://github.com/jaredcrimmins/material-components-vuejs/commit/7a5f14ec245adf6c5dec103c4ceeaaffa1911c3b))

### [0.4.1](https://github.com/jaredcrimmins/material-components-vuejs/compare/v0.4.0...v0.4.1) (2022-09-08)


### Bug Fixes

* **dialog:** pass `outlined`, `raised`, and `unelevated` props ([1c7f08b](https://github.com/jaredcrimmins/material-components-vuejs/commit/1c7f08b0a56c07d518fc41d14bf4b5bc9b45fba9))
* **ripple:** modify the class list using the `cssClass` data property ([49f75df](https://github.com/jaredcrimmins/material-components-vuejs/commit/49f75df693c4307224fd987fa121ba1e3a648cc0))
* **ripple:** set root element CSS classes using `cssClass` data property ([3f437d1](https://github.com/jaredcrimmins/material-components-vuejs/commit/3f437d11e7d9fb77f8d4502cae0e60a2eeb1fabe))
* **text-field:** remove unused `inputElementID` prop ([efe7e62](https://github.com/jaredcrimmins/material-components-vuejs/commit/efe7e62acbe7ad7bf01201c5a3fc756de0ac6c3b))


### Code Refactoring

* **ripple:** set style properties using the `style` property ([14e2e17](https://github.com/jaredcrimmins/material-components-vuejs/commit/14e2e1799b97df23dab4a2a9132a18d4a14e8114))

## [0.4.0](https://github.com/jaredcrimmins/material-components-vuejs/compare/v0.3.2...v0.4.0) (2022-02-24)


### ⚠ BREAKING CHANGES

* remove `version` static property from plugin class
* use named exports
* **linear-progress:** remove reverse functionality
* **ripple:** rename scoped slot "default" to "root"
* **radio:** compute the `id` attr from a prop and a fallback value
* **checkbox:** compute the `id` attr from a prop and a fallback

### Features

* **checkbox:** add automatically generated `id` attribute ([4f1afe9](https://github.com/jaredcrimmins/material-components-vuejs/commit/4f1afe93038f277d0e9d41dce770b90947a12654))
* **checkbox:** emit Vue `change` and `input` events ([7e23a88](https://github.com/jaredcrimmins/material-components-vuejs/commit/7e23a8886379af4bc4c241f534ffefbff9ba1f43))
* **checkbox:** native control element inherit attrs ([689d62e](https://github.com/jaredcrimmins/material-components-vuejs/commit/689d62e46505d3f47616d42ad29d2c14aa6de1f0))
* **list:** implement automatic native input element ID ([8ac36c6](https://github.com/jaredcrimmins/material-components-vuejs/commit/8ac36c62a9af456394259854ade71f92c21b42c0))
* **notched-outline:** make `getLabelWidth` a public method ([4538d2e](https://github.com/jaredcrimmins/material-components-vuejs/commit/4538d2e3025232a5c1dd7d532a69afd5b204bd1c))


### Bug Fixes

* **button:** annoate render function return type ([86b79a7](https://github.com/jaredcrimmins/material-components-vuejs/commit/86b79a7597e6411238a36a919b41a0353b90f273))
* **button:** use style data from mdc-ripple "root" scoped slot ([443e367](https://github.com/jaredcrimmins/material-components-vuejs/commit/443e367b49b31fdaff5987eab663de0492b17cb2))
* **checkbox:** fix `checked` prop mutation ([664d55d](https://github.com/jaredcrimmins/material-components-vuejs/commit/664d55dfe1dfe91bcdd79149475a249e9f31bb8e))
* **checkbox:** fix `isChecked` adapter method ([6590cc9](https://github.com/jaredcrimmins/material-components-vuejs/commit/6590cc91c9c8e8f536812a926c448aebc1fb5dca))
* **checkbox:** fix `isIndeterminate` method ([46c2fc4](https://github.com/jaredcrimmins/material-components-vuejs/commit/46c2fc4faaf2c43586a16d712c1a1a2a2193a4c5))
* **checkbox:** fix `setChecked` method ([907733e](https://github.com/jaredcrimmins/material-components-vuejs/commit/907733e657b5d1f7419262e355c5f424b7ed0b70))
* **checkbox:** fix disabled functionality ([e93d332](https://github.com/jaredcrimmins/material-components-vuejs/commit/e93d332b3babe2fefed8db840d4ceb3003d61479))
* **checkbox:** indeterminate native control element attribute is now set ([4232106](https://github.com/jaredcrimmins/material-components-vuejs/commit/42321061928f695eb2f5b08765ed1dbf0537957b))
* **checkbox:** modify `value` prop def to accept numbers and strings ([8d19c48](https://github.com/jaredcrimmins/material-components-vuejs/commit/8d19c48d28e48ae47b0e404b258d930a8efbd453))
* **checkbox:** no longer emit `change` event on `checked` mutation ([21e754f](https://github.com/jaredcrimmins/material-components-vuejs/commit/21e754f4c8924e02a6cc83a023a8dfb9478ba651))
* **checkbox:** remove value prop type definition ([33bd47f](https://github.com/jaredcrimmins/material-components-vuejs/commit/33bd47f3da6e4bdcd58afabf1c0d13d21bf67462))
* **circular-progress:** fix computation of size-based attributes ([edbc67b](https://github.com/jaredcrimmins/material-components-vuejs/commit/edbc67b30f8101aaa7e1c196544f332e2fcd5648))
* **dialog:** modify `hasClass adapter method to return a boolean ([6c0a8ac](https://github.com/jaredcrimmins/material-components-vuejs/commit/6c0a8acccaa255e9d13afcf0cd56f69e9b3f8223))
* **dialog:** modify MDCDialog subcomponents to always return a VNode ([9ff44f2](https://github.com/jaredcrimmins/material-components-vuejs/commit/9ff44f23bef4305a62a1f4c415d4f9a31939896d))
* **floating-label:** fix misspelling of `beforeDestroy` hook ([1efe573](https://github.com/jaredcrimmins/material-components-vuejs/commit/1efe573bfa2bf10ba2fbb8d0212cfdf8f044f1f9))
* **icon-button:** use style data from mdc-ripple "root" scoped slot ([19d032b](https://github.com/jaredcrimmins/material-components-vuejs/commit/19d032b1f633a8c9063708d1b6c3a8a521cd5030))
* **line-ripple:** initialize `mdcFoundation` with a default adapter ([ae56bd4](https://github.com/jaredcrimmins/material-components-vuejs/commit/ae56bd4bf77cc2b7ec51788374e8f73d29430139))
* **line-ripple:** set ripple center at mount ([2474fe5](https://github.com/jaredcrimmins/material-components-vuejs/commit/2474fe5273dab477932412d64a3efbacbfc35361))
* **linear-progress:** remove reverse functionality ([85940a8](https://github.com/jaredcrimmins/material-components-vuejs/commit/85940a836959da7447cc5fa6d569b1e507dd5087))
* **list:** annotate `isCheckboxList` and `isRadioList` return types ([ab9a823](https://github.com/jaredcrimmins/material-components-vuejs/commit/ab9a823039b29d0c8cb790fa1d5cb61f03f8b199))
* **list:** ensure `getPrimaryTextAtIndex` always returns a string ([f9fa913](https://github.com/jaredcrimmins/material-components-vuejs/commit/f9fa913de960ab0288b8f52641404721de526bd1))
* **list:** fix `setTabIndexForListItemChildren` typing ([6c826dc](https://github.com/jaredcrimmins/material-components-vuejs/commit/6c826dc931490de531ee9e64ff0cb182360cbf5b))
* **list:** fix adapter method typings ([2b0489b](https://github.com/jaredcrimmins/material-components-vuejs/commit/2b0489b189809c6ec28c5640f9cd857e22d7b39e))
* **list:** fix circular dependencies ([498323e](https://github.com/jaredcrimmins/material-components-vuejs/commit/498323e558491c95f3fc1d1a1d30daad0d856289))
* **list:** fix misspelling of `beforeDestroy` hook ([dc20ff7](https://github.com/jaredcrimmins/material-components-vuejs/commit/dc20ff76376b0893a2db0f7c55793e45ce69449d))
* **list:** fix typing of `focusItemAtIndex` adapter method ([15b7365](https://github.com/jaredcrimmins/material-components-vuejs/commit/15b73659641a1bf49f8bde7c159f21cba9d63fd1))
* **list:** fix typing of `getFocusedElementAtIndex` adapter method ([b53e990](https://github.com/jaredcrimmins/material-components-vuejs/commit/b53e990a97917533c067c68d375b6c87229fbf64))
* **list:** fix typing of `setTabIndexForListItemChildren` adapter method ([590c82c](https://github.com/jaredcrimmins/material-components-vuejs/commit/590c82c63b5235ac1b4a98cb27b8537d8fe9c6d1))
* **list:** fix typing of private method `onKeydown` ([2fa635e](https://github.com/jaredcrimmins/material-components-vuejs/commit/2fa635e1918710266a6bd3e9f9cebcdca081ae87))
* **list:** fix typings of `getListItemIndex` adapter method ([54bd58e](https://github.com/jaredcrimmins/material-components-vuejs/commit/54bd58e067f1d654d45e16c6ee60d759ff8ebf56))
* **list:** fix typings of data property `domObserver` ([3ab9506](https://github.com/jaredcrimmins/material-components-vuejs/commit/3ab950642f6aae71ddca68c04195c5e87d6551b3))
* **list:** fix typings of private methods `onFocusIn` and `onFocusOut` ([2221ad0](https://github.com/jaredcrimmins/material-components-vuejs/commit/2221ad0742969d8e19496c87c6ac86bf1b0bc446))
* **list:** remove `twoLine` watcher ([2da0198](https://github.com/jaredcrimmins/material-components-vuejs/commit/2da0198e337573c92d024a08dfe78c0cb88a4e57))
* **menu-surface:** fix bug in `getAnchorElement` private method ([424cc8c](https://github.com/jaredcrimmins/material-components-vuejs/commit/424cc8c8bc97446be743c81d090c175d44d2221f))
* **menu-surface:** fix misspelling of `beforeDestroy` hook ([ad6ca0d](https://github.com/jaredcrimmins/material-components-vuejs/commit/ad6ca0de68c29f08cd188d3ef7068aa7b112cb6a))
* **menu:** fix `MDCList` and `MDCMenuSurface` circular dependencies ([d231619](https://github.com/jaredcrimmins/material-components-vuejs/commit/d231619954c0d545ca4b8472a1133a23c07cf68c))
* **menu:** fix circular dependency in `mdc-menu-divider` ([ecfec4d](https://github.com/jaredcrimmins/material-components-vuejs/commit/ecfec4dad16dfc02878668747823d1c1ec89f669))
* **multiple:** import @material/* modules only by using its package name ([5926d40](https://github.com/jaredcrimmins/material-components-vuejs/commit/5926d40844c8b43ab0b8e30931f17ec3dec0a1b7))
* **multiple:** modify `anchorElement` prop type so it accepts `Element` ([8f3f79c](https://github.com/jaredcrimmins/material-components-vuejs/commit/8f3f79cc78685eb2cfb7e429c2d2b237b4b0a9b0))
* **multiple:** replace `anchorElement` prop type defs with validators ([abaf755](https://github.com/jaredcrimmins/material-components-vuejs/commit/abaf7559a531b9b03bcb2fad0a88a001f3f4e265))
* **select:** have `onMenuSelected` listen for menu selected events ([6944c7c](https://github.com/jaredcrimmins/material-components-vuejs/commit/6944c7cba13d515be6e5b852e7b14d1a793f50ef))
* **select:** modify `menuAnchorCorner` attribute typing ([0e21bb3](https://github.com/jaredcrimmins/material-components-vuejs/commit/0e21bb3138ab6f8f79ac46e2bb56d6a4b4c65050))
* **select:** modify `onClick` `MDCSelectFoundation.handleClick` call ([51ad4de](https://github.com/jaredcrimmins/material-components-vuejs/commit/51ad4de2a5056b939a371b3bad5e38863ec748c2))
* **select:** modify `onMenuSelected` private method ([a00f17b](https://github.com/jaredcrimmins/material-components-vuejs/commit/a00f17bbe013d0f7f718f71b823a7e95ffb82e96))
* **switch:** fix data attribtue typing error ([15bead2](https://github.com/jaredcrimmins/material-components-vuejs/commit/15bead23b90c28e731615453fa05927b0c0e21c4))
* **switch:** fix render bug ([82e6b75](https://github.com/jaredcrimmins/material-components-vuejs/commit/82e6b75783d9b728c15300ad7de83f1f589e5360))
* **tabs:** annotate `computeDimensions` return type ([b4628fd](https://github.com/jaredcrimmins/material-components-vuejs/commit/b4628fd3a71ef98322f317644a043f9b7dcb20e9))
* **tabs:** annotate parameter as `MDCTabInteractionEvent` ([3124cf7](https://github.com/jaredcrimmins/material-components-vuejs/commit/3124cf7b95684f8aeb9446078e8e61abd0f1f231))
* **tabs:** initialize `mdcFoundation` with `MDCTabBarFoundation` ([5fb19c6](https://github.com/jaredcrimmins/material-components-vuejs/commit/5fb19c662e8a0789b27ec7d85fcbb32b564ec5d0))
* **tabs:** modify `automaticActivation` watcher ([7e4ccfb](https://github.com/jaredcrimmins/material-components-vuejs/commit/7e4ccfb6ece1ae02644b6fe2ff9c37e13c86292f))
* **tabs:** modify `setActiveTab` adapter method ([935892e](https://github.com/jaredcrimmins/material-components-vuejs/commit/935892eaa3a08cc0d7944122aa32f5ddf88fd17c))
* **tabs:** modify foundation method `handleInteraction` call ([a05ae2c](https://github.com/jaredcrimmins/material-components-vuejs/commit/a05ae2c3d38603d9efa5875e45f2408328968a67))
* **tabs:** remove props arguments from tab indicator factory function ([240ef2a](https://github.com/jaredcrimmins/material-components-vuejs/commit/240ef2a74ac0070c38f6b93727fcfd37634029cf))
* **textfield:** add `mdcFoundation` data property ([9141ff5](https://github.com/jaredcrimmins/material-components-vuejs/commit/9141ff5af02f90bff7b66fc8c2885a03885e114f))
* **textfield:** add `mdcFoundation` data property ([5f0c66c](https://github.com/jaredcrimmins/material-components-vuejs/commit/5f0c66c3a470a5c4c713f30d739a8292482dc352))
* **textfield:** add adapter methods `setInputAttr` and `removeInputAttr` ([6166a23](https://github.com/jaredcrimmins/material-components-vuejs/commit/6166a23aba178daa5189477f6199cb9dcd1a2426))
* **textfield:** annotate event target as `HTMLInputElement` ([e86bd24](https://github.com/jaredcrimmins/material-components-vuejs/commit/e86bd24c6725b3a60b681b9f40b1d260c14fa2ea))
* **textfield:** ensure computed properties return booleans ([1a73713](https://github.com/jaredcrimmins/material-components-vuejs/commit/1a737139b7f356346755311b5d54e61899f7c1b9))
* **textfield:** modify `getLabelWidth` method ([c678219](https://github.com/jaredcrimmins/material-components-vuejs/commit/c67821922d3715bd9d334a383fd78ab608c08165))
* **textfield:** modify `handleTextFieldInteraction` call ([7d76b00](https://github.com/jaredcrimmins/material-components-vuejs/commit/7d76b00eb9fcccc4988a5f4d5d4966de21b416df))
* **textfield:** modify `hasLabel` adpater method ([e68fd4f](https://github.com/jaredcrimmins/material-components-vuejs/commit/e68fd4f15d94f73318ae6ad02e072b50fc28d010))
* **textfield:** modify how label width is computed ([fdd333d](https://github.com/jaredcrimmins/material-components-vuejs/commit/fdd333d7d9b1471f881c79afb0a37d1e0852fb82))
* **textfield:** remove misspelled property from argument ([3905e38](https://github.com/jaredcrimmins/material-components-vuejs/commit/3905e3826176fa151a5e17e601fffe938fd555a5))
* **textfield:** test if the component has a truthy `label` prop ([c65b73b](https://github.com/jaredcrimmins/material-components-vuejs/commit/c65b73b2d084902e3ab652c2c53f98c01b1db67b))
* **textfield:** use `content_` data property as text value ([3d3c4c0](https://github.com/jaredcrimmins/material-components-vuejs/commit/3d3c4c022cac3f1f71e1f136c52e1451d71c5cb0))
* **textfield:** wrap `VNode` factory in array ([4393742](https://github.com/jaredcrimmins/material-components-vuejs/commit/4393742d3dfc79db7ac0702c96b8c57d159b4fd6))


### Code Refactoring

* **absolutely-positionable:** improve `absolutePosition` typing ([b343533](https://github.com/jaredcrimmins/material-components-vuejs/commit/b343533210225ec545368ef49e7d8b5a641448fb))
* **absolutely-positionable:** modify `absolutePosition` prop def ([80c33a0](https://github.com/jaredcrimmins/material-components-vuejs/commit/80c33a05c15c8a1b620c14a93111af1e90dec28e))
* **absolutely-positionable:** rewrite in TypeScript ([631f57e](https://github.com/jaredcrimmins/material-components-vuejs/commit/631f57e7e631e7f942e75f16e1be25abf024a4a9))
* add slot utility functions ([cbf5934](https://github.com/jaredcrimmins/material-components-vuejs/commit/cbf5934f8d00f8338041016db0a826c7d86c972d))
* **button:** add default value to `to` prop ([44adf33](https://github.com/jaredcrimmins/material-components-vuejs/commit/44adf330d993dd68e42f0045c3c4dc12bb1334e4))
* **button:** rewrite index in TypeScript ([eab0826](https://github.com/jaredcrimmins/material-components-vuejs/commit/eab08266123f638c56a03ebe102173fa917502c5))
* **checkbox:** compute the `id` attr from a prop and a fallback ([e98d780](https://github.com/jaredcrimmins/material-components-vuejs/commit/e98d780cdee25ea0a8b7d5d4a8443f17f4d16373))
* **checkbox:** create dedicated event handler for `animationend` ([f83e500](https://github.com/jaredcrimmins/material-components-vuejs/commit/f83e50037485924fcd4095bdad1b946a6e73ff9d))
* **checkbox:** modify `id` and `value` prop definitions ([b4bdd25](https://github.com/jaredcrimmins/material-components-vuejs/commit/b4bdd25c6e1ef2035f5471a4f3ca5112fb39576c))
* **checkbox:** move watchers ([8db0f22](https://github.com/jaredcrimmins/material-components-vuejs/commit/8db0f2282abfeb5b00f4bab66364adcfee2b583a))
* **checkbox:** rearrange methods ([7b3798e](https://github.com/jaredcrimmins/material-components-vuejs/commit/7b3798e08a6290acbb54dcc6404060654aa50c21))
* **checkbox:** rewrite in TypeScript ([346b4f0](https://github.com/jaredcrimmins/material-components-vuejs/commit/346b4f0d0de0efb446d381fbebabd136329282b8))
* **circular-progress:** rewrite in TypeScript ([97dc35a](https://github.com/jaredcrimmins/material-components-vuejs/commit/97dc35af81ecfca80b5167c58813ec22a045f03d))
* create `domPropDefFactory` utility function ([9fbda2e](https://github.com/jaredcrimmins/material-components-vuejs/commit/9fbda2e35fe8f33f456fa242b712f6a8e1885df4))
* create `mixins` function and `ExtractVue` type in utilities ([6639cbc](https://github.com/jaredcrimmins/material-components-vuejs/commit/6639cbc86712f05a95fc5bee229d444c3a962e92))
* **dev:** convert icon-button debug component name to kebab case ([b6c02fa](https://github.com/jaredcrimmins/material-components-vuejs/commit/b6c02faf0e8673276abf4a19c29a3245e24625ca))
* **dialog:** add default value to MDCDialogButton `action` prop ([b577dac](https://github.com/jaredcrimmins/material-components-vuejs/commit/b577dac0dfe757b9a79b3d9db932dfae4ab416d6))
* **dialog:** remove the `title` prop ([38b9b85](https://github.com/jaredcrimmins/material-components-vuejs/commit/38b9b85196d839397cfbf6a641f3ee9c65d6bd24))
* **dialog:** rewrite in TypeScript ([2be7300](https://github.com/jaredcrimmins/material-components-vuejs/commit/2be73009825165a085aa1b2c4cea0b3eb4426543))
* **floating-label:** add default value to `id` prop ([4cbacbd](https://github.com/jaredcrimmins/material-components-vuejs/commit/4cbacbd7cf9e7852ec3890e59bc62740189d4c6f))
* **floating-label:** rewrite in TypeScript ([e6c3b52](https://github.com/jaredcrimmins/material-components-vuejs/commit/e6c3b52ddae35f70cf5f228a57ae5005c7cc47bd))
* **icon-button:** add default values to `icon` and `onIcon` props ([47e1daf](https://github.com/jaredcrimmins/material-components-vuejs/commit/47e1daf51199eb6e996e18d0565668d2a40edbaa))
* **icon-button:** replace scoped slot "default" with "root" ([abbf650](https://github.com/jaredcrimmins/material-components-vuejs/commit/abbf650034937d38892a8b089fdbabdfc5b08611))
* **icon-button:** rewrite in TypeScript ([56f0d08](https://github.com/jaredcrimmins/material-components-vuejs/commit/56f0d08413476d7464536152f93959f5897647ce))
* **image-list:** add default value to `label` prop ([2bc7c92](https://github.com/jaredcrimmins/material-components-vuejs/commit/2bc7c923846ec77af8915efeba13dd2491ab3731))
* **image-list:** rewrite in TypeScript ([bc41785](https://github.com/jaredcrimmins/material-components-vuejs/commit/bc41785b10cbc0e48dbcf2a8b74b300c2690041a))
* **line-ripple:** convert component name to kebab case ([c162611](https://github.com/jaredcrimmins/material-components-vuejs/commit/c162611ec266ebe0adac70cc075403b954a196d2))
* **line-ripple:** convert from .vue to .js file ([780cd59](https://github.com/jaredcrimmins/material-components-vuejs/commit/780cd59698b30fb0183ca6e338f89f1da88c1ea1))
* **line-ripple:** get value from arguments ([f124838](https://github.com/jaredcrimmins/material-components-vuejs/commit/f124838fe5c30dadb33e7e2c7e853d033d9a5bb1))
* **line-ripple:** moved watch block ([4af69e3](https://github.com/jaredcrimmins/material-components-vuejs/commit/4af69e3f27afbcbb6e4f97cf0d782cc15b0f3813))
* **line-ripple:** remove `"use-script"` statement ([558a46d](https://github.com/jaredcrimmins/material-components-vuejs/commit/558a46d8fb761a9e2fb88d6f65bd41ab1bae1bc0))
* **line-ripple:** remove `"use-strict"` statement ([0c87df3](https://github.com/jaredcrimmins/material-components-vuejs/commit/0c87df3b2a07507b4a38c41290b2fc3fb39b614b))
* **line-ripple:** rewrite in TypeScript ([0346f5b](https://github.com/jaredcrimmins/material-components-vuejs/commit/0346f5ba4baf92ded7485f0fe946e9421da52c93))
* **linear-progress:** rewrite in TypeScript ([9c70f58](https://github.com/jaredcrimmins/material-components-vuejs/commit/9c70f5877c4dfb628cccee9f709a414b76e0716a))
* **list:** create `setHasTypeahead` private method ([d521778](https://github.com/jaredcrimmins/material-components-vuejs/commit/d521778f365616ca86dfa94f4942822096044433))
* **list:** create `setSelectedIndex` private method ([5a25858](https://github.com/jaredcrimmins/material-components-vuejs/commit/5a25858a9d1b99617e99b051a68d90491081e8d2))
* **list:** create `setSingleSelection` private method ([f21fa0e](https://github.com/jaredcrimmins/material-components-vuejs/commit/f21fa0e839b666099f3006e1c8432d816dc2dc6a))
* **list:** create `setVerticalOrientation` private method ([6de08d7](https://github.com/jaredcrimmins/material-components-vuejs/commit/6de08d74c83b92456da1e6fd1c689a75f906cfd5))
* **list:** create `setWrapFocus` private method ([dc728fe](https://github.com/jaredcrimmins/material-components-vuejs/commit/dc728fe5fbfa836d426917713acee681e5887595))
* **list:** declare unmodified variables as constants ([c0f2944](https://github.com/jaredcrimmins/material-components-vuejs/commit/c0f2944146c0911ce836fb0fe39ddca1d3b0cd75))
* **list:** modify `selectedIndex` prop ([1dcefda](https://github.com/jaredcrimmins/material-components-vuejs/commit/1dcefdaed33a7a90131aaee26a6633e032c90e31))
* **list:** optimize references to slots ([80d6db8](https://github.com/jaredcrimmins/material-components-vuejs/commit/80d6db8d2ede68fe312db73c7db6a5a0f4996ba4))
* **menu-surface:** convert file from .vue to .ts ([8a751d3](https://github.com/jaredcrimmins/material-components-vuejs/commit/8a751d3d6b8e35fc7c505620f80c33aac0a1837b))
* **menu-surface:** convert never reassigned variables to constants ([7c967c3](https://github.com/jaredcrimmins/material-components-vuejs/commit/7c967c3e1e071bec6b07ba1140d6e887c795639e))
* **menu-surface:** modify `anchorCorner` and `anchorElement` props ([9bc5c0a](https://github.com/jaredcrimmins/material-components-vuejs/commit/9bc5c0a2744ac3cf5fff1fe02a4db6b261a6c5b3))
* **menu-surface:** rewrite in TypeScript ([b8b028a](https://github.com/jaredcrimmins/material-components-vuejs/commit/b8b028a3ea20b2143c2562cd9b074bed35727a6f))
* **menu:** add default value to `value` prop ([824c4bc](https://github.com/jaredcrimmins/material-components-vuejs/commit/824c4bcdf6891003db71cbd9ebe5d386f13f00ff))
* **menu:** add default value to multiple props ([9feab8b](https://github.com/jaredcrimmins/material-components-vuejs/commit/9feab8b9e803d3f3450d2ea9b91b040c4585beba))
* **menu:** rewrite in TypeScript ([52725f6](https://github.com/jaredcrimmins/material-components-vuejs/commit/52725f6e796be0bf44e8ff654482a0f03e5b8f49))
* **multiple:** remove `anchorElement` prop validator ([8af6625](https://github.com/jaredcrimmins/material-components-vuejs/commit/8af662573a36fe1245f8f9753887cf98185fb11f))
* **multiple:** remove `HTMLElement` from `anchorElement` typing ([06072f8](https://github.com/jaredcrimmins/material-components-vuejs/commit/06072f8ed67502bcdf7b4d51b42767f0ed55c9e7))
* **multiple:** rewrite components in TypeScript ([f93a17c](https://github.com/jaredcrimmins/material-components-vuejs/commit/f93a17c33951f3bb69fc35f34845af1bfce472fa))
* **notched-outline:** modify `getLabelWidth` ([e635b25](https://github.com/jaredcrimmins/material-components-vuejs/commit/e635b2513abb53b015e63fe03732e66e57a53fb4))
* **notched-outline:** modify prop definitions ([2bc211b](https://github.com/jaredcrimmins/material-components-vuejs/commit/2bc211bff53244b577c261eefab7d8b8e8914465))
* **notched-outline:** rewrite in TypeScript ([6fb140e](https://github.com/jaredcrimmins/material-components-vuejs/commit/6fb140e1ae7a2e65c69029b50267d440d06f0c3a))
* **radio:** add default values to `id`, `name`, and `value` props ([5cbf367](https://github.com/jaredcrimmins/material-components-vuejs/commit/5cbf36772c2702c8a5e35794cff9023bf6f096f6))
* **radio:** compute the `id` attr from a prop and a fallback value ([a1a35a2](https://github.com/jaredcrimmins/material-components-vuejs/commit/a1a35a247477023907e131ab35e66888696aa5b3))
* **radio:** rewrite in TypeScript ([7bc2e2e](https://github.com/jaredcrimmins/material-components-vuejs/commit/7bc2e2e760dc0525e4b056a9cd425f0a019e2ca5))
* remove `version` static property from plugin class ([08a1d71](https://github.com/jaredcrimmins/material-components-vuejs/commit/08a1d717d1d699fd702e0d36043b487ba798eb5b))
* rewrite plugin in TypeScript ([ed9d1f2](https://github.com/jaredcrimmins/material-components-vuejs/commit/ed9d1f269145fbedcdda66daff2692dc91096ae9))
* **ripple:** declare `NativeEventListener` in `src/utils.ts` ([4168e67](https://github.com/jaredcrimmins/material-components-vuejs/commit/4168e6729690c85fddb8931f3f54974a10af1117))
* **ripple:** rename scoped slot "default" to "root" ([6cf1f01](https://github.com/jaredcrimmins/material-components-vuejs/commit/6cf1f012ad4a0ee024b8acd3274d65e26ff0d50d))
* **ripple:** rename scoped slot `default` to `root` ([6c914c4](https://github.com/jaredcrimmins/material-components-vuejs/commit/6c914c48a50d548f2a606c0234780e40f79ba14c))
* **ripple:** rewrite index in TypeScript ([945e407](https://github.com/jaredcrimmins/material-components-vuejs/commit/945e40710202ebf145520dc2d96b69ded4fd4a0b))
* **select:** convert component name to kebab case ([4c2e14f](https://github.com/jaredcrimmins/material-components-vuejs/commit/4c2e14f0f4031e83426ddf01edd37739de1d5855))
* **select:** convert file from .vue to .js ([e40ecc0](https://github.com/jaredcrimmins/material-components-vuejs/commit/e40ecc0951b3ef4d96af956d6daecfb1e3f5ddf3))
* **select:** convert never reassigned variables to constants ([ce0d8ba](https://github.com/jaredcrimmins/material-components-vuejs/commit/ce0d8ba6422de3cdf5cddfafd3b88c11d744f8b3))
* **select:** rewrite in TypeScript ([205ab63](https://github.com/jaredcrimmins/material-components-vuejs/commit/205ab635e6f5de69962df329bb784a9910412ef0))
* **snackbar:** add default values to `label` and `timeoutMs` props ([916a3af](https://github.com/jaredcrimmins/material-components-vuejs/commit/916a3afffe51b9145601df1c58599ca251c45836))
* **snackbar:** add type to `value` prop ([80ddc2c](https://github.com/jaredcrimmins/material-components-vuejs/commit/80ddc2cc8bd2f72745c5429db59c6a94fa21129c))
* **snackbar:** rewrite in TypeScript ([9c20498](https://github.com/jaredcrimmins/material-components-vuejs/commit/9c20498e264819bc3019ef73c41079741866fb70))
* **switch:** rewrite in TypeScript ([e04d9fa](https://github.com/jaredcrimmins/material-components-vuejs/commit/e04d9fa8dc00ed1f6ea57ecec1e255c5a7577f9b))
* **tabs:** add private methods to handle DOM events ([90e20d6](https://github.com/jaredcrimmins/material-components-vuejs/commit/90e20d698535fc284f71ead9d342118c977c1338))
* **tabs:** rewrite in TypeScript ([cb2c88f](https://github.com/jaredcrimmins/material-components-vuejs/commit/cb2c88f72455a892d0ddd922b54a3cf0c207931b))
* **textfield:** add default values to various string props ([49c83c8](https://github.com/jaredcrimmins/material-components-vuejs/commit/49c83c82daa64202260e1da59eb11f2d6ba561b5))
* **textfield:** add watcher to `content` prop ([6500274](https://github.com/jaredcrimmins/material-components-vuejs/commit/6500274389c0a5be26f21d021e7c631c80e99b41))
* **textfield:** modify `maxLength` and `size` prop definitions ([aa11abc](https://github.com/jaredcrimmins/material-components-vuejs/commit/aa11abc9b239715a1a8eea0be05826382e8c8eaf))
* **textfield:** modify `value` prop definition ([8058e6e](https://github.com/jaredcrimmins/material-components-vuejs/commit/8058e6e3ac46b779b23e988c77c01232b2b5b1a9))
* **textfield:** rewrite in TypeScript ([fd3a50b](https://github.com/jaredcrimmins/material-components-vuejs/commit/fd3a50b205253c889db709efc7208b85d27dcb42))
* use named exports ([67f740b](https://github.com/jaredcrimmins/material-components-vuejs/commit/67f740b4fe6f00e00815a91bbe65d3f7d6259e88))
* utilities TypeScript rewrite ([d9a3551](https://github.com/jaredcrimmins/material-components-vuejs/commit/d9a3551e487194099889b35fb71c41152cf06e92))


### Build

* add package.json script, `build`, to build using Rollup ([eec3bdf](https://github.com/jaredcrimmins/material-components-vuejs/commit/eec3bdf4c60024e3895d53f5b3579cac27cf76ab))
* add rollup.config.js ([c5d2091](https://github.com/jaredcrimmins/material-components-vuejs/commit/c5d20918644c3c4b60a5e55f02cfdde358341ca3))
* add TypeScript support via Vue CLI ([f842af7](https://github.com/jaredcrimmins/material-components-vuejs/commit/f842af7fa7f50842aa5a235fe281a7ba114f82f2))
* create `vue.config.js` ([993872c](https://github.com/jaredcrimmins/material-components-vuejs/commit/993872cfb2e61f91e87819f5fab9dde8cb08690b))
* delete dist/demo.html immediately following build ([145e028](https://github.com/jaredcrimmins/material-components-vuejs/commit/145e02808cd24c63bd18f97c73a89a2ea61541b1))
* install dev dependency sass@^1.35.1 <1.40.0 ([84d8ea3](https://github.com/jaredcrimmins/material-components-vuejs/commit/84d8ea316386262a72f84a35442a00587db71d7b))
* install Vue CLI and configure dev script ([d873d12](https://github.com/jaredcrimmins/material-components-vuejs/commit/d873d1204255aa7438d7063504fbe466ab96ecdd))
* modify TSConfig to generate ES2020 code ([4da049a](https://github.com/jaredcrimmins/material-components-vuejs/commit/4da049a6363abb2108cb39acf9e52af45938e2b5))
* remove `module` field from package.json ([85d38f3](https://github.com/jaredcrimmins/material-components-vuejs/commit/85d38f3838663e61ed4fe7f8bbdd66f4cb738ffc))
* remove `node_modules` from bundle in production ([41289f9](https://github.com/jaredcrimmins/material-components-vuejs/commit/41289f911069bbb40fa54d0b07f21f1e8294f851))
* remove `webpack-env` from TSConfig types ([7643f7f](https://github.com/jaredcrimmins/material-components-vuejs/commit/7643f7f0bab3319d8c13b26426647b99f2679596))
* remove import plugin ([6a85b4a](https://github.com/jaredcrimmins/material-components-vuejs/commit/6a85b4a679ed1fa613d452530dbf077e516f5545))
* remove package.json field `sideEffects` ([f2b1f47](https://github.com/jaredcrimmins/material-components-vuejs/commit/f2b1f470abbecacf913506a2badc5e9790e541a5))
* remove redundant dev dependency @babel/preset-env ([697abc4](https://github.com/jaredcrimmins/material-components-vuejs/commit/697abc41fb77e3b1c77c7125dd1b654ab6b91ae0))
* remove redundant dev dependency vue-loader ([f25bbdb](https://github.com/jaredcrimmins/material-components-vuejs/commit/f25bbdb2d54f714ea009f4bd5c740e157aea3c15))
* remove src directory from .npmignore allowlist ([c79caf6](https://github.com/jaredcrimmins/material-components-vuejs/commit/c79caf6da97203184288f4ed1f81db8131b04246))
* remove webpack configuration from vue.config.js ([4cae79b](https://github.com/jaredcrimmins/material-components-vuejs/commit/4cae79b953f8b4f8d2bdbe0d5290fe230cd66b70))
* rename `build` script to `build:vue-cli` ([c0e4094](https://github.com/jaredcrimmins/material-components-vuejs/commit/c0e409442f60e2e32461e98b1aa94b91fdec3620))
* **rollup:** remove unused module IDs from `external` option ([bd81cd8](https://github.com/jaredcrimmins/material-components-vuejs/commit/bd81cd8f3a26594c58dbc24dc5ce4ea0fb1b1c10))
* **rollup:** replace @material/* external module IDs with regex ([23f17d3](https://github.com/jaredcrimmins/material-components-vuejs/commit/23f17d3f442fa60e543a1bda914c2c2004ae7ec6))
* run `npm audit fix` ([9113de9](https://github.com/jaredcrimmins/material-components-vuejs/commit/9113de9f70b2befe14827713d22aa9a6be7b4efc))
* run `vue add babel` ([3b82df1](https://github.com/jaredcrimmins/material-components-vuejs/commit/3b82df1581a52a82a4e39875f321a838cdadb60d))
* run `vue add typescript` ([5ca1df9](https://github.com/jaredcrimmins/material-components-vuejs/commit/5ca1df987ac79a3ffb21bbf8bb79b35a1f4cd826))
* set package.json `module` field to Rollup's ESM output file ([b19c040](https://github.com/jaredcrimmins/material-components-vuejs/commit/b19c040e78880df64c26bd98dce061333398e080))
* use Rollup's CommonJS output file as the primary entry point ([278c6a9](https://github.com/jaredcrimmins/material-components-vuejs/commit/278c6a9865b0318760a1492716b0bd0d83cd0632))
* use the minified UMD bundle as the primary entry point ([f7f6e0c](https://github.com/jaredcrimmins/material-components-vuejs/commit/f7f6e0cf5df191ffcb66185c15e236aff31685b9))
* use vue-cli-service to build library ([6791c33](https://github.com/jaredcrimmins/material-components-vuejs/commit/6791c33594dcc42024f4b62e10f83878ee4f4cb6))
