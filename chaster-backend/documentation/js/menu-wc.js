'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">chaster-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' : 'data-bs-target="#xs-controllers-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' :
                                            'id="xs-controllers-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' : 'data-bs-target="#xs-injectables-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' :
                                        'id="xs-injectables-links-module-AppModule-be5b7980060bf0fa9dc20cacbdfad6f495e57f820058214d1a5e7a937789e8ec80615433aa5fcc14a5dea6ba59003f626a90c73b7569512e88e818a9b984a913"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ConfigModule-167ce2d93d091d381e19972f3757559d70d433809aa4c0d2ab439b535bb75607f8db81b72335c3e8027807bcfa583cb6c9bece09782e7fbd4453d3fff503dfc9"' : 'data-bs-target="#xs-controllers-links-module-ConfigModule-167ce2d93d091d381e19972f3757559d70d433809aa4c0d2ab439b535bb75607f8db81b72335c3e8027807bcfa583cb6c9bece09782e7fbd4453d3fff503dfc9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConfigModule-167ce2d93d091d381e19972f3757559d70d433809aa4c0d2ab439b535bb75607f8db81b72335c3e8027807bcfa583cb6c9bece09782e7fbd4453d3fff503dfc9"' :
                                            'id="xs-controllers-links-module-ConfigModule-167ce2d93d091d381e19972f3757559d70d433809aa4c0d2ab439b535bb75607f8db81b72335c3e8027807bcfa583cb6c9bece09782e7fbd4453d3fff503dfc9"' }>
                                            <li class="link">
                                                <a href="controllers/ConfigController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LockModule.html" data-type="entity-link" >LockModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LockModule-024dee3a6748e19185024fcb5b4d34939d5e21a15398af292759ec8986eed5aadb275f2f7115c23e86464275461d04776ccae207d9c1081eef8364939a4a8a90"' : 'data-bs-target="#xs-controllers-links-module-LockModule-024dee3a6748e19185024fcb5b4d34939d5e21a15398af292759ec8986eed5aadb275f2f7115c23e86464275461d04776ccae207d9c1081eef8364939a4a8a90"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LockModule-024dee3a6748e19185024fcb5b4d34939d5e21a15398af292759ec8986eed5aadb275f2f7115c23e86464275461d04776ccae207d9c1081eef8364939a4a8a90"' :
                                            'id="xs-controllers-links-module-LockModule-024dee3a6748e19185024fcb5b4d34939d5e21a15398af292759ec8986eed5aadb275f2f7115c23e86464275461d04776ccae207d9c1081eef8364939a4a8a90"' }>
                                            <li class="link">
                                                <a href="controllers/LockController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LockController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SessionModule.html" data-type="entity-link" >SessionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SessionModule-0960a98bfb85ca6f670b1e8ee0c9dba12570f0c927eefe3892b4bce48607d53bf98579b19b34f702de92966bd783cb62df3327593996cfed43460842d79d5e34"' : 'data-bs-target="#xs-controllers-links-module-SessionModule-0960a98bfb85ca6f670b1e8ee0c9dba12570f0c927eefe3892b4bce48607d53bf98579b19b34f702de92966bd783cb62df3327593996cfed43460842d79d5e34"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SessionModule-0960a98bfb85ca6f670b1e8ee0c9dba12570f0c927eefe3892b4bce48607d53bf98579b19b34f702de92966bd783cb62df3327593996cfed43460842d79d5e34"' :
                                            'id="xs-controllers-links-module-SessionModule-0960a98bfb85ca6f670b1e8ee0c9dba12570f0c927eefe3892b4bce48607d53bf98579b19b34f702de92966bd783cb62df3327593996cfed43460842d79d5e34"' }>
                                            <li class="link">
                                                <a href="controllers/SessionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebhooksModule.html" data-type="entity-link" >WebhooksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WebhooksModule-d16218887b9565c4452aa0f29aaa0cb5ca2b7da6599439cf53f594b6c569a659e3f991b947902cbf7bec50eee1df40dee6317500918fb1ac93e8985195e3f792"' : 'data-bs-target="#xs-controllers-links-module-WebhooksModule-d16218887b9565c4452aa0f29aaa0cb5ca2b7da6599439cf53f594b6c569a659e3f991b947902cbf7bec50eee1df40dee6317500918fb1ac93e8985195e3f792"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WebhooksModule-d16218887b9565c4452aa0f29aaa0cb5ca2b7da6599439cf53f594b6c569a659e3f991b947902cbf7bec50eee1df40dee6317500918fb1ac93e8985195e3f792"' :
                                            'id="xs-controllers-links-module-WebhooksModule-d16218887b9565c4452aa0f29aaa0cb5ca2b7da6599439cf53f594b6c569a659e3f991b947902cbf7bec50eee1df40dee6317500918fb1ac93e8985195e3f792"' }>
                                            <li class="link">
                                                <a href="controllers/WebhooksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WebhooksController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ConfigController.html" data-type="entity-link" >ConfigController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LockController.html" data-type="entity-link" >LockController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SessionController.html" data-type="entity-link" >SessionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/WebhooksController.html" data-type="entity-link" >WebhooksController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/BasicAuthGuard.html" data-type="entity-link" >BasicAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ConfigApiResponseDto.html" data-type="entity-link" >ConfigApiResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigDto.html" data-type="entity-link" >ConfigDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataDto.html" data-type="entity-link" >DataDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DifficultyDto.html" data-type="entity-link" >DifficultyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HomeActionsDto.html" data-type="entity-link" >HomeActionsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LockDto.html" data-type="entity-link" >LockDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetadataDto.html" data-type="entity-link" >MetadataDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NestedConfigDto.html" data-type="entity-link" >NestedConfigDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrivateSessionDto.html" data-type="entity-link" >PrivateSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});