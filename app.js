'use strict';
/**
 * ExtJS Prototype kit by muzkat
 *
 * @param name
 * @param mainComponent
 * @param loginNeeded
 * @returns {{appDescriptor: {name: *, mainComponent: *, loginNeeded: *}, app: undefined, launchApp: launchApp, defineBaseClass: defineBaseClass, start: start}}
 */
function muzkatApp(name, mainComponent, loginNeeded) {
    /**
     * app definiton
     * @type {{name: *, mainComponent: *, loginNeeded: *}}
     */
    var appDescriptor = {
        name: name,
        mainComponent: mainComponent,
        loginNeeded: loginNeeded
    };

    /**
     * application itself
     * @type {{appDescriptor: {name: *, mainComponent: *, loginNeeded: *}, app: undefined, launchApp: launchApp, defineBaseClass: defineBaseClass, start: start}}
     */
    var app = {
        appDescriptor: appDescriptor,
        app: undefined,
        /**
         *
         * @param descriptor
         */
        launchApp: function (descriptor) {
            this.appDescriptor = descriptor;
            this.defineBaseClass(appDescriptor.name, appDescriptor.mainComponent, appDescriptor.loginNeeded);
            this.start();
        },
        /**
         *
         * @param name
         * @param mainComponent
         * @param loginNeeded
         */
        defineBaseClass: function (name, mainComponent, loginNeeded) {
            Ext.define(name + '.MainApplication', {
                extend: 'Ext.container.Container',
                layout: 'fit',

                requestLogin: loginNeeded,
                mainComponent: mainComponent,

                initComponent: function () {
                    var items = [];
                    if (this.requestLogin) {
                        items = [{
                            xtype: 'container',
                            html: 'login required...'
                        }]
                    } else {
                        items = [{xtype: this.mainComponent}]
                    }
                    this.items = items;
                    this.callParent(arguments);
                }
            });
        },
        /**
         *
         */
        start: function () {
            var me = this;
            this.app = Ext.application({
                name: me.appDescriptor.name,
                mainView: me.appDescriptor.name + '.MainApplication',
                launch: function () {
                    Ext.log(me.appDescriptor.name + ' booted!');
                }
            });
        }
    };
    return app;
}

module.exports = muzkatApp;