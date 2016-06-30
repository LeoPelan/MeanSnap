import { Component, OnInit } from '@angular/core';
import {AppService} from "./app.service";
import {Snap} from "./Snap/snap";


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [],
    providers: [AppService]
})
export class AppComponent implements OnInit {
    public snaps: Snap[];
    public url: string;

    constructor(public service: AppService){
       this.url = 'http://';
    }

    ngOnInit(){
     this.getSnaps();
    }
    getSnaps(){
        this.service.getSnaps()
            .then(response => {
                this.snaps = response.reverse();
            });
    }

    save(){
        this.service.save(this.url)
            .then(response => {
                    this.getSnaps();
                })
    }
}