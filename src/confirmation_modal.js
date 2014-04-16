// ConfirmationModal
// ---------------------------------
//
// A simple modal for simple confirmation dialogs

BackboneBootstrapModals.ConfirmationModal = BackboneBootstrapModals.BaseModal.extend({

  confirmationEvents: {
    'click #confirmation-confirm-btn': 'onClickConfirm'
  },

  // Default set of BaseModal options for use as ConfirmationModal
  headerViewOptions: function() {
    return {
      label: _.result(this, 'label'),
      labelId: 'myModalLabel',
      showClose: true,
    };
  },
  bodyViewOptions: function() {
    return {
      text: _.result(this, 'text')
    };
  },
  footerViewOptions: function() {
    var buttons = [];
    if (this.showCancel || true) {
      buttons.push({
        id: 'confirmation-cancel-btn',
        className: 'btn '+ (this.cancelClassName || 'btn-default'),
        value: _.result(this, 'cancelText') || 'Cancel',
        attributes: { 'data-dismiss': 'modal', 'aria-hidden': 'true' }
      });
    }
    buttons.push({
      id: 'confirmation-confirm-btn',
      className: 'btn '+ (this.confirmClassName || 'btn-primary'),
      value: _.result(this, 'confirmText') || 'Confirm'
    });
    return {
      buttons: buttons
    };
  },

  initialize: function(opts) {
    var options = opts || {};
    if (options.label) {
      this.label = options.label;
    }
    if (options.text) {
      this.text = options.text;
    }
    if (options.confirmText) {
      this.confirmText = options.confirmText;
    }
    if (options.confirmClassName) {
      this.confirmClassName = options.confirmClassName;
    }
    if (options.cancelText) {
      this.cancelText = options.cancelText;
    }
    if (options.cancelClassName) {
      this.cancelClassName = options.cancelClassName;
    }
    if (options.hideCancel) {
      this.showCancel = options.showCancel;
    }
    if (options.onConfirm) {
      this.onConfirm = options.onConfirm;
    }
  },

  // Override BaseModal hook to add additional default delegated events
  getAdditionalEventsToDelegate: function() {
    var eventHashes = BackboneBootstrapModals.BaseModal.prototype.getAdditionalEventsToDelegate.call(this);
    return eventHashes.concat(this.confirmationEvents);
  },

  onClickConfirm: function(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;

    // Execute the specified callback if it exists, then hide the modal.
    // The modal will not be hidden if the callback returns false.
    if (this.onConfirm) {
        if (this.onConfirm.call(this, e) !== false) {
            this.hide();
        }
    } else {
        this.hide();
    }
  }
});