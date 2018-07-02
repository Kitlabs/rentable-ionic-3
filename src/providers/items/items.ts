import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemsProvider {

	apiUrl=this.appsetting.getApiURL();

  constructor(public http: Http,public appsetting: AppSetting) {
  	this.http=http;
    console.log('Hello ItemsProvider Provider');
  }

  public Getitems(){
    return this.http.get(this.apiUrl+'item/index');
  }

  public addfavourity(itemnumber){
    return this.http.post(this.apiUrl+'item/addfavourity', {item: itemnumber});
  }

  public Alertsave(alerttitle, category, location, date, fromprice, toprice, distance, within, sortby){
    return this.http.post(this.apiUrl+'item/alertsave', {alerttitle: alerttitle, category:category, location: location,date:date, fromprice:fromprice, toprice:toprice, distance:distance,within:within, sortby:sortby});
    
  }

  public Searchsave(category, location, date, fromprice, toprice, distance, within, sortby){
    return this.http.post(this.apiUrl+'item/searchsave', {category:category, location: location,date:date, fromprice:fromprice, toprice:toprice, distance:distance,within:within, sortby:sortby});
  }

  public Setfavourity(uuid){
    return this.http.post(this.apiUrl + 'item/setfavouirty',  {uid: uuid});
  }

  public Getfavourity(uuid){
    return this.http.post(this.apiUrl + 'item/showfavouirty',  {uid: uuid});
  }

  public Getownavailable(uuid){
    return this.http.post(this.apiUrl + 'item/ownavailable',  {uid: uuid});
  }

  public Getownrent(uuid){
    return this.http.post(this.apiUrl + 'item/ownrent',  {uid: uuid});
  }

  public Getrenthistory(uuid){
    return this.http.post(this.apiUrl + 'item/renthistory',  {uid: uuid});
  }

  public Getrentcurrent(uuid){
    return this.http.post(this.apiUrl + 'item/rentcurrent',  {uid: uuid});
  }

  public Getchatitems(uuid){
    return this.http.post(this.apiUrl + 'item/chatitem',  {uid: uuid});
  }

  public Getalerthistory(uuid){
    return this.http.post(this.apiUrl + 'item/alerthistory', {uid: uuid});
  }

  public Getoppotunityhistory(uuid){
    return this.http.post(this.apiUrl + 'item/opptunityhistory', {uid: uuid});
  }

  public Getcurrentopputunity(uuid){
    return this.http.post(this.apiUrl + 'item/currenopptunity', {uid: uuid});
  }

  public Getitemdetail(itemuid){
    return this.http.post(this.apiUrl + 'item/read', {itemId: itemuid});
  }

  public SendRental(uuid, date, price, itemuid){
    return this.http.post(this.apiUrl + 'item/sendrental', {uid: uuid, itemnumber: itemuid, date:date, price:price});
  }



  //new api
  public getAllItems(userId){
    
      let body={
        action:'ListOfItems',
        userId:userId
      }

      console.log(JSON.stringify(body));

      return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
   Get item details
  */
  public getItemDetailWithBookedDates(itemId,userId){
    //{"action":"ItemByDateNew","id":"127","userId":"43"}:return item details plus booked dates
    //{"action":"ItemById","id":"127","userId":"43"} : return item details without booked dates
    let body={
      action:'ItemByDateNew',
      id:itemId,
      userId:userId
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /**
   * 
   */
  public getItemDetail(itemId,userId){
    //{"action":"ItemByDateNew","id":"127","userId":"43"}:return item details plus booked dates
    //{"action":"ItemById","id":"127","userId":"43"} : return item details without booked dates
    let body={
      action:'ItemById',
      id:itemId,
      userId:userId
    }
    
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }
  

  /*
   Get list of all items with status
   Not based on userid
  */
  public getAllItem(userId:string){
    
    let body={
      action:'ListOfAllItemsWithStatus',
      status:'available',
      userId:userId
    }

    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
   Get list of item with status based on userId
  */
  public getItemsWithStatus(userId,status){
    //{"action":"GetItemsByVendor","userId":"1","status":"available"}
    let body={  
      action:'GetItemsByVendor',
      vendorId:userId,
      status:status
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
  Get list of item by category name
  */
  public getItemByCategoryName(categoryName,userId,status){
  //{"action":"ListofAllItemsByCategoryAndStatus","userId":"1", "category":"Electronics", "status":"available"}

    let body={
       action:'ItemsByCategoryAndStatus',
       category:categoryName,
       userId:userId,
       status:status
    }
    
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  public getNearbyItems(userId,lat,lng){
    //{"action":"NearByItems", "user_lat":"30.709315", "user_lng":"76.690514","userId":"3"}

    let body={
      action:'NearByItems',
      user_lat:lat,
      user_lng:lng,
      userId:userId
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
   Method to delete post by owner of item
  */
  public deleteItemById(postId){

    let body={
      action:'deleteByItemId',
      id:postId
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
    Method to delete I Rent-History item by renter 
   */
  public deleteIRentHistoryItem(userId,itemId){
    //{"action":"DeleteIRentHistory","UserId":"49","PostId":"171"}
    let body={
      action:'DeleteIRentHistory',
      UserId:userId,
      PostId:itemId
    }
    console.log(JSON.stringify(body));
    
    return this.http.post(this.apiUrl,JSON.stringify(body));

  }


  /*
    Method to add post likes and views
  */
  public addItemViewOrLikes(itemId,viewOrLikes){
    /*{"action":"AddPostViewsOrLikes","ViewsOrLikes":"likes","PostId":"1"}*/
  
    let body={
      action:'AddPostViewsOrLikes',
      ViewsOrLikes:viewOrLikes,
      PostId:itemId
    }
    
    return this.http.post(this.apiUrl,JSON.stringify(body));
  
  }

  /*
  Method to get all item by search
  */
  public getItemsBySearch(searchTag,uid,selectedCategory){

    let body={
      action:'ItemByName',
      userId:uid,
      name:searchTag,
      Category:selectedCategory
    }
     
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /*
  Method to add or remove favourite item on bases of  
  input:home.ts,details.ts
  */
  public addRemoveFavourite(uid,postId,favourite){
    let body={
      action:'PostInsertFavourite',
      UserId:uid,
      PostId:postId,
      Favourite:favourite
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body)); 
  }

  /*
  Method to send rental request
  */
  public sendRentalRequest(userId,postId,pickUpDate,returnDate,amount,itemOwnerFee,AdminFee,needDelivery,rentableServiceFee,rentalCostWithoutFee){

    let body={
      action:'PostInsertRequest',
      UserId:userId,
      PostId:postId,
      FromDate:pickUpDate,
      ToDate:returnDate,
      Amount:amount,
      itemOwnerFee:itemOwnerFee,
      AdminFee:AdminFee,
      needDelivery:needDelivery,
      rentableServiceFee:rentableServiceFee,
      rentalCostWithoutFee:rentalCostWithoutFee
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
  Method to get favourite list 
  */
  public getFavouriteList(userId){
    
    let body={
      action:'GetAllFavByUserId',
      UserId:userId,
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /*
  Method to get all rental request by userId
  */
  public getRentalRequest(userId){
    let body={
      action:'GetRequestByvendor',
      UserId:userId
    }
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }


 
  /*
    Api's related to CHAT TABS
    Method to all request on own posted item and request sent to other items
    action:
  */
  public getChatListOwn(userId){
    //{"action":"GetRequestByvendorIOwnForChat", "UserId":"34"} : I Own-Old
    //{"action":"UserListIOwn","UserId":"41"} :New
    let body={
      action:'UserListIOwn',
      UserId:userId
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
    Method to get all request plus messages sent to other items
    action:
  */
  public getChatListRent(userId){
    //{"action":"GetRequestByvendorIRentForChat", "UserId":"35"}: I Rent
    //{"action":"UserListIRent","UserId":"41"} : New
     let body={
      action:'UserListIRent',
      UserId:userId
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /**
   * 
   * @param fromId hold the id of requester 
   * @param toId hold the id of item owner
   * @param postId hold the id of item
   */
  public insertChatList(fromId,toId,postId){                                                                                                                                               
    //{"action":"UserListIInsert","FromId":"41","ToId":"42","PostId":"125"}
    let body={
      action:'UserListInsert',
      FromId:fromId,
      ToId:toId,
      PostId:postId
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /**
   * 
   * @param fromId hold the id of requester 
   * @param toId hold the id of item owner
   * @param postId hold the id of item
   */
  public deleteChatList(fromId,toId,postId){                                                                                                                                               

    let body={
      action:'UserListDelete',
      FromId:fromId,
      ToId:toId,
      PostId:postId
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }




  /*
   Method to get single rental request details
  */
  public getRentalRequestDetails(requesterId,requestedItemId){
    //{"action":"GetRequestByvendorAndPostId", "UserId":"5", "PostId":"27"}    
    let body={
      action:'GetRequestByvendorAndPostId',
      UserId:requesterId,
      PostId:requestedItemId
    }
    
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }
/*
   Method to get pick up and return rating given by renter
  */
 public getPickUpAndReturnRating(requesterId,requestedItemId){
  //{"action":"GetPickUpRating","UserId":"49","PostId":"155"}  
  let body={
    action:'GetPickUpRating',
    UserId:requesterId,
    PostId:requestedItemId
  }
  
  console.log(JSON.stringify(body));
  return this.http.post(this.apiUrl,JSON.stringify(body));
}

/*
   Method to get claim details 
  */
 public getClaimDetails(id,requestedItemId){
  //{"action":"ClaimByVendor","UserId":"45","PostId":"182"}
  let body={
    action:'ClaimByVendor',
    UserId:id,
    PostId:requestedItemId
  }
  console.log(JSON.stringify(body));
  return this.http.post(this.apiUrl,JSON.stringify(body));
}

  /*
   Method to make claim response
   claim status must be Yes/No (not yes/no) 
  */
 public replyToClaim(userId,itemId,status){
  //{"action":"ClaimStatus","UserId":"45","PostId":"182","ClaimStatus":"Yes"}
  let body;
  if(status= "Yes"){ 
    body={
      action:'ClaimStatus',
      UserId:userId,
      PostId:itemId,
      ClaimStatus:status,
      Status:'Returned',
      FinalDone:'Yes'
    }
  }else{
    //if status no
    body={
      action:'ClaimStatus',
      UserId:userId,
      PostId:itemId,
      ClaimStatus:status
    }
  }
  console.log(JSON.stringify(body));
  return this.http.post(this.apiUrl,JSON.stringify(body));
}



  /*
  Method to reject rental request
  */
  public rejectRentalRequest(requesterId,requestedItemId,rejReason,isRemove){
    //{"action":"RejectingRequest", "UserId":"5", "PostId":"8","Reason":"item is broken","IsRemove":"0" }

    let body={
      action:'RejectingRequest',
      UserId:requesterId,
      PostId:requestedItemId,
      Reason:rejReason,
      IsRemove:isRemove,

    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

   /**
    * Accept reject pick up rating by item owner
    */
   public acceptRejectPickUpRating(userId,postId,status:number){
    //Accepted= {"action":"AcceptRejectPickUpRating", "UserId":"49","PostId":"155","PickupStatus":"Accepted"},
    //Rejected= {"action":"AcceptRejectPickUpRating", "UserId":"49","PostId":"155","PickupStatus":"Rejected","Status":"Rented"}.
    var body;
    switch (status) {
      case 0:
      body={
        action:"AcceptRejectPickUpRating", 
        UserId:userId,
        PostId:postId,
        PickupStatus:"Accepted",
        Status:"PickedUp"
      }
        break;
      case 1:
      body={
        action:"AcceptRejectPickUpRating", 
        UserId:userId,
          PostId:postId,
        PickupStatus:"Rejected",
        Status:"Rented"
       }
        break;
      default:
        break;
    }

    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /**
   * accept reject pick up rating and do payment
   */
  public acceptPickUpRequest(userId,postId,status:number){
   
    let body={
      action:"AcceptRejectPickUpRating", 
      UserId:userId,
      PostId:postId,
      PickupStatus:"Accepted",
      Status:"PickedUp"
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

 /**
    * Accept reject return rating by item owner
    */
   public acceptRejectReturnRating(userId,postId,status:number,claimBondAmount?,totalAmountBond?,claimComment?){
    //Accepted= {"action":"AcceptRejectReturnedRating", "UserId":"49","PostId":"155","ReturnStatus":"Accepted"}
    //Rejected= {"action":"AcceptRejectReturnedRating", "UserId":"49","PostId":"155","ReturnStatus":"Rejected","ClaimBondAmount":"50","TotalAmountBond":"100","ClaimComment":"Tuneya"}
    console.log(status)
    var body;
    switch (status) {
      case 0:
      body={
        action:"AcceptRejectReturnedRating", 
        UserId:userId,
        PostId:postId,
        ReturnStatus:"Accepted",
        Status:"Returned"
        }
        break;
      case 1:
      body={
        action:"AcceptRejectReturnedRating", 
        UserId:userId,
        PostId:postId,
        ReturnStatus:"Rejected",
        Status:"PickedUp",
       }
      break;
      case 2:
      body={
        action:"ItemClaimByVendor", 
        UserId:userId,
        PostId:postId,
        ReturnStatus:"Rejected",
        //Status:"Rented",
        ClaimBondAmount:claimBondAmount,
        TotalAmountBond:totalAmountBond,
        ClaimComment:claimComment,
       }
      break;
      case 3:
      body={
        action:"AcceptRejectReturnedRating", 
        UserId:userId,
        PostId:postId,
        ReturnStatus:"Accepted",
        Status:"Returned",
        FinalDone:"Yes"
        }
        break;  
      default:
        break;
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  
  /*
  Method to accept request
  */
  public acceptRentalRequest(userId,postId,status){

    //To accept request
    //{"action":"PostStatusChange", "UserId":"2","PostId":"9","status":"Rented"}

    //To pick up
    //{"action":"PostStatusChangeAccept", "UserId":"4","PostId":"51","Status":"Rented","Reason":"test"}
    let body={
        action:'PostStatusChangeAccept',
        UserId:userId,
        PostId:postId,
        Status:status
    }
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /*
  Method to get own rented item
  */
  public getIOwnRentedItems(userId,status){
    //{"action":"GetItemsByVendorIownRented","vendorId":"5","status":"IownRented"}
      let body={
        action:'GetItemsByVendorIownRented',
        vendorId:userId,
        Status:status
      }

      console.log(JSON.stringify(body));
      return this.http.post(this.apiUrl,JSON.stringify(body));
  }
  /*
  Method to get own available  item old : mohit
  */
 public getIOwnAvailableItems(userId,status){
  //{"action":"GetItemsByVendorIownAvailable","vendorId":"49","status":"IownAvailable"}
    let body={
      action:'GetItemsByVendorIownAvailable',
      vendorId:userId,
      Status:status
    }
    
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
}

  /*
  Method to get own available  item old : heena
  */
 public getIOwnAvailableItemsSecond(userId,status){
  //{"action":"getavailableposts","vendorId":"49"}
    let body={
      action:'getavailableposts',
      vendorId:userId,
    }
    
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
}


  /*
  I Rent->current
  */
  public getIRentCurrentItems(userId){
    //{"action":"IRentCurrent","UserId":"5"}
    let body={
      action:'IRentCurrent',
      UserId:userId
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

    /*
  I Rent->current
  */
 public getIRentHistoryItems(userId){
    //{"action":"GetIRentHistory","UserId":"49"}
    let body={
      action:'GetIRentHistory',
      UserId:userId
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
}

  /*
  Method to calulate total rental request
  */
  public getTotalRentalCost(cost,Isdelivery,DeliveryPickUpFee){
    //{"action":"CalculateGST", "Cost":100,"IsdeliveryFee":1,"DeliveryPickUpFee":20}
      let body={
        action:'CalculateGST',
        Cost:cost,
        IsdeliveryFee:Isdelivery,
        DeliveryPickUpFee:DeliveryPickUpFee
      }

      console.log(JSON.stringify(body));
      return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /*
    Method used to cancel rental request
  */
  public cancelItemRequest(renterId,postId,userType){
    //{"action":"RequestStatusChange", "UserId":"3","PostId":"30","Status":"Cancel"}
    console.log("Cancel rental reqeust"+renterId);
    let body={
        action:'RequestStatusChange',
        UserId:renterId,
        PostId:postId,
        CancelledBy:userType,
        Status:'Cancel'
      }
      console.log(JSON.stringify(body));
      return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /*
    Method to send to pick up request request
  */
  public sendPickupRequest(userId,postId,pickupComment,userAgree,pickupRating){
    //{"action":"RequestStatusChange", "UserId":"3","PostId":"30","Status":"PickedUp","PickupComment":"Its Newly itemd sdfsd","UserAgree":"1","PickupRating":"5"}
    let body={
        action:'RequestStatusChange',
        Status:'PickedUpPending',
        UserId:userId,
        PostId:postId,
        PickupComment:pickupComment,
        PickUpUserAgree:userAgree,
        PickupRating:pickupRating
      }
      console.log(JSON.stringify(body));
      return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
    Method to send returned item to owner
  */
  public sendReturnedRequest(userId,itemId,returnComment,returnRating,bothPartyAgree,agreeWithRating){
    //{"action":"RequestStatusChangeReturn", "UserId":"5","PostId":"35","Status":"Returned","ReturnComment":"sdffds","ReturnRating":"2"}
    
    let body={  
        action:'RequestStatusChangeReturn',
        Status:'ReturnedPending',
        UserId:userId,
        PostId:itemId,
        ReturnComment:returnComment,
        ReturnRating:returnRating,
        ReturnBothPartyAgree:bothPartyAgree,
        ReturnAgreeWithRating:agreeWithRating,
      }
      
      console.log(JSON.stringify(body));
      return this.http.post(this.apiUrl,JSON.stringify(body));

  }

  /* 
    Method to get filter the data based on filter option 
  */
 public getFilterData(userId,Category,PostedWithin,PriceFrom,PriceTo,Lat,Long,Range,SortBy){
  //{{"action":"GetItemsByFilters", "Category":"Electronics", "PostedWithin":"The last 24 hrs",
  //"PriceFrom":"05","PriceTo":"280","Lat":"38.682437","Long":"-77.3646313",
  //"Range":"1500","userId":"01","SortBy":"Closest first"}
  
   
  
  let body={  
      action:'GetItemsByFilters',
      UserId:userId,
      Category:Category,
      PostedWithin:PostedWithin,
      PriceFrom:PriceFrom,
      PriceTo:PriceTo,
      Lat:Lat,
      Long:Long,
      Range:Range,
      SortBy:SortBy
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));

}





}
