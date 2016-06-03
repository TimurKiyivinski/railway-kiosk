import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ticket = new Mongo.Collection('tickets');

Meteor.methods({
    'ticket.insert' (origin, destination, returning, count) {
        check(origin, String)
        check(destination, String)
        check(returning, Boolean)
        check(count, Number)

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized')
        }

        Ticket.insert({
            origin: origin,
            destination: destination,
            returning: returning,
            count: count,
            createdAt: new Date(),
            owner: Meteor.userId(),
        })
    },
    'ticket.remove' (ticketId) {
        check(ticketId, String)
        Ticket.remove(ticketId)
    }
})
