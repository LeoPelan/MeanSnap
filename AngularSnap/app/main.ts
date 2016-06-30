import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';


// COMPONENTS
import { AppComponent } from './app.component';

/* import { enableProdMode }    from '@angular/core';
enableProdMode(); */


bootstrap(AppComponent, [
    HTTP_PROVIDERS
]);