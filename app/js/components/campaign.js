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
var router_1 = require('@angular/router');
/*service*/
var ajax_1 = require('../services/ajax');
/*Rxjs*/
require('../rxjs/rxjs-operators');
var campaignData_1 = require('../services/campaignData');
/*external directives*/
var CKEditor_1 = require('ng2-ckeditor/CKEditor');
var ng2_tabs_1 = require("ng2-tabs");
/*for grid*/
var primeng_1 = require('primeng/primeng');
var accordion_1 = require('ng2-bootstrap/components/accordion');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
/**
 * @author Naveen Kumar<br>
 *         <p>
 *         Date Created: 15-JUNE-2016
 *         </p>
 */
var CampaignComponent = (function () {
    function CampaignComponent(router, ajaxservice, CampaignData) {
        this.router = router;
        this.ajaxservice = ajaxservice;
        this.CampaignData = CampaignData;
        /*ResTurl*/
        this.RestUrl = 'http://localhost:8080/geppetto_mailchimp';
        /*for single campaign*/
        this.campaign = {
            campaignSno: "",
            campaignId: "",
            campaignTitle: "",
            campaignLabel: "",
            campaignDescription: "",
            campaignType: "",
            emailSubject: "",
            fromName: "",
            fromEmail: "",
            toNameType: "",
            emailType: "",
            emailStatus: "",
            emailTemplate: "",
            apiKey: "",
            listId: "",
            createdBy: "",
            createdDate: "",
            updatedBy: "",
            updatedDate: ""
        };
        this.template = {
            templateSno: "",
            baseTemplateId: "",
            templateName: "",
            bodyHeader: "",
            bodySubject: "",
            bodyContent: "",
            bodyFooter: "",
            sourceCode: "",
            modifiedCode: "",
            extractedCode: "",
            createdBy: "",
            createdDate: "",
            updatedBy: "",
            updatedDate: ""
        };
        this.modalData = {};
        /*For Loading templates*/
        this.templatesList = [];
        this.baseTemplatesList = [];
        this.campaignsList = [];
        this.subscribersList = [];
        this.pickedSubscribers = [];
        /*for picking the subcriber*/
        this.subscriber = {
            apiKey: "",
            listId: "",
            subscribers: []
        };
        /*for adding new subscriber*/
        this.newSubscriber = {
            subscriberSno: 0,
            firstName: "",
            lastName: "",
            emailAddress: ""
        };
        this.newSubscriberList = [];
    }
    CampaignComponent.prototype.routerOnActivate = function (curr) {
        this.id = curr.getParam('id');
        console.log(this.id);
    };
    CampaignComponent.prototype.ngOnInit = function () {
        var _this = this;
        switch (this.id) {
            case "create":
                this.CampaignBtn = true;
                console.log("in create request");
                this.findAllTemplates();
                this.findAllSubscribers();
                break;
            case "update":
                this.CampaignBtn = false;
                this.findAllTemplates();
                this.findAllSubscribers();
                this.campaign = this.CampaignData.campaign;
                this.template = this.CampaignData.campaign.emailTemplate;
                setTimeout(function () {
                    _this.template.templateSno = _this.CampaignData.campaign.emailTemplate.templateSno;
                    _this.template.baseTemplateId = _this.CampaignData.campaign.emailTemplate.baseTemplateId;
                }, 1000);
                break;
            default:
                break;
        }
    };
    CampaignComponent.prototype.findAllTemplates = function () {
        var _this = this;
        console.log("Finding all template");
        var url = this.RestUrl + '/template/findAllTemplates';
        this.ajaxservice.findAllTemplates(url).subscribe(function (data) { _this.baseTemplatesList = data.baseTemplates, _this.templatesList = data.customTemplates; }, function (err) { return console.error(err); }, function () { return console.log("Base Templates:", _this.baseTemplatesList, "Custom Templates:", _this.templatesList); });
    };
    CampaignComponent.prototype.findAllSubscribers = function () {
        var _this = this;
        console.log("Finding all subcribers");
        var url = this.RestUrl + '/subscriber/findAllSubscribers';
        var data;
        this.ajaxservice.findAllSubscribers(url).subscribe(function (data) { _this.subscribersList = data; console.log("hiwww", _this.subscribersList); /*this.initializeGrid();*/ }, function (err) { return console.error(err); });
        console.log("outside of ajax");
    };
    CampaignComponent.prototype.initializeGrid = function () {
    };
    CampaignComponent.prototype.subscribeTheList = function () {
        var _this = this;
        /* var data = this.gridOptions.api.getSelectedRows();
         console.log(data);*/
        var url = this.RestUrl + '/mailchimpapi/subscribeTheList';
        console.log("going to subscribe", this.pickedSubscribers);
        console.log("api", this.campaign.apiKey);
        console.log("List ID", this.campaign.listId);
        this.subscriber.apiKey = this.campaign.apiKey;
        this.subscriber.listId = this.campaign.listId;
        this.subscriber.subscribers = this.pickedSubscribers;
        console.log(this.subscriber);
        this.ajaxservice.subscribeTheList(this.subscriber, url).subscribe(function (data) {
            console.log(data);
            if (data.error_count == 0) {
                _this.message = "Subscribers subscribed successfully!";
                _this.modal2.open('sm');
            }
            else {
                _this.message = "Subscribers subscription failed, due to some internal errors!";
                _this.modal2.open('sm');
            }
        });
    };
    CampaignComponent.prototype.createCampaign = function () {
        var _this = this;
        console.log("In starting of creating campaign");
        this.campaign.emailTemplate = this.template;
        console.log(this.campaign);
        var url = this.RestUrl + '/campaign/createCampaign';
        this.ajaxservice.createCampaign(this.campaign, url).subscribe(function (data) {
            _this.campaign = data;
            _this.templatesList.push(data.emailTemplate.templateName);
            _this.template.templateSno = data.emailTemplate.templateSno;
            _this.template = data.emailTemplate;
            console.log("msg create successfully");
            _this.message = "Campaign created successfully";
            _this.modal2.open('sm');
        }, function (err) {
            console.log("unable to create campaign");
            _this.message = "Campaign creation Failed Due to internal Server errors";
            _this.modal2.open('sm');
        });
    };
    CampaignComponent.prototype.updateSub = function (sub) {
        var _this = this;
        var url = this.RestUrl + '/subscriber/updateSubscriber';
        this.ajaxservice.updateSub(sub, url).subscribe(function (data) {
            if (data != null) {
                _this.message = "subscriber update successfully";
                _this.modal2.open('sm');
            }
            else {
                _this.message = "updation failed";
                _this.modal2.open('sm');
            }
        });
    };
    CampaignComponent.prototype.deleteSub = function (sub) {
        var _this = this;
        /*for getting index*/
        var index = -1;
        for (var i = 0; i < this.subscribersList.length; i++) {
            if (this.subscribersList[i].subscriberSno == sub.subscriberSno) {
                index = i;
                break;
            }
        }
        var id = sub.subscriberSno;
        var url = this.RestUrl + '/subscriber/deleteSubscriber?subscriberSno=' + id;
        this.ajaxservice.deleteSub(url).subscribe(function (data) {
            if (data == true) {
                _this.subscribersList.splice(index, 1);
                _this.message = "subscriber deleted successfully";
                _this.modal2.open('sm');
            }
        });
    };
    CampaignComponent.prototype.addNewRow = function () {
        var _this = this;
        console.log("add function is called");
        var length = this.subscribersList.length;
        if (this.subscribersList.length < 5) {
            //this.subscribersList.push(this.newSubscriber);
            this.newSubscriberList.push(this.newSubscriber);
            console.log("new list", this.newSubscriberList);
            var url = this.RestUrl + '/subscriber/createSubscribers';
            this.ajaxservice.createSubscriber(url, this.newSubscriberList).subscribe(function (data) {
                console.log("data is", data);
                var object = data[0];
                console.log(object);
                _this.subscribersList.push(object);
                _this.message = "subscriber created ,Please update the values";
                _this.modal2.open('sm');
            });
        }
        else {
            this.message = "Limit reached";
            this.modal2.open('sm');
        }
    };
    CampaignComponent.prototype.sendCampaign = function () {
        var _this = this;
        console.log("starting of send campaign");
        var url = this.RestUrl + '/mailchimpapi/sendCampaign?api_key='
            + this.campaign.apiKey + "&campaign_id="
            + this.campaign.campaignId + "&campaign_sno="
            + this.campaign.campaignSno;
        this.ajaxservice.sendCampaign(url).subscribe(function (data) {
            _this.campaign.emailStatus = data;
            _this.message = "Campaign was sent successfully";
            _this.modal2.open('sm');
        }, function (err) {
            _this.message = "Campaign was not sent successfully";
            _this.modal2.open('sm');
        });
    };
    CampaignComponent.prototype.sendTestMail = function () {
        console.log("In send Test Mail");
        this.modal3.open('sm');
    };
    CampaignComponent.prototype.sendTest = function () {
        var _this = this;
        console.log(this.modalData.email);
        var url = this.RestUrl + '/mailchimpapi/sendTestEmail?api_key=' + this.campaign.apiKey + "&campaign_id=" + this.campaign.campaignId + "&emailIds=" + this.modalData.email;
        console.log(url);
        this.modal3.close();
        this.ajaxservice.sendEmail(url).subscribe(function (data) {
            _this.message = "Mail was sent successfully";
            _this.modal2.open('sm');
        }, function (err) {
            _this.message = "Mail was not sent successfully";
            _this.modal2.open('sm');
        });
    };
    /*For template*/
    CampaignComponent.prototype.pickNewTemplate = function (value) {
        console.log("disable existing template");
        console.log("new", value);
        if (value == undefined) {
            jQuery("#existingtemplate").removeAttr("disabled");
        }
        else {
            jQuery("#existingtemplate").attr("disabled", "disabled");
        }
        console.log("disabled");
    };
    CampaignComponent.prototype.pickExistingTemplate = function (value) {
        console.log("disabling template");
        console.log("old", value);
        if (value == undefined) {
            jQuery("#newtemplate").removeAttr("disabled");
            this.template.bodyHeader = "";
            this.template.bodySubject = "";
            this.template.bodyContent = "";
            this.template.bodyFooter = "";
            this.template.sourceCode = "";
            this.template.modifiedCode = "";
            this.template.extractedCode = "";
        }
        else {
            jQuery("#newtemplate").attr("disabled", "disabled");
            console.log("temp length", this.templatesList.length);
            if (this.templatesList.length > 0) {
                for (var template in this.templatesList) {
                    if (this.templatesList[template].templateSno == value) {
                        this.template.bodyHeader = this.templatesList[template].bodyHeader;
                        this.template.bodySubject = this.templatesList[template].bodySubject;
                        this.template.bodyContent = this.templatesList[template].bodyContent;
                        this.template.bodyFooter = this.templatesList[template].bodyFooter;
                        this.template.sourceCode = this.templatesList[template].sourceCode;
                        this.template.modifiedCode = this.templatesList[template].modifiedCode;
                        this.template.extractedCode = this.templatesList[template].extractedCode;
                        console.log("template sNO", this.template.templateSno);
                    }
                }
            }
        }
    };
    /*This is for back button*/
    CampaignComponent.prototype.goBack = function () {
        this.router.navigate(['/campaigns']);
        console.log("in add capmaign button");
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], CampaignComponent.prototype, "modal2", void 0);
    __decorate([
        core_1.ViewChild('sendmail'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], CampaignComponent.prototype, "modal3", void 0);
    CampaignComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/views/en-US/user/campaign.html',
            directives: [accordion_1.ACCORDION_DIRECTIVES, CKEditor_1.CKEditor, ng2_tabs_1.TAB_DIRECTIVES, ng2_bs3_modal_1.MODAL_DIRECTIVES, primeng_1.DataTable, primeng_1.Column],
            providers: [ajax_1.AjaxService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, ajax_1.AjaxService, campaignData_1.CampaignData])
    ], CampaignComponent);
    return CampaignComponent;
}());
exports.CampaignComponent = CampaignComponent;
//# sourceMappingURL=campaign.js.map