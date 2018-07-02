import { identifierModuleUrl } from '@angular/compiler/compiler';
import { Component, NgZone, ViewChild, ElementRef,OnInit } from '@angular/core';
import { ActionSheetController, ViewController, AlertController, App, LoadingController, NavController, Platform, ToastController,Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Jsonp } from '@angular/http';
import { GoogleMapsEvent } from 'ionic-native';

declare var google: any;

@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html'
})
export class MapModal implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  
  listSearch: string = '';

  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";
  searchresult:any;
  regionals: any = [];
  currentregional: any;
  
  markers:any;

  //place picker second
  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;
  result:any;
  plResultStatus:boolean=false;;
  address:any;
  lat:any;
  lng:any;
  strSelectedPlace:string;
  searchLocation:any;
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    public viewCtrl: ViewController,
    public ev:Events
  ) {

    this.platform.ready().then(() => this.loadMaps());
    this.regionals = [{
      "title": "Marker 1",
      "latitude": 52.50094,
      "longitude": 13.29922,
    }, {
      "title": "Marker 3",
      "latitude": 52.50010,
      "longitude": 13.29922,
    }, {
      "title": "Marker 2",
      "latitude": 49.1028606,
      "longitude": 9.8426116
    }];

    this.strSelectedPlace="Search here";
    
  }

  viewPlace(id) {
    console.log('Clicked Marker', id);
  }

  //********************************************* NEW GOOGLE MAP INTEGRATION ******************************************* */
  ngOnInit() {
      this.acService = new google.maps.places.AutocompleteService();        
      this.autocompleteItems = [];
      this.autocomplete = {
      query: ''
      };        
    }


    chooseItem(data){

      let self=this;
      this.plResultStatus=false;
      this.strSelectedPlace=data;
      this.onSelectAddress(data, function(location){  
        //Do something with location
        if (location)
            console.log(location);

            self.autocomplete.query=data;
            self.searchLocation={address:data,lat:location.lat(),lng:location.lng()};
            let myPos = new google.maps.LatLng(location.lat(), location.lng());

            let options = {
              center: myPos,
              zoom: 14
            };
            self.map.setOptions(options);
            self.addMarker(location, data);
           
        })
    }


    goPrevious(){
      this.nav.pop();
    }

    addMarkerNew(map:any){
      let marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: map.getCenter()
      });
      let content = "<h4>Information!</h4>";
      this.addInfoWindow(marker, content);
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
        input: this.autocomplete.query, 
          componentRestrictions: {  } 
        }

        this.acService.getPlacePredictions(config, function (predictions, status) {
            self.autocompleteItems = [];
            if(status == "OK"){
              self.plResultStatus=true;
              predictions.forEach(function (prediction) {              
                self.autocompleteItems.push(prediction);
              });
            }else{
              self.plResultStatus=false;
            }
        });
        
      }


     //CODE TO GET LAT/LNG FROM ADDRESS 
     onSelectAddress(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location);
            } else {
                alert("Can't find address: " + status);
                callback(null,null);
            }
        });
    }

    publicSelectedLocation(address,lat,lng){
      this.ev.publish('searchLocation',address,lat,lng);
      this.dismiss(
      );
    }
    
  /* ******************************************************************************* */
  loadMaps() {

    if (!!google) {
      this.initializeMap();
      //this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

  /*
  Not used 
  */
  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    console.log(ev);
    console.log('search');
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          console.log('geometry location',place.geometry.location);
          sub.complete();
        }
      });
    });
  }


  initAutocomplete(): void {
    //reference : https://github.com/driftyco/ionic/issues/7223
    console.log('text');

    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 14
      };

      this.map.setOptions(options);
      this.addMarker(location, this.searchresult);

    });

  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {

    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    let address;

    autocomplete.bindTo('bounds', this.map);

    return new Observable((sub: any) => {

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        console.log("PLACE=",JSON.stringify(place));
        console.log('place',place.formatted_address);

        address=place.formatted_address;
        this.searchresult=address;

        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {

          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          this.ev.publish('searchLocation',place.formatted_address,place.geometry.location.lat(),place.geometry.location.lng());
          sub.next(place.geometry.location);
          //  sub.complete();

        }
      });
    });

  }

  dismiss(){
    console.log(this.searchLocation);
    if(this.searchLocation){
      //user selected location 
      this.storage.set("search_location",this.searchLocation);
    }else{
    }

    this.viewCtrl.dismiss(this.searchLocation);
  }

  initializeMap() {

    this.zone.run(() => {

        var mapEle = this.mapElement.nativeElement;

        this.map = new google.maps.Map(mapEle, {
          zoom: 12,
          center: { lat: 0, lng: 0 },
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDoubleClickZoom: false,
          disableDefaultUI: true,
          zoomControl: true,
          scaleControl: true,
        });
      


     this.markers = [];
     this.storage.get('search_location').then((result) => {
        if(result){
          console.log(result);
          let lat =result.lat;
          let lng =result.lng;
          this.autocomplete.query=result.address;
          this.searchLocation=result;
          let myPos = new google.maps.LatLng(lat,lng);
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          let location={lat:lat,lng:lng};
          this.addMarker(location, result.address);
        }else{        
            //location info saved in post code of user
        this.storage.get('location').then((result) => {
          console.log(result);
          
          let lat =result.lat;
          let lng =result.lng;
          this.autocomplete.query=result.address;
          this.searchLocation=result;
          let myPos = new google.maps.LatLng(lat,lng);
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          let location={lat:lat,lng:lng};
          this.addMarker(location, result.address);

        })
      }
      });

     
      

      // for (let regional of this.regionals) {
      //   regional.distance = 0;
      //   regional.visible = false;
      //   regional.current = false;

      //   let markerData = {
      //     position: {
      //       lat: -33.8688,
      //       lng: 151.2093
      //     },
      //     map: this.map,
      //     title: regional.title,
      //   };



      //   regional.marker = new google.maps.Marker(markerData);

      //   this.markers.push(regional.marker);


      //   regional.marker.addListener('click', () => {
      //     for (let c of this.regionals) {
      //       c.current = false;
      //       //c.infoWindow.close();
      //     }
      //     this.currentregional = regional;
      //     regional.current = true;

      //     //regional.infoWindow.open(this.map, regional.marker);
      //     this.map.panTo(regional.marker.getPosition());
      //   });
      // }

     
      // google.maps.event.addListenerOnce(this.map, 'idle', () => {
      //   google.maps.event.trigger(this.map, 'resize');
      //   mapEle.classList.add('show-map');
      //   this.bounceMap(this.markers);
      //   this.getCurrentPositionfromStorage(this.markers)
      // });

      // google.maps.event.addListener(this.map, 'bounds_changed', () => {
      //   this.zone.run(() => {
      //     this.resizeMap();
      //   });
      // });


    });
  }

  //Center zoom
  //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

  getCurrentPositionfromStorage(markers) {

    this.storage.get('lastLocation').then((result) => {
      console.log("position from stoarge="+result);
      
      if (result) {
        let myPos = new google.maps.LatLng(result.lat, result.long);
        this.map.setOptions({
          center: myPos,
          zoom: 14
        });

        let marker = this.addMarker(myPos, "My last saved Location: " + result.location);

        markers.push(marker);

        this.bounceMap(markers);

        this.resizeMap();
      }
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }



  
  choosePosition() {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Last Location: ' + result.location,
          buttons: [
            {
              text: 'Reload',
              handler: () => {
                this.getCurrentPosition();
              }
            },
            {
              text: 'Delete',
              handler: () => {
                this.storage.set('lastLocation', null);
                this.showToast('Location deleted!');
                this.initializeMap();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        this.getCurrentPosition();

      }
    });
  }

  //Go show currrent location
  getCurrentPosition() {
    this.loading = this.loadingCtrl.create({
      content: 'Searching Location ...'
    });
    this.loading.present();

    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Location found!');

          console.log(position.coords.latitude, position.coords.longitude);
          let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          this.addMarker(myPos, "Mein Standort!");

          let alert = this.alertCtrl.create({
            title: 'Location',
            message: 'Do you want to save the Location?',
            buttons: [
              {
                text: 'Cancel'
              },
              {
                text: 'Save',
                handler: data => {
                  let lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };
                  console.log(lastLocation);
                  this.storage.set('lastLocation', lastLocation).then(() => {
                    this.showToast('Location saved');
                  });
                }
              }
            ]
          });
          alert.present();

        });
      },
      (error) => {
        this.loading.dismiss().then(() => {
          this.showToast('Location not found. Please enable your GPS!');

          console.log(error);
        });
      }
    )
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }


  addMarker(position, content) {

    var self=this;
    this.removeMarker();
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position,
      draggable: true,
    });
    google.maps.event.addListener(marker, 'dragend', function(evt){
          //content: '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>'
          let geocoder = new google.maps.Geocoder;
          let latlng = {lat: evt.latLng.lat(), lng:evt.latLng.lng()};
          geocoder.geocode({'location': latlng}, (results, status) => {
            self.autocomplete.query=results[0].formatted_address;
            self.searchLocation={address:results[0].formatted_address,lat: evt.latLng.lat(),lng:evt.latLng.lng()};  
          });
    });
    google.maps.event.addListener(marker, 'drag', function(evt){
        console.log("marker is being dragged");
    }); 
    this.addInfoWindow(marker, content);
    //Push your newly created marker into the array:
    //this.markers.push(marker);
    //return marker;
  }




  removeMarker(){
    this.clearMarkers();
    this.markers = [];
  }

    // Deletes all markers in the array by removing references to them.
    clearMarkers(){
    this.setMapOnAll(null);
    }


  // Sets the map on all markers in the array.
   setMapOnAll(map) {
    if(this.markers.length){
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    }


  }

  addInfoWindow(marker, content) {
    let self=this;

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
 
  }

}

