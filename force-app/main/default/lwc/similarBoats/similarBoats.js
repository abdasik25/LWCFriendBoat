import {LightningElement, api, wire} from 'lwc';

import {NavigationMixin} from 'lightning/navigation'

// import getSimilarBoats

import getSimilarBoats from '@salesforce/apex/BoatDataService.getSimilarBoats';

export default class SimilarBoats extends NavigationMixin(LightningElement) {
    relatedBoats;
    boatId;
    error;
    @api

    get recordId() {
        return this.boatId;

    }

    set recordId(value) {
        this.setAttribute('boatId', value);
        this.boatId = value;
    }

    @api similarBy;
    @wire(getSimilarBoats, {boatId: '$boatId', similarBy: '$similarBy'})

    similarBoats({error, data}) {
        if (data) {
            this.relatedBoats = data;
            this.error = undefined;
        } else if (error) {
            this.relatedBoats = undefined;
            this.error = error;

        }
    }

    get getTitle() {
        return 'Similar boats by ' + this.similarBy;
    }

    get noBoats() {
        return !(this.relatedBoats && this.relatedBoats.length > 0);
    }


    // Navigate to record page

    openBoatDetailPage(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.boatId,
                objectApiName: BOAT_OBJECT,
                actionName: 'view'
            },
        });

    }

}