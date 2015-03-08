import $ from 'common/utils/$';
import Identity from 'common/modules/identity/forms';
import Formstack from 'common/modules/identity/formstack';
import FormstackIframe from 'common/modules/identity/formstack-iframe';
import FormstackEmbedIframe from 'common/modules/identity/formstack-iframe-embed';
import PasswordStrength from 'common/modules/identity/password-strength';
import ValidationEmail from 'common/modules/identity/validation-email';
import Id from 'common/modules/identity/api';
import AccountProfile from 'common/modules/identity/account-profile';
import UserAdTargeting from 'common/modules/commercial/user-ad-targeting';
import UserAvatars from 'common/modules/discussion/user-avatars';
import mediator from 'common/utils/mediator';
import Tabs from 'common/modules/ui/tabs';

var modules = {
        idInit: function(config) {
            Id.init(config);
            // Used to show elements that need signin. Use .sign-in-required
            if (Id.isUserLoggedIn()) {
                document.documentElement.className = document.documentElement.className.replace(/\bid--signed-out\b/, 'id--signed-in');
            }
        },
        initFormstack: function() {
            mediator.on('page:identity:ready', function(config) {
                var attr = 'data-formstack-id';
                $('[' + attr + ']').each(function(el) {
                    var id = el.getAttribute(attr),
                        isEmbed = el.className.match(/\bformstack-embed\b/);

                    if (isEmbed) {
                        new FormstackEmbedIframe(el, id, config).init();
                    } else {
                        new Formstack(el, id, config).init();
                    }

                });

                // Load old js if necessary
                $('.js-formstack-iframe').each(function(el) {
                    new FormstackIframe(el, config).init();
                });
            });
        },
        forgottenEmail: function() {
            mediator.on('page:identity:ready', function(config) {
                Identity.forgottenEmail(config);
            });
        },
        forgottenPassword: function() {
            mediator.on('page:identity:ready', function(config) {
                Identity.forgottenPassword(config);
            });
        },
        passwordStrength: function() {
            mediator.on('page:identity:ready', function(config) {
                $('.js-password-strength').each(function(el) {
                    new PasswordStrength(el, config).init();
                });
            });
        },
        passwordToggle: function() {
            mediator.on('page:identity:ready', function(config) {
                Identity.passwordToggle(config);
            });
        },
        userAdTargeting: function() {
            mediator.on('page:identity:ready', function() {
                UserAdTargeting.requestUserSegmentsFromId();
            });
        },
        userAvatars: function() {
            mediator.on('page:identity:ready', function() {
                UserAvatars.init();
            });
        },
        validationEmail: function() {
            mediator.on('page:identity:ready', function() {
                ValidationEmail.init();
            });
        },

        tabs: function() {
            var tabs = new Tabs();
            mediator.on('page:identity:ready', function() {
                tabs.init();
            });
        },

        accountProfile: function() {
            var accountProfile = new AccountProfile();
            mediator.on('page:identity:ready', function() {
                accountProfile.init();
            });
        }
    },
    ready = function(config) {
        modules.idInit(config);
        modules.initFormstack();
        modules.forgottenEmail();
        modules.forgottenPassword();
        modules.passwordStrength();
        modules.passwordToggle();
        modules.userAdTargeting();
        modules.userAvatars();
        modules.validationEmail();
        modules.tabs();
        modules.accountProfile();

        mediator.emit('page:identity:ready', config);
    };

export default {
    init: ready
};
