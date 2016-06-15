import {Component,OnInit,AfterViewInit,ViewChild} from '@angular/core';
import {OnActivate, Router, RouteSegment } from '@angular/router';

/*service*/
import {AjaxService} from '../services/ajax';

/*Rxjs*/
import  '../rxjs/rxjs-operators';

import {CampaignData} from '../services/campaignData';

/*external directives*/
import {CKEditor} from 'ng2-ckeditor/CKEditor';
import {TAB_DIRECTIVES} from "ng2-tabs";

/*for grid*/
import {DataTable,Column} from 'primeng/primeng';



import { ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';

import { Observable }     from 'rxjs/Observable';

import { MODAL_DIRECTIVES,ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


declare var jQuery: any;

/**
 * @author Naveen Kumar<br>
 *         <p>
 *         Date Created: 15-JUNE-2016
 *         </p>
 */



@Component({
  templateUrl: 'app/views/en-US/user/campaign.html',
  directives: [ACCORDION_DIRECTIVES, CKEditor, TAB_DIRECTIVES, MODAL_DIRECTIVES,DataTable,Column],
  providers: [AjaxService]
})

export class CampaignComponent implements OnActivate,OnInit{

  
   /*For modal*/
  @ViewChild('modal')
  modal2: ModalComponent;

  @ViewChild('sendmail')
  modal3: ModalComponent;
  
  




 /*router id intialization*/
   id: string;
   
  /*ResTurl*/ 
   RestUrl: string = 'http://localhost:8080/geppetto_mailchimp';


   message: string;


  /*for single campaign*/

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
        apiKey : "",
        listId : "",
        createdBy : "",
        createdDate : "",
        updatedBy : "",
        updatedDate : ""
      };



 template : any = {
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


modalData :any={}






  /*For Loading templates*/
   templatesList = [];
   baseTemplatesList = [];
   campaignsList = [];
   
   subscribersList = [];


   
 
   pickedSubscribers = [];
 

 /*for picking the subcriber*/
   subscriber = {
      apiKey : "",
      listId : "",
      subscribers :[]
   };

  /*for adding new subscriber*/

     newSubscriber={
          subscriberSno: 0,
          firstName: "",
          lastName: "",
          emailAddress: ""
     }

   newSubscriberList = [];



   /*Buttons*/
   CampaignBtn: boolean;


   constructor(private router: Router, private ajaxservice: AjaxService,private CampaignData:CampaignData) {  


        

   }

        


   routerOnActivate(curr: RouteSegment): void {
    	 this.id = curr.getParam('id');
		 console.log(this.id);
  	}

	
	
	ngOnInit() {

         switch (this.id) {
          	
          	case "create":
              this.CampaignBtn = true;
				      console.log("in create request");
				      this.findAllTemplates();
              this.findAllSubscribers();
              break;

            case "update" :
               this.CampaignBtn = false;
               this.findAllTemplates();
               this.findAllSubscribers();
               this.campaign = this.CampaignData.campaign;
               this.template=this.CampaignData.campaign.emailTemplate;

               setTimeout(() => {
                      this.template.templateSno = this.CampaignData.campaign.emailTemplate.templateSno;
                      this.template.baseTemplateId =this.CampaignData.campaign.emailTemplate.baseTemplateId;
              }, 1000);


            break;

          default:
          		break;
          }
		
	}

  

 
  findAllTemplates(){
      
      console.log("Finding all template");
      var url = this.RestUrl + '/template/findAllTemplates';
      this.ajaxservice.findAllTemplates(url).subscribe(
          data => { this.baseTemplatesList = data.baseTemplates, this.templatesList = data.customTemplates},
          err => console.error(err),
          () => console.log("Base Templates:", this.baseTemplatesList , "Custom Templates:", this.templatesList)
     );


     

   	}





 findAllSubscribers() {
      console.log("Finding all subcribers");
      var url = this.RestUrl + '/subscriber/findAllSubscribers';
      var data;

    
    

    this.ajaxservice.findAllSubscribers(url).subscribe(
    data => { this.subscribersList = data; console.log("hiwww", this.subscribersList); /*this.initializeGrid();*/},
    err => console.error(err)
      )

    console.log("outside of ajax")
  }


  initializeGrid(){

  }






 subscribeTheList(){
  /* var data = this.gridOptions.api.getSelectedRows();
   console.log(data);*/
   var url = this.RestUrl + '/mailchimpapi/subscribeTheList';
   console.log("going to subscribe", this.pickedSubscribers);
   console.log("api",this.campaign.apiKey);
   console.log("List ID",this.campaign.listId)
   this.subscriber.apiKey=this.campaign.apiKey;
   this.subscriber.listId = this.campaign.listId;
   this.subscriber.subscribers = this.pickedSubscribers;
    console.log(this.subscriber);   
 
  this.ajaxservice.subscribeTheList(this.subscriber, url).subscribe(
    (data) => {
               console.log(data);
               if (data.error_count == 0){
                this.message ="Subscribers subscribed successfully!"
                this.modal2.open('sm');
              }else{
                this.message = "Subscribers subscription failed, due to some internal errors!"
                this.modal2.open('sm');
         }
     
     }
  );
  }


  createCampaign() {
  console.log("In starting of creating campaign")
   this.campaign.emailTemplate = this.template;
    console.log(this.campaign)
    
    var url = this.RestUrl + '/campaign/createCampaign';

    this.ajaxservice.createCampaign(this.campaign, url).subscribe(

    data => {
      this.campaign = data;
      this.templatesList.push(data.emailTemplate.templateName);
      this.template.templateSno = data.emailTemplate.templateSno;
      this.template = data.emailTemplate;
      console.log("msg create successfully");
      this.message="Campaign created successfully"
      this.modal2.open('sm');
    },
    err => { console.log("unable to create campaign");
         this.message = "Campaign creation Failed Due to internal Server errors";
         this.modal2.open('sm');
  }
    );
}

 

  updateSub(sub){
    var url = this.RestUrl + '/subscriber/updateSubscriber';
    this.ajaxservice.updateSub(sub, url).subscribe(
    (data) => {
            if (data != null) {
        this.message = "subscriber update successfully"
        this.modal2.open('sm')
            }
            else {
        this.message = "updation failed";
        this.modal2.open('sm')
      }
    }
  );
  }

 
  deleteSub(sub){

           /*for getting index*/
            let index = -1;
            for(let i = 0; i < this.subscribersList.length; i++) {
                if (this.subscribersList[i].subscriberSno == sub.subscriberSno) {
                    index = i;
                    break;
            }
           }

     
      var id = sub.subscriberSno;
      var url = this.RestUrl + '/subscriber/deleteSubscriber?subscriberSno='+id;
      this.ajaxservice.deleteSub(url).subscribe(

      (data) => {
        if (data == true) {

         this.subscribersList.splice(index, 1);
         this.message = "subscriber deleted successfully";
         this.modal2.open('sm')
        }
      });
  }


  addNewRow(){

    console.log("add function is called")


    var length = this.subscribersList.length;
   
    

    if(this.subscribersList.length<5){
          //this.subscribersList.push(this.newSubscriber);
          this.newSubscriberList.push(this.newSubscriber);
          console.log("new list",this.newSubscriberList);
          var url = this.RestUrl + '/subscriber/createSubscribers';
         this.ajaxservice.createSubscriber(url, this.newSubscriberList).subscribe(

              (data) => { console.log("data is",data);

                var object = data[0];
                console.log(object)
                this.subscribersList.push(object);
                this.message="subscriber created ,Please update the values"
                this.modal2.open('sm');
       }
      );
    }
    else{
    this.message = "Limit reached";
    this.modal2.open('sm')

    }

  }


  sendCampaign() {
      console.log("starting of send campaign");
      var url = this.RestUrl +'/mailchimpapi/sendCampaign?api_key='
              + this.campaign.apiKey + "&campaign_id="
              + this.campaign.campaignId + "&campaign_sno="
              + this.campaign.campaignSno;
      
      this.ajaxservice.sendCampaign(url).subscribe(

      data => { 
                this.campaign.emailStatus = data;
                this.message= "Campaign was sent successfully";
                this.modal2.open('sm');
                            
      },
      err => { this.message= "Campaign was not sent successfully";
                this.modal2.open('sm');
        }
      );
  }

sendTestMail(){
   console.log("In send Test Mail");
   this.modal3.open('sm');
}


sendTest(){
  console.log(this.modalData.email);
  var url = this.RestUrl + '/mailchimpapi/sendTestEmail?api_key=' + this.campaign.apiKey + "&campaign_id=" + this.campaign.campaignId + "&emailIds=" + this.modalData.email;
  console.log(url);
  this.modal3.close();
  this.ajaxservice.sendEmail(url).subscribe(

      data => { 
                
                this.message= "Mail was sent successfully";
                this.modal2.open('sm');                          
      },
    err => { this.message= "Mail was not sent successfully";
                this.modal2.open('sm');  
        }
      );
}




  /*For template*/

  pickNewTemplate(value ){

    console.log("disable existing template");

    console.log("new", value);

  if (value == undefined) { 
        jQuery("#existingtemplate").removeAttr("disabled");
     }
     else {
    jQuery("#existingtemplate").attr("disabled", "disabled");
      }
    console.log("disabled")
  }

  

  pickExistingTemplate(value){

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
        } else {
    jQuery("#newtemplate").attr("disabled", "disabled");
          console.log("temp length",  this.templatesList.length)
          if (this.templatesList.length > 0) {
              for ( var template in this.templatesList) {
               if (this.templatesList[template].templateSno == value) {
                this.template.bodyHeader =this.templatesList[template].bodyHeader;
                this.template.bodySubject = this.templatesList[template].bodySubject;
                this.template.bodyContent =this. templatesList[template].bodyContent;
                this.template.bodyFooter = this.templatesList[template].bodyFooter;
                this.template.sourceCode = this.templatesList[template].sourceCode;
                this.template.modifiedCode = this.templatesList[template].modifiedCode;
                this.template.extractedCode =this. templatesList[template].extractedCode;
                console.log("template sNO",this.template.templateSno);
              }
            }
          }
        }  
 } 



    /*This is for back button*/
    goBack(): void {
		this.router.navigate(['/campaigns']);
  	console.log("in add capmaign button");
    }


}