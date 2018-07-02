import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-modal-placeautocomplete',
  templateUrl: 'modal-placeautocomplete.html',
})
export class ModalPlaceautocompletePage {
    autocompleteItems: any;
    autocomplete: any;
    acService:any;
    placesService: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPlaceautocompletePage');
  }
  

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
        query: ''
    };        
  } 

  dismiss() {
    this.viewCtrl.dismiss();
  }

  
  chooseItem(item: any) {
    console.log('modal > chooseItem > item > ', item);
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {

    console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
        this.autocompleteItems = [];
        return;
    }
    
    let self = this;
    let config = { 
        types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: this.autocomplete.query
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
        console.log('modal > getPlacePredictions > status > ', status);
        self.autocompleteItems = [];             
        if(status == "OK"){
            predictions.forEach(function (prediction) {              
            self.autocompleteItems.push(prediction);
        });
        }
    });
}

}
