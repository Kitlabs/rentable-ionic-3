var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';
/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ItemsProvider = /** @class */ (function () {
    function ItemsProvider(http, appsetting) {
        this.http = http;
        this.appsetting = appsetting;
        this.apiUrl = this.appsetting.getApiURL();
        this.http = http;
        console.log('Hello ItemsProvider Provider');
    }
    ItemsProvider.prototype.Getitems = function () {
        return this.http.get(this.apiUrl + 'item/index');
    };
    ItemsProvider.prototype.addfavourity = function (itemnumber) {
        return this.http.post(this.apiUrl + 'item/addfavourity', { item: itemnumber });
    };
    ItemsProvider.prototype.Alertsave = function (alerttitle, category, location, date, fromprice, toprice, distance, within, sortby) {
        return this.http.post(this.apiUrl + 'item/alertsave', { alerttitle: alerttitle, category: category, location: location, date: date, fromprice: fromprice, toprice: toprice, distance: distance, within: within, sortby: sortby });
    };
    ItemsProvider.prototype.Searchsave = function (category, location, date, fromprice, toprice, distance, within, sortby) {
        return this.http.post(this.apiUrl + 'item/searchsave', { category: category, location: location, date: date, fromprice: fromprice, toprice: toprice, distance: distance, within: within, sortby: sortby });
    };
    ItemsProvider.prototype.Setfavourity = function (uuid) {
        return this.http.post(this.apiUrl + 'item/setfavouirty', { uid: uuid });
    };
    ItemsProvider.prototype.Getfavourity = function (uuid) {
        return this.http.post(this.apiUrl + 'item/showfavouirty', { uid: uuid });
    };
    ItemsProvider.prototype.Getownavailable = function (uuid) {
        return this.http.post(this.apiUrl + 'item/ownavailable', { uid: uuid });
    };
    ItemsProvider.prototype.Getownrent = function (uuid) {
        return this.http.post(this.apiUrl + 'item/ownrent', { uid: uuid });
    };
    ItemsProvider.prototype.Getrenthistory = function (uuid) {
        return this.http.post(this.apiUrl + 'item/renthistory', { uid: uuid });
    };
    ItemsProvider.prototype.Getrentcurrent = function (uuid) {
        return this.http.post(this.apiUrl + 'item/rentcurrent', { uid: uuid });
    };
    ItemsProvider.prototype.Getchatitems = function (uuid) {
        return this.http.post(this.apiUrl + 'item/chatitem', { uid: uuid });
    };
    ItemsProvider.prototype.Getalerthistory = function (uuid) {
        return this.http.post(this.apiUrl + 'item/alerthistory', { uid: uuid });
    };
    ItemsProvider.prototype.Getoppotunityhistory = function (uuid) {
        return this.http.post(this.apiUrl + 'item/opptunityhistory', { uid: uuid });
    };
    ItemsProvider.prototype.Getcurrentopputunity = function (uuid) {
        return this.http.post(this.apiUrl + 'item/currenopptunity', { uid: uuid });
    };
    ItemsProvider.prototype.Getitemdetail = function (itemuid) {
        return this.http.post(this.apiUrl + 'item/read', { itemId: itemuid });
    };
    ItemsProvider.prototype.SendRental = function (uuid, date, price, itemuid) {
        return this.http.post(this.apiUrl + 'item/sendrental', { uid: uuid, itemnumber: itemuid, date: date, price: price });
    };
    //new api
    ItemsProvider.prototype.getAllItems = function (userId) {
        var body = {
            action: 'ListOfItems',
            userId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
     Get item details
    */
    ItemsProvider.prototype.getItemDetail = function (itemId, userId) {
        var body = {
            action: 'ItemById',
            id: itemId,
            userId: userId
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
     Get list of all items with status
     Not based on userid
    */
    ItemsProvider.prototype.getAllItem = function (userId) {
        var body = {
            action: 'ListOfAllItemsWithStatus',
            status: 'available',
            userId: userId
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
     Get list of item with status based on userId
    */
    ItemsProvider.prototype.getItemsWithStatus = function (userId, status) {
        //{"action":"GetItemsByVendor","userId":"1","status":"available"}
        var body = {
            action: 'GetItemsByVendor',
            vendorId: userId,
            status: status
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Get list of item by category name
    */
    ItemsProvider.prototype.getItemByCategoryName = function (categoryName, userId, status) {
        //{"action":"ListofAllItemsByCategoryAndStatus","userId":"1", "category":"Electronics", "status":"available"}
        var body = {
            action: 'ItemsByCategoryAndStatus',
            category: categoryName,
            userId: userId,
            status: status
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    ItemsProvider.prototype.getNearbyItems = function (userId, lat, lng) {
        //{"action":"NearByItems", "user_lat":"30.709315", "user_lng":"76.690514","userId":"3"}
        var body = {
            action: 'NearByItems',
            user_lat: lat,
            user_lng: lng,
            userId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
     Method to delete post
    */
    ItemsProvider.prototype.deleteItemById = function (postId) {
        var body = {
            action: 'deleteByItemId',
            id: postId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method to add post likes and views
    */
    ItemsProvider.prototype.addItemViewOrLikes = function (itemId, viewOrLikes) {
        /*{"action":"AddPostViewsOrLikes","ViewsOrLikes":"likes","PostId":"1"}*/
        var body = {
            action: 'AddPostViewsOrLikes',
            ViewsOrLikes: viewOrLikes,
            PostId: itemId
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to get all item by search
    */
    ItemsProvider.prototype.getItemsBySearch = function (searchTag, uid) {
        var body = {
            action: 'ItemByName',
            userId: uid,
            name: searchTag
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to add or remove favourite item on bases of
    input:home.ts,details.ts
    */
    ItemsProvider.prototype.addRemoveFavourite = function (uid, postId, favourite) {
        var body = {
            action: 'PostInsertFavourite',
            UserId: uid,
            PostId: postId,
            Favourite: favourite
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to send rental request
    */
    ItemsProvider.prototype.sendRentalRequest = function (userId, postId, pickUpDate, returnDate, amount) {
        var body = {
            action: 'PostInsertRequest',
            UserId: userId,
            PostId: postId,
            FromDate: pickUpDate,
            ToDate: returnDate,
            Amount: amount
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to get favourite list
    */
    ItemsProvider.prototype.getFavouriteList = function (userId) {
        var body = {
            action: 'GetAllFavByUserId',
            UserId: userId,
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to get all rental request by userId
    */
    ItemsProvider.prototype.getRentalRequest = function (userId) {
        var body = {
            action: 'GetRequestByvendor',
            UserId: userId
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
     Method to get single rental request details
    */
    ItemsProvider.prototype.getRentalRequestDetails = function (requesterId, requestedItemId) {
        //{"action":"GetRequestByvendorAndPostId", "UserId":"5", "PostId":"27"}    
        var body = {
            action: 'GetRequestByvendorAndPostId',
            UserId: requesterId,
            PostId: requestedItemId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to reject rental request
    */
    ItemsProvider.prototype.rejectRentalRequest = function (requesterId, requestedItemId, rejReason, isRemove) {
        //{"action":"RejectingRequest", "UserId":"5", "PostId":"8","Reason":"item is broken","IsRemove":"0" }
        var body = {
            action: 'RejectingRequest',
            UserId: requesterId,
            PostId: requestedItemId,
            Reason: rejReason,
            IsRemove: isRemove,
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to accept request
    */
    ItemsProvider.prototype.acceptRentalRequest = function (userId, postId, status) {
        //To accept request
        //{"action":"PostStatusChange", "UserId":"2","PostId":"9","status":"Rented"}
        //To pick up
        //{"action":"PostStatusChangeAccept", "UserId":"4","PostId":"51","Status":"Rented","Reason":"test"}
        var body = {
            action: 'PostStatusChangeAccept',
            UserId: userId,
            PostId: postId,
            Status: status
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to get own rented item
    */
    ItemsProvider.prototype.getIOwnRentedItems = function (userId, status) {
        //{"action":"GetItemsByVendorIownRented","vendorId":"5","status":"IownRented"}
        var body = {
            action: 'GetItemsByVendorIownRented',
            vendorId: userId,
            Status: status
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    I Rent->current
    */
    ItemsProvider.prototype.getIRentCurrentItems = function (userId) {
        //{"action":"IRentCurrent","UserId":"5"}
        var body = {
            action: 'IRentCurrent',
            UserId: userId
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to calulate total rental request
    */
    ItemsProvider.prototype.getTotalRentalCost = function (cost, deliveryCost) {
        //{"action":"CalculateGST", "Cost":120, "DeliveryPickUpFee":20}
        var body = {
            action: 'CalculateGST',
            Cost: cost,
            DeliveryPickUpFee: deliveryCost
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method to cancel the rental request
    */
    ItemsProvider.prototype.cancelItemRequest = function (userId, postId) {
        //{"action":"RequestStatusChange", "UserId":"3","PostId":"30","Status":"Cancel"}
        var body = {
            action: 'RequestStatusChange',
            UserId: userId,
            PostId: postId,
            Status: 'Cancel'
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method to send to pick up request request
    */
    ItemsProvider.prototype.sendPickupRequest = function (userId, postId, pickupComment, userAgree, pickupRating) {
        //{"action":"RequestStatusChange", "UserId":"3","PostId":"30","Status":"PickedUp","PickupComment":"Its Newly itemd sdfsd","UserAgree":"1","PickupRating":"5"}
        var body = {
            action: 'RequestStatusChange',
            Status: 'PickedUp',
            UserId: userId,
            PostId: postId,
            PickupComment: pickupComment,
            UserAgree: userAgree,
            PickupRating: pickupRating
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method to send returned item to owner
    */
    ItemsProvider.prototype.sendReturnedRequest = function (userId, itemId, returnComment, returnRating) {
        //{"action":"RequestStatusChangeReturn", "UserId":"5","PostId":"35","Status":"Returned","ReturnComment":"sdffds","ReturnRating":"2"}
        var body = {
            action: 'RequestStatusChangeReturn',
            Status: 'Returned',
            UserId: userId,
            PostId: itemId,
            ReturnComment: returnComment,
            ReturnRating: returnRating
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    ItemsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AppSetting])
    ], ItemsProvider);
    return ItemsProvider;
}());
export { ItemsProvider };
//# sourceMappingURL=items.js.map