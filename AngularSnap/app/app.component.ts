import { Component, OnInit } from '@angular/core';
import {AppService} from "./app.service";
import {Snap} from "./Snap/snap";
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [],
    providers: [AppService]
})
export class AppComponent implements OnInit {
    public snaps: Snap[];
    public url: string;
    private socket = null;
    chatinp = '';

    constructor(public service: AppService){
        this.url = 'http://';
        this.socket = io('http://localhost:1401');
        let listener = Observable.fromEvent(this.socket, 'message');
        listener.subscribe((payload) => {
            this.getSnaps();
        })


    }

    ngOnInit(){
     this.getSnaps();
    }

    getSnaps(){
        this.service.getSnaps()
            .then(response => {
                this.snaps = response.reverse();
                console.log(this.snaps.length, response.length)
            });
    }

    save(){
        this.service.save(this.url);
    }
}