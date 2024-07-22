import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {
  @Input() collection: any;

  constructor() {}

  ngOnInit(): void {

  }
}
