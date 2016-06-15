"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var boot_1 = require('./js/components/boot');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var campaignData_1 = require('./js/services/campaignData');
var http_1 = require('@angular/http');
platform_browser_dynamic_1.bootstrap(boot_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    http_1.HTTP_PROVIDERS, campaignData_1.CampaignData
]);
//# sourceMappingURL=main.js.map