import commonConfiguration from './commonConfig';

const identifier = new Date().getMilliseconds();

const paymentsConfig = {
    ...commonConfiguration,
    origin: 'http://localhost:3020',
    returnUrl: 'https://localhost:3020',
    reference: `${identifier}-checkout-components-ref`,
    additionalData: {
        allow3DS2: true
    },
    shopperEmail: 'test-shopper@storytel.com',
    shopperIP: '172.30.0.1',
    // threeDS2RequestData: {
    //     authenticationOnly: false
    // },
    channel: 'Web',
    browserInfo: {
        // screenWidth: 1024,
        // screenHeight: 500,
        // colorDepth: 24,
        // userAgent: 'Chrome',
        // timeZoneOffset: 0,
        // language: 'nl-NL',
        // javaEnabled: true,
        acceptHeader: 'http'
    },
    lineItems: [
        {
            taxPercentage: 0,
            id: 'item1',
            taxAmount: 0,
            description: 'Test Item 1',
            amountIncludingTax: 75900,
            quantity: 1,
            taxCategory: 'None',
            amountExcludingTax: 75900
        },
        {
            taxPercentage: 0,
            id: 'item2',
            taxAmount: 0,
            description: 'Test Item 2',
            amountIncludingTax: 10000,
            quantity: 1,
            taxCategory: 'None',
            amountExcludingTax: 10000
        }
    ]
};
export default paymentsConfig;
