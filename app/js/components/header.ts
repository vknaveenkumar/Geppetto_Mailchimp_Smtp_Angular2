import {Component} from '@angular/core';


/**
 * @author Naveen Kumar<br>
 *         <p>
 *         Date Created: 15-JUNE-2016
 *         </p>
 */





@Component({
    selector: 'header',
    templateUrl: 'app/views/en-US/headers.html',

})
export class HeadingComponent {

   constructor(){
	   console.log("loading header...");
   }


}