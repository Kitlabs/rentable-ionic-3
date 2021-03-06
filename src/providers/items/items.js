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
    ItemsProvider.prototype.getItemDetailWithBookedDates = function (itemId, userId) {
        //{"action":"ItemByDateNew","id":"127","userId":"43"}:return item details plus booked dates
        //{"action":"ItemById","id":"127","userId":"43"} : return item details without booked dates
        var body = {
            action: 'ItemByDateNew',
            id: itemId,
            userId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     *
     */
    ItemsProvider.prototype.getItemDetail = function (itemId, userId) {
        //{"action":"ItemByDateNew","id":"127","userId":"43"}:return item details plus booked dates
        //{"action":"ItemById","id":"127","userId":"43"} : return item details without booked dates
        var body = {
            action: 'ItemById',
            id: itemId,
            userId: userId
        };
        console.log(JSON.stringify(body));
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
     Method to delete post by owner of item
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
      Method to delete I Rent-History item by renter
     */
    ItemsProvider.prototype.deleteIRentHistoryItem = function (userId, itemId) {
        //{"action":"DeleteIRentHistory","UserId":"49","PostId":"171"}
        var body = {
            action: 'DeleteIRentHistory',
            UserId: userId,
            PostId: itemId
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
    ItemsProvider.prototype.getItemsBySearch = function (searchTag, uid, selectedCategory) {
        var body = {
            action: 'ItemByName',
            userId: uid,
            name: searchTag,
            Category: selectedCategory
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
    ItemsProvider.prototype.sendRentalRequest = function (userId, postId, pickUpDate, returnDate, amount, itemOwnerFee, AdminFee, needDelivery, rentableServiceFee, rentalCostWithoutFee) {
        var body = {
            action: 'PostInsertRequest',
            UserId: userId,
            PostId: postId,
            FromDate: pickUpDate,
            ToDate: returnDate,
            Amount: amount,
            itemOwnerFee: itemOwnerFee,
            AdminFee: AdminFee,
            needDelivery: needDelivery,
            rentableServiceFee: rentableServiceFee,
            rentalCostWithoutFee: rentalCostWithoutFee
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
        console.log(JSON.stringify(body));
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
      Api's related to CHAT TABS
      Method to all request on own posted item and request sent to other items
      action:
    */
    ItemsProvider.prototype.getChatListOwn = function (userId) {
        //{"action":"GetRequestByvendorIOwnForChat", "UserId":"34"} : I Own-Old
        //{"action":"UserListIOwn","UserId":"41"} :New
        var body = {
            action: 'UserListIOwn',
            UserId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method to get all request plus messages sent to other items
      action:
    */
    ItemsProvider.prototype.getChatListRent = function (userId) {
        //{"action":"GetRequestByvendorIRentForChat", "UserId":"35"}: I Rent
        //{"action":"UserListIRent","UserId":"41"} : New
        var body = {
            action: 'UserListIRent',
            UserId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     *
     * @param fromId hold the id of requester
     * @param toId hold the id of item owner
     * @param postId hold the id of item
     */
    ItemsProvider.prototype.insertChatList = function (fromId, toId, postId) {
        //{"action":"UserListIInsert","FromId":"41","ToId":"42","PostId":"125"}
        var body = {
            action: 'UserListInsert',
            FromId: fromId,
            ToId: toId,
            PostId: postId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     *
     * @param fromId hold the id of requester
     * @param toId hold the id of item owner
     * @param postId hold the id of item
     */
    ItemsProvider.prototype.deleteChatList = function (fromId, toId, postId) {
        var body = {
            action: 'UserListDelete',
            FromId: fromId,
            ToId: toId,
            PostId: postId
        };
        console.log(JSON.stringify(body));
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
       Method to get pick up and return rating given by renter
      */
    ItemsProvider.prototype.getPickUpAndReturnRating = function (requesterId, requestedItemId) {
        //{"action":"GetPickUpRating","UserId":"49","PostId":"155"}  
        var body = {
            action: 'GetPickUpRating',
            UserId: requesterId,
            PostId: requestedItemId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
       Method to get claim details
      */
    ItemsProvider.prototype.getClaimDetails = function (id, requestedItemId) {
        //{"action":"ClaimByVendor","UserId":"45","PostId":"182"}
        var body = {
            action: 'ClaimByVendor',
            UserId: id,
            PostId: requestedItemId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
     Method to make claim response
     claim status must be Yes/No (not yes/no)
    */
    ItemsProvider.prototype.replyToClaim = function (userId, itemId, status) {
        //{"action":"ClaimStatus","UserId":"45","PostId":"182","ClaimStatus":"Yes"}
        var body;
        if (status = "Yes") {
            body = {
                action: 'ClaimStatus',
                UserId: userId,
                PostId: itemId,
                ClaimStatus: status,
                Status: 'Returned',
                FinalDone: 'Yes'
            };
        }
        else {
            //if status no
            body = {
                action: 'ClaimStatus',
                UserId: userId,
                PostId: itemId,
                ClaimStatus: status
            };
        }
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
    /**
     * Accept reject pick up rating by item owner
     */
    ItemsProvider.prototype.acceptRejectPickUpRating = function (userId, postId, status) {
        //Accepted= {"action":"AcceptRejectPickUpRating", "UserId":"49","PostId":"155","PickupStatus":"Accepted"},
        //Rejected= {"action":"AcceptRejectPickUpRating", "UserId":"49","PostId":"155","PickupStatus":"Rejected","Status":"Rented"}.
        var body;
        switch (status) {
            case 0:
                body = {
                    action: "AcceptRejectPickUpRating",
                    UserId: userId,
                    PostId: postId,
                    PickupStatus: "Accepted",
                    Status: "PickedUp"
                };
                break;
            case 1:
                body = {
                    action: "AcceptRejectPickUpRating",
                    UserId: userId,
                    PostId: postId,
                    PickupStatus: "Rejected",
                    Status: "Rented"
                };
                break;
            default:
                break;
        }
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * accept reject pick up rating and do payment
     */
    ItemsProvider.prototype.acceptPickUpRequest = function (userId, postId, status) {
        var body = {
            action: "AcceptRejectPickUpRating",
            UserId: userId,
            PostId: postId,
            PickupStatus: "Accepted",
            Status: "PickedUp"
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
       * Accept reject return rating by item owner
       */
    ItemsProvider.prototype.acceptRejectReturnRating = function (userId, postId, status, claimBondAmount, totalAmountBond, claimComment) {
        //Accepted= {"action":"AcceptRejectReturnedRating", "UserId":"49","PostId":"155","ReturnStatus":"Accepted"}
        //Rejected= {"action":"AcceptRejectReturnedRating", "UserId":"49","PostId":"155","ReturnStatus":"Rejected","ClaimBondAmount":"50","TotalAmountBond":"100","ClaimComment":"Tuneya"}
        console.log(status);
        var body;
        switch (status) {
            case 0:
                body = {
                    action: "AcceptRejectReturnedRating",
                    UserId: userId,
                    PostId: postId,
                    ReturnStatus: "Accepted",
                    Status: "Returned"
                };
                break;
            case 1:
                body = {
                    action: "AcceptRejectReturnedRating",
                    UserId: userId,
                    PostId: postId,
                    ReturnStatus: "Rejected",
                    Status: "PickedUp",
                };
                break;
            case 2:
                body = {
                    action: "ItemClaimByVendor",
                    UserId: userId,
                    PostId: postId,
                    ReturnStatus: "Rejected",
                    //Status:"Rented",
                    ClaimBondAmount: claimBondAmount,
                    TotalAmountBond: totalAmountBond,
                    ClaimComment: claimComment,
                };
                break;
            case 3:
                body = {
                    action: "AcceptRejectReturnedRating",
                    UserId: userId,
                    PostId: postId,
                    ReturnStatus: "Accepted",
                    Status: "Returned",
                    FinalDone: "Yes"
                };
                break;
            default:
                break;
        }
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
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to get own available  item old : mohit
    */
    ItemsProvider.prototype.getIOwnAvailableItems = function (userId, status) {
        //{"action":"GetItemsByVendorIownAvailable","vendorId":"49","status":"IownAvailable"}
        var body = {
            action: 'GetItemsByVendorIownAvailable',
            vendorId: userId,
            Status: status
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to get own available  item old : heena
    */
    ItemsProvider.prototype.getIOwnAvailableItemsSecond = function (userId, status) {
        //{"action":"getavailableposts","vendorId":"49"}
        var body = {
            action: 'getavailableposts',
            vendorId: userId,
        };
        console.log(JSON.stringify(body));
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
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
  I Rent->current
  */
    ItemsProvider.prototype.getIRentHistoryItems = function (userId) {
        //{"action":"GetIRentHistory","UserId":"49"}
        var body = {
            action: 'GetIRentHistory',
            UserId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to calulate total rental request
    */
    ItemsProvider.prototype.getTotalRentalCost = function (cost, Isdelivery, DeliveryPickUpFee) {
        //{"action":"CalculateGST", "Cost":100,"IsdeliveryFee":1,"DeliveryPickUpFee":20}
        var body = {
            action: 'CalculateGST',
            Cost: cost,
            IsdeliveryFee: Isdelivery,
            DeliveryPickUpFee: DeliveryPickUpFee
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method used to cancel rental request
    */
    ItemsProvider.prototype.cancelItemRequest = function (renterId, postId, userType) {
        //{"action":"RequestStatusChange", "UserId":"3","PostId":"30","Status":"Cancel"}
        console.log("Cancel rental reqeust" + renterId);
        var body = {
            action: 'RequestStatusChange',
            UserId: renterId,
            PostId: postId,
            CancelledBy: userType,
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
            Status: 'PickedUpPending',
            UserId: userId,
            PostId: postId,
            PickupComment: pickupComment,
            PickUpUserAgree: userAgree,
            PickupRating: pickupRating
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method to send returned item to owner
    */
    ItemsProvider.prototype.sendReturnedRequest = function (userId, itemId, returnComment, returnRating, bothPartyAgree, agreeWithRating) {
        //{"action":"RequestStatusChangeReturn", "UserId":"5","PostId":"35","Status":"Returned","ReturnComment":"sdffds","ReturnRating":"2"}
        var body = {
            action: 'RequestStatusChangeReturn',
            Status: 'ReturnedPending',
            UserId: userId,
            PostId: itemId,
            ReturnComment: returnComment,
            ReturnRating: returnRating,
            ReturnBothPartyAgree: bothPartyAgree,
            ReturnAgreeWithRating: agreeWithRating,
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Method to get filter the data based on filter option
    */
    ItemsProvider.prototype.getFilterData = function (userId, Category, PostedWithin, PriceFrom, PriceTo, Lat, Long, Range, SortBy) {
        //{{"action":"GetItemsByFilters", "Category":"Electronics", "PostedWithin":"The last 24 hrs",
        //"PriceFrom":"05","PriceTo":"280","Lat":"38.682437","Long":"-77.3646313",
        //"Range":"1500","userId":"01","SortBy":"Closest first"}
        var body = {
            action: 'GetItemsByFilters',
            UserId: userId,
            Category: Category,
            PostedWithin: PostedWithin,
            PriceFrom: PriceFrom,
            PriceTo: PriceTo,
            Lat: Lat,
            Long: Long,
            Range: Range,
            SortBy: SortBy
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