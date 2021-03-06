import { h } from 'preact';
import UIElement from '../UIElement';
import PaypalComponent from './components/PaypalComponent';
import defaultProps from './defaultProps';
import { PaymentAction } from '~/types';
import { PayPalElementProps } from './types';
import './Paypal.scss';

class PaypalElement extends UIElement {
    public static type = 'paypal';
    public static subtype = 'sdk';
    protected static defaultProps: PayPalElementProps = defaultProps;
    private paymentData = null;
    private resolve = null;
    private reject = null;

    constructor(props) {
        super(props);

        this.handleAction = this.handleAction.bind(this);
        this.updateWithAction = this.updateWithAction.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * @private
     * Formats the component data output
     * @return {object} props
     */
    formatData() {
        return {
            paymentMethod: {
                type: PaypalElement.type,
                subtype: PaypalElement.subtype
            }
        };
    }

    handleAction(action: PaymentAction) {
        return this.updateWithAction(action);
    }

    updateWithAction(action: PaymentAction) {
        if (action.paymentMethodType !== this.data.paymentMethod.type) throw new Error('Invalid Action');

        if (action.paymentData) {
            this.paymentData = action.paymentData;
        }

        if (action.sdkData && action.sdkData.token) {
            this.resolve(action.sdkData.token);
        } else {
            this.reject(new Error('No token was provided'));
        }

        return null;
    }

    /**
     * Dropin Validation
     * @returns {Boolean} Paypal does not require any specific Dropin validation
     */
    get isValid() {
        return true;
    }

    handleCancel(data) {
        this.props.onCancel(data, this.elementRef);
    }

    handleComplete(details) {
        const state = { data: { details, paymentData: this.paymentData } };
        this.props.onAdditionalDetails(state, this.elementRef);
    }

    handleError(data) {
        this.props.onError(data, this.elementRef);
    }

    handleSubmit() {
        this.submit();

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    render() {
        return (
            <PaypalComponent
                ref={ref => {
                    this.componentRef = ref;
                }}
                {...this.props}
                onCancel={this.handleCancel}
                onChange={this.setState}
                onComplete={this.handleComplete}
                onError={this.handleError}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default PaypalElement;
