/**
 *
 * @param name
 * @param mainComponent
 * @param loginNeeded
 * @param file
 * @returns {{app: undefined, appMainComponent: *, appName: string, appLoginNeeded: *, start: (function(): *), defineBaseClass: (function(): void), launchApp: launchApp}}
 */
function muzkatApp(name, mainComponent, loginNeeded, file) {

    return {
        app: undefined,
        appName: 'mzk',
        appMainComponent: mainComponent,
        appLoginNeeded: loginNeeded,

        /**
         *
         * @returns {*}
         */
        launchApp: function () {
            if (typeof window.Ext !== 'undefined') {
                //this.defineBaseClass(); // TODO async + singleton Api
                this.app = this.start();
                return this.app;
            } else {
                alert('Framework is not available. Application cannot be startet.');
                return false;
            }
        },

        /**
         *
         */
        defineBaseClass: function () {
            var me = this;
            return Ext.define(me.appName + '.MainApplication', {
                extend: 'Ext.container.Container',
                alias: 'widget.' + me.appName + 'Main',
                layout: 'fit',

                requestLogin: me.appLoginNeeded,
                mainComponent: me.appMainComponent,
                appName: me.appName,

                fileArray: [],

                initComponent: function () {
                    var items = [];
                    if (this.requestLogin) {
                        items = [{
                            xtype: 'container',
                            html: 'login required...'
                        }]
                    } else {
                        if (this.mainComponent !== false) {
                            items = [{xtype: this.mainComponent}]
                        } else {
                            this.fileArray.push(file.url);
                            items = [{
                                xtype: 'button',
                                layout: 'fit',
                                text: 'Muzkat Frame was loaded without module OR supplied with a module url.'
                            }];
                        }
                    }
                    this.items = items;
                    this.callParent(arguments);
                },

                changeComponent: function () {
                    var me = this;
                    this.loadScripts(this.fileArray).then(function (success) {
                        Ext.defer(function () {
                            me.removeAll();
                            me.add({xtype: file.cmp});
                        }, 300);
                    });
                },

                loadScripts: function (jsCssArray) {
                    var loadingArray = [], me = this;
                    return new Ext.Promise(function (resolve, reject) {
                        Ext.Array.each(jsCssArray, function (url) {
                            loadingArray.push(me.loadScript(url));
                        });

                        Ext.Promise.all(loadingArray).then(function (success) {
                                console.log('artefacts were loaded successfully');
                                resolve('');
                            },
                            function (error) {
                                reject('Error during artefact loading...');
                            });
                    });
                },

                loadScript: function (url) {
                    return new Ext.Promise(function (resolve, reject) {
                        Ext.Loader.loadScript({
                            url: url,
                            onLoad: function () {
                                console.log(url + ' was loaded successfully');
                                resolve('Loading was successful');
                            },
                            onError: function (error) {
                                reject('Loading was not successful for: ' + url);
                            }
                        });
                    });
                }
            });
        },

        /**
         *
         * @returns {*}
         */
        start: function () {
            var me = this;
            return Ext.application({
                name: 'mzk',
                mainView: {xtype: me.appMainComponent},
                launch: function () {
                    Ext.log('Mzk wrapper booted!');
                }
            });
        }
    };
}

module.exports = muzkatApp;