import {Component} from '@angular/core';

import { ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';



import {HeadingComponent} from './header';
import {FooterComponent} from './footer';
import {CampaignsComponent} from './campaigns';
import {CampaignComponent} from './campaign'


/**
 * @author Naveen Kumar<br>
 *         <p>
 *         Date Created: 15-JUNE-2016
 *         </p>
 */



@Component({
    selector: 'my-app',
	templateUrl: 'app/views/en-US/user/home.html',
	directives: [ROUTER_DIRECTIVES,HeadingComponent, FooterComponent]
})


@Routes([
	{ path: '/campaigns', component: CampaignsComponent},
    { path: '/campaign/:id', component: CampaignComponent},
])


export class AppComponent {

	constructor(private router: Router) {}

	ngOnInit() {		
		this.router.navigate(['/campaigns']);
    }



	

}