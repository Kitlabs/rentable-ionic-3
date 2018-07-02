import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';

@Injectable()
export class Postitemprovider {

  apiUrl = this.appSettings.getApiURL();

  constructor(public http: Http, public appSettings: AppSetting) {
  	this.http=http;
    console.log('Hello PaymentProvider Provider');
  }

  public Itemsave(
      dailyprice,
      distance,
      deliver,
      categoryid,
      itemtitle,
      conditionmark,
      itemdetails, 
      imagurl,
      ownerid,
      favority
    ){
      console.log(categoryid + " categoryid");
      return this.http.post(this.apiUrl+'item/create', 
        {
          title: itemtitle,
          price: dailyprice,
          category: categoryid,
          imgUrl:imagurl,
          condition: conditionmark,
          favority:favority,
          owner: ownerid,
          distance:distance,
          description:itemdetails
        });
    }

  public rejectitem(rejectcondition, isremove){
    return this.http.post(this.apiUrl + 'item/reject', {rejectcondtion: rejectcondition, isremove: isremove});
  }

  /*
  Method used to post new item
  */
  public postItem(post:any){
    console.log("post itme image");                                                                  
    let body={
        image:post.image,
        action:"ItemSubmit",
        userId:post.userId,
        category:post.category,
        title:post.itemtitle,
        details:post.conditiontitle,
        currentcondition:post.conditionmark,
        dailyrentalPrice:post.dailyPrice,
        deliveryfee:post.deliveryOrPickUpFee,
        delivery:post.deliver,
        distance:post.distance,
        securityDeposit:post.securityDeposit,
        lat:post.lat,
        lng:post.lng,
        status:"available"
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }
  
  updatePostDetail(post:any){

    let body={
      image:post.image,
      action:"ItemUpdate",
      userId:post.userId,
      category:post.category,
      title:post.itemtitle,
      details:post.conditiontitle,
      currentcondition:post.conditionmark,
      dailyrentalPrice:post.dailyPrice,
      deliveryfee:post.deliveryOrPickUpFee,
      delivery:post.deliver,
      distance:post.distance,
      securityDeposit:post.securityDeposit,
      PostId:post.PostId
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  getPostDetail(postId){

    let body={
      action:"GetItemsById",
      PostId:postId
    }
  
    return this.http.post(this.apiUrl,JSON.stringify(body));
  
  }

    //  let body={
    //   image:JSON.stringify(data),
    //   action:"ItemSubmit",
    //   userId:"1",
    //   category:"12",
    //   title:"Here where there",
    //   details:"detailss",
    //   currentcondition:"4",
    //   valuePrice:"4521",
    //   dailyrentalPrice:"112",
    //   weeklyrentalPrice:"62",
    //   delivery:"54",
    //   deliveryfee:"20",
    //   distance:"0",
    //   status:"active",
    // }

}
