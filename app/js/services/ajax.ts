import { Injectable }     from '@angular/core';


import { Http,Response,Headers,RequestOptions} from '@angular/http';

import { Observable }     from 'rxjs/Observable';








@Injectable()
export class AjaxService {

    template: any = [];

	constructor(private http: Http) { }



	findAllCampaigns(url): Observable<any> {

        console.log("ajax service ----->findAllCampaigns()")
        return this.http.get(url).map((res: Response) => res.json())

    }


	findAllTemplates(url): Observable<any> {

		console.log("ajax service ----->findAllTemplates()")
		return this.http.get(url).map((res: Response) => res.json());

	}


	findAllSubscribers(url): Observable<any> {

		console.log("ajax service ----->findAllSubscribers()")
		return this.http.get(url).map((res: Response) => res.json());

	}




	createCampaign(campaign, url): Observable<any> {


		console.log("ajax service ----->createCampaign()");
		console.log("url---------->", url);
		console.log("campaign------>", campaign);

		let body = JSON.stringify(campaign);
		console.log(body);


		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });


		return this.http.post(url, body, options).map((res: Response) => res.json())

    }


	sendCampaign(url): Observable<any> {

		console.log("ajax service ----->sendCampaign()");
		console.log("url---------->", url);

		return this.http.get(url).map((res: Response) => res.json())
	}

	deleteCampaign(url): Observable<any> {

		console.log("ajax service ----->deletecampaign");
		return this.http.get(url).map((res: Response) => res.json())
	}


	sendEmail(url): Observable<any> {
		console.log("ajax  service ----->send tesst mail")
		return this.http.get(url).map((res: Response) => res.json())
	}


	subscribeTheList(subscriber, url): Observable<any> {
		console.log("ajax  service ----->pick subscribers", subscriber)
		console.log("url--->", url)

		let body = JSON.stringify(subscriber);
		console.log(body);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, body, options).map((res: Response) => res.json());
	}


	updateSub(sub, url) : Observable<any>{
		console.log("ajax  service  ----->Updating subscribers")
	    
	    let body = JSON.stringify(sub);
		console.log(body);

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });


		return this.http.post(url, body, options).map((res: Response) => res.json());
	}


	deleteSub(url) : Observable<any>{

		console.log("ajax  service  ----->Deleting subscribers");
		return this.http.get(url).map((res: Response) => res.json());
	}


	createSubscriber(url, newSubscriber) : Observable<any>{

		console.log("ajax  service  ----->Creating subscribers");
				let body = JSON.stringify(newSubscriber);
				console.log(body);
			   
			    let headers = new Headers({ 'Content-Type': 'application/json' });
				let options = new RequestOptions({ headers: headers });


 				return this.http.post(url, body, options).map((res: Response) => res.json())

	}


}     