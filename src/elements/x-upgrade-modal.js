import XElement from '/libraries/x-element/x-element.js';
import MixinModal from '/elements/mixin-modal/mixin-modal.js';
import MixinRedux from '/secure-elements/mixin-redux/mixin-redux.js';
import XAccount from '/elements/x-accounts/x-account.js';
import needsUpgrade$ from '../selectors/needsUpgrade$.js';
import { upgradeCanceled } from '/elements/x-accounts/accounts-redux.js';

export default class XUpgradeModal extends MixinRedux(MixinModal(XElement)) {
    html() {
        return `
            <div class="modal-header">
                <i x-modal-close class="material-icons">close</i>
                <h2>Please Upgrade your Account</h2>
            </div>
            <div class="modal-body center">
                <x-account></x-account>
                <div class="spacing-bottom spacing-top -left">
                    To protect your funds, please upgrade your account to a safe account. You will get a backup and
                    a nice green checkmark.
                </div>
                <button>Upgrade now</button>
            </div>
        `
    }

    children() {
        return [ XAccount ];
    }

    onHide() {
        this.actions.upgradeCanceled(this.properties.account.address);
    }

    static get actions() {
        return {
            upgradeCanceled
        }
    }

    static mapStateToProps(state) {
        return {
            account: needsUpgrade$(state)
        }
    }

    _onPropertiesChanged(changes) {
        if (changes.account) {
            this.$account.account = changes.account;
            this.show();
        }
    }

    listeners() {
        return {
            'click button': _ => this.fire('x-upgrade-account', this.properties.account.address)
        }
    }
}