import {Component, OnInit, ViewChild} from '@angular/core';

/*service*/
import {AjaxService} from '../services/ajax';
import {ModalService} from '../services/ModalService';

import {CampaignData} from '../services/campaignData';

/*Rxjs*/
import  '../rxjs/rxjs-operators';

import { MODAL_DIRECTIVES,ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';


/**
 * @author Naveen Kumar<br>
 *         <p>
 *         Date Created: 15-JUNE-2016
 *         </p>
 */




@Component({
	templateUrl: 'app/views/en-US/user/campaigns.html',
	providers: [AjaxService,ModalService],
    directives: [MODAL_DIRECTIVES]
}) 

export class CampaignsComponent implements OnInit {
 
	@ViewChild('mail')
	modal: ModalComponent;

	@ViewChild('mail1')
	modal1: ModalComponent;
	
	message: string;


    campaign : any = {
        campaignSno : "",
        campaignId : "",
        campaignTitle : "",
	    campaignLabel : "",
        campaignDescription : "",
	    campaignType : "",
        emailSubject : "",
        fromName : "",
	    fromEmail : "",
		toNameType : "",
	    emailType : "",
        emailStatus : "",
        emailTemplate : "",
        apiKey : "" ,
	    listId : "",
		createdBy : "",
	    createdDate : "",
        updatedBy : "",
        updatedDate : ""
      };



   RestUrl: string = 'http://localhost:8080/geppetto_mailchimp';
 
   campaignsList = [];


   constructor(private router: Router, private ajaxservice: AjaxService, private CampaignData: CampaignData,private modalservice:ModalService){
	   console.log("in campaigns consructor");
   }



	ngOnInit() {
		this.findAllCampaigns();	
	}

   

    findAllCampaigns(){
      console.log("Finding all Camapign");
      var url = this.RestUrl + '/campaign/findAllCampaigns';
      console.log(url);
	  

	  this.ajaxservice.findAllCampaigns(url).subscribe(
		  data => { this.campaignsList = data },
		  err => console.error(err),
		  () => console.log("in component", this.campaignsList)
	  );

    }

	
	
       /*Buttons*/

	addNewCampaign(): void {
	this.router.navigate(['/campaign/create']);
	console.log("Clicked add capmaign button");
    }
  
	


    editExistingCampaign(id):void{
		
		for (var campaign in this.campaignsList)
		{
				if (this.campaignsList[campaign]['campaignSno'] == id) 
				{
					console.log("==========setting data===============");
					this.CampaignData.campaign = this.campaignsList[campaign];
					
			    }

		}

		
		console.log("in main compo campign", this.CampaignData.campaign);

		this.router.navigate(['/campaign/update']);
      }



	openDeleteDialog(id): void {				
		console.log("current Id is"+id );
        this.modalservice.value = id;
		console.log(this.modalservice.value);
		this.modal.open('sm');
    }


  deletingCampaign(){  	  

	  this.modal.close();
	  var id = this.modalservice.value;
 	  var url = this.RestUrl+ '/campaign/deleteCampaign?campaignSno='+id;
	  console.log(id);
	  this.ajaxservice.deleteCampaign(url).subscribe(
		  data => {
                          
			  if (data == true) {
				  console.log(data);

				  this.message = "campaign deleted successfully";
				  this.modal1.open('sm');
				  setTimeout(() => {
					  this.campaignsList.splice(this.campaign, 1)
				  }, 1000);


			  }
			  else {
			  			this.message = "campaign deletion failed due to internal server errors";
			  			this.modal1.open('sm');
			  }
		  });
       
							
	}




}