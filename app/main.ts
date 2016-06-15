import { bootstrap }    from '@angular/platform-browser-dynamic';
import {AppComponent} from './js/components/boot';
import { provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {CampaignData} from './js/services/campaignData';


import { HTTP_PROVIDERS } from '@angular/http';

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
  	provide(LocationStrategy,{ useClass: HashLocationStrategy }),
	HTTP_PROVIDERS,CampaignData
]);