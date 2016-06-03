import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Ticket } from '../../api/tickets.js';

import template from './kiosk.html';

class KioskController {
    constructor($scope) {
        $scope.viewModel(this);

        this.hideCompleted = false;

        this.helpers({
            tickets() {
                return Ticket.find({}, {
                    sort: {
                        createdAt: -1
                    }
                })
            },
            currentUser() {
                return Meteor.user()
            }
        })
    }

    addTicket(ticket) {
        try {
            // Set origin
            const origin = 'A'

            // Check if destination is correct
            const destination = (function() {
                if (["B", "C", "D", "E"].indexOf(ticket.destination) >= 0) {
                    return ticket.destination
                } else {
                    throw false
                }
            })()

            // Set returning option
            const returning = ticket.returning == null ? false : ticket.returning

            // Set ticket count
            const count = (function(){
                const val = parseInt(ticket.count)
                if (val < 1) {
                    throw false
                } else if (Number.isNaN(val)) {
                    throw false
                } else {
                    return val
                }
            })()

            Meteor.call('ticket.insert', origin, destination, returning, count, (e) => {
                if (e) {
                    console.log(e)
                    $('#errorModal').modal()
                }
            })
        } catch (e) {
            console.log(`Exception is ${e.message}`)
            $('#errorModal').modal()
        }
    }

    removeTicket(ticket) {
         Meteor.call('ticket.remove', ticket._id)
    }
}

export default angular.module('kiosk', [
    angularMeteor
])
.component('kiosk', {
    templateUrl: 'imports/components/kiosk/kiosk.html',
    controller: ['$scope', KioskController]
});
