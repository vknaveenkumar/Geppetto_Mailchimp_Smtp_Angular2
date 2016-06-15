"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var AjaxService = (function () {
    function AjaxService(http) {
        this.http = http;
        this.template = [];
    }
    AjaxService.prototype.findAllCampaigns = function (url) {
        console.log("ajax service ----->findAllCampaigns()");
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.findAllTemplates = function (url) {
        console.log("ajax service ----->findAllTemplates()");
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.findAllSubscribers = function (url) {
        console.log("ajax service ----->findAllSubscribers()");
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.createCampaign = function (campaign, url) {
        console.log("ajax service ----->createCampaign()");
        console.log("url---------->", url);
        console.log("campaign------>", campaign);
        var body = JSON.stringify(campaign);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.sendCampaign = function (url) {
        console.log("ajax service ----->sendCampaign()");
        console.log("url---------->", url);
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.deleteCampaign = function (url) {
        console.log("ajax service ----->deletecampaign");
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.sendEmail = function (url) {
        console.log("ajax  service ----->send tesst mail");
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.subscribeTheList = function (subscriber, url) {
        console.log("ajax  service ----->pick subscribers", subscriber);
        console.log("url--->", url);
        var body = JSON.stringify(subscriber);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.updateSub = function (sub, url) {
        console.log("ajax  service  ----->Updating subscribers");
        var body = JSON.stringify(sub);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.deleteSub = function (url) {
        console.log("ajax  service  ----->Deleting subscribers");
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AjaxService.prototype.createSubscriber = function (url, newSubscriber) {
        console.log("ajax  service  ----->Creating subscribers");
        var body = JSON.stringify(newSubscriber);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options).map(function (res) { return res.json(); });
    };
    AjaxService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AjaxService);
    return AjaxService;
}());
exports.AjaxService = AjaxService;
//# sourceMappingURL=ajax.js.map