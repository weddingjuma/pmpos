import {appconfig} from './config';
import configuration from 'configuration';
import $ from 'jquery';
window.jQuery = $;
require('ms-signalr-client');

var config = appconfig();

const serverUrl = config.SIGNALRserv;

export default class {
    static connect(callback) {
        var connection = $.hubConnection(serverUrl);
        var proxy = connection.createHubProxy('default');

        // receives broadcast messages from a hub function, called "broadcastMessage"
        proxy.on('update', function (message) {
            console.log(message);
            if (callback) callback(message);
        });

        // atempt connection, and handle errors
        connection.start({ jsonp: true })
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
    }
}