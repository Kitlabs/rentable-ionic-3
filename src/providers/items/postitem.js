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
var Postitemprovider = /** @class */ (function () {
    function Postitemprovider(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.apiUrl = this.appSettings.getApiURL();
        this.http = http;
        console.log('Hello PaymentProvider Provider');
    }
    Postitemprovider.prototype.Itemsave = function (dailyprice, distance, deliver, categoryid, itemtitle, conditionmark, itemdetails, imagurl, ownerid, favority) {
        console.log(categoryid + " categoryid");
        return this.http.post(this.apiUrl + 'item/create', {
            title: itemtitle,
            price: dailyprice,
            category: categoryid,
            imgUrl: imagurl,
            condition: conditionmark,
            favority: favority,
            owner: ownerid,
            distance: distance,
            description: itemdetails
        });
    };
    Postitemprovider.prototype.rejectitem = function (rejectcondition, isremove) {
        return this.http.post(this.apiUrl + 'item/reject', { rejectcondtion: rejectcondition, isremove: isremove });
    };
    /*
    Method used to post new item
    */
    Postitemprovider.prototype.postItem = function (post) {
        console.log("post itme image");
        var body = {
            image: post.image,
            action: "ItemSubmit",
            userId: post.userId,
            category: post.category,
            title: post.itemtitle,
            details: post.conditiontitle,
            currentcondition: post.conditionmark,
            dailyrentalPrice: post.dailyPrice,
            weeklyrentalPrice: post.weeklyprice,
            deliveryfee: post.deliveryOrPickUpFee,
            delivery: post.deliver,
            distance: post.distance,
            lat: post.lat,
            lng: post.lng,
            status: "available"
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    Postitemprovider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AppSetting])
    ], Postitemprovider);
    return Postitemprovider;
}());
export { Postitemprovider };
//# sourceMappingURL=postitem.js.map