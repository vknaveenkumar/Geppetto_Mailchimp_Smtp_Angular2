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
/*service*/
var ajax_1 = require('../services/ajax');
var ModalService_1 = require('../services/ModalService');
var campaignData_1 = require('../services/campaignData');
/*Rxjs*/
require('../rxjs/rxjs-operators');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var router_1 = require('@angular/router');
/**
 * @author Naveen Kumar<br>
 *         <p>
 *         Date Created: 15-JUNE-2016
 *         </p>
 */
var CampaignsComponent = (function () {
    function CampaignsComponent(router, ajaxservice, CampaignData, modalservice) {
        this.router = router;
        this.ajaxservice = ajaxservice;
        this.CampaignData = CampaignData;
        this.modalservice = modalservice;
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
        this.RestUrl = 'http://localhost:8080/geppetto_mailchimp';
        this.campaignsList = [];
        console.log("in campaigns consructor");
    }
    CampaignsComponent.prototype.ngOnInit = function () {
        this.findAllCampaigns();
    };
    CampaignsComponent.prototype.findAllCampaigns = function () {
        var _this = this;
        console.log("Finding all Camapign");
        var url = this.RestUrl + '/campaign/findAllCampaigns';
        console.log(url);
        this.ajaxservice.findAllCampaigns(url).subscribe(function (data) { _this.campaignsList = data; }, function (err) { return console.error(err); }, function () { return console.log("in component", _this.campaignsList); });
    };
    /*Buttons*/
    CampaignsComponent.prototype.addNewCampaign = function () {
        this.router.navigate(['/campaign/create']);
        console.log("Clicked add capmaign button");
    };
    CampaignsComponent.prototype.editExistingCampaign = function (id) {
        for (var campaign in this.campaignsList) {
            if (this.campaignsList[campaign]['campaignSno'] == id) {
                console.log("==========setting data===============");
                this.CampaignData.campaign = this.campaignsList[campaign];
            }
        }
        console.log("in main compo campign", this.CampaignData.campaign);
        this.router.navigate(['/campaign/update']);
    };
    CampaignsComponent.prototype.openDeleteDialog = function (id) {
        console.log("current Id is" + id);
        this.modalservice.value = id;
        console.log(this.modalservice.value);
        this.modal.open('sm');
    };
    CampaignsComponent.prototype.deletingCampaign = function () {
        var _this = this;
        this.modal.close();
        var id = this.modalservice.value;
        var url = this.RestUrl + '/campaign/deleteCampaign?campaignSno=' + id;
        console.log(id);
        this.ajaxservice.deleteCampaign(url).subscribe(function (data) {
            if (data == true) {
                console.log(data);
                _this.message = "campaign deleted successfully";
                _this.modal1.open('sm');
                setTimeout(function () {
                    _this.campaignsList.splice(_this.campaign, 1);
                }, 1000);
            }
            else {
                _this.message = "campaign deletion failed due to internal server errors";
                _this.modal1.open('sm');
            }
        });
    };
    __decorate([
        core_1.ViewChild('mail'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], CampaignsComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('mail1'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], CampaignsComponent.prototype, "modal1", void 0);
    CampaignsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/views/en-US/user/campaigns.html',
            providers: [ajax_1.AjaxService, ModalService_1.ModalService],
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, ajax_1.AjaxService, campaignData_1.CampaignData, ModalService_1.ModalService])
    ], CampaignsComponent);
    return CampaignsComponent;
}());
exports.CampaignsComponent = CampaignsComponent;
//# sourceMappingURL=campaigns.js.map