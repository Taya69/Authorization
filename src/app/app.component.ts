import { Component } from '@angular/core';
import { Router, Event, NavigationStart} from '@angular/router'
import { filter, find} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authorization';  
}
