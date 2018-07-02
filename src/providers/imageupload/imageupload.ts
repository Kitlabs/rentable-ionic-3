import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var window: any;
/*
  Generated class for the ImageuploadProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImageuploadProvider {

  constructor(public http: Http) {
    console.log('Hello ImageuploadProvider Provider');
  }

  //Upload picture to the firebase storage
  // uploadToFirebase(imgBlob: any) {
  //   var randomNumber = Math.floor(Math.random() * 256);
  //   console.log('Random number : ' + randomNumber);
  //   return new Promise((resolve, reject) => {
  //     let storageRef = firebase.storage().ref(this.basePath + randomNumber + '.jpg');//Firebase storage main path

  //     let metadata: firebase.storage.UploadMetadata = {
  //       contentType: 'image/jpeg',
  //     };

  //     let uploadTask = storageRef.put(imgBlob, metadata);
  //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //       (snapshot) => {
  //         // upload in progress
  //         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         console.log(progress);
  //       },
  //       (error) => {
  //         // upload failed
  //         console.log(error);
  //         reject(error);
  //       },
  //       () => {
  //         // upload success
  //         let url = uploadTask.snapshot.downloadURL
  //         console.log('Saved picture url', url);
  //         resolve(uploadTask.snapshot);
  //       });
  //   });
  // }

  // saveToDatabase(uploadSnapshot) {
  //   var ref = firebase.database().ref('assets');

  //   return new Promise((resolve, reject) => {

  //     // we will save meta data of image in database
  //     var dataToSave = {
  //       'URL': uploadSnapshot.downloadURL, // url to access file
  //       'name': uploadSnapshot.metadata.name, // name of the file
  //       'lastUpdated': new Date().getTime(),
  //     };

  //     ref.push(dataToSave, (response) => {
  //       resolve(response);
  //     }).catch((error) => {
  //       reject(error);
  //     });
  //   });
  // }

}
