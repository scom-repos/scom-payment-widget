import {
    Module,
    Styles,
    customElements,
    ControlElement,
    Container,
    Button,
    IFont,
} from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars;

type CreateInvoiceBody = {
    title: string;
    description: string;
    currency: string;
    photoUrl: string;
    payload: string;
    prices: { label: string; amount: number | string }[];
}

interface ScomTelegramPayWidgetElement extends ControlElement {
    data?: CreateInvoiceBody;
    botAPIEndpoint: string;
    onPaymentSuccess: (status: string) => Promise<void>;
    payBtnCaption?: string;
}


declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-telegram-pay-widget']: ScomTelegramPayWidgetElement;
        }
    }
}

@customElements('i-scom-telegram-pay-widget')
export class ScomTelegramPayWidget extends Module {

    private _invoiceData: CreateInvoiceBody;
    private botAPIEndpoint: string;
    private onPaymentSuccess: (status: string) => Promise<void>;
    private _payBtnCaption: string;
    private btnPayNow: Button;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    get enabled(): boolean {
        return super.enabled;
    }
    set enabled(value: boolean) {
        super.enabled = value;
        this.btnPayNow.enabled = value;
    }

    static async create(options?: ScomTelegramPayWidgetElement, parent?: Container) {
        let self = new this(parent, options);
        await self.ready();
        return self;
    }

    clear() {

    }

    init() {
        super.init();
        const data = this.getAttribute('data', true);
        const botAPIEndpoint = this.getAttribute('botAPIEndpoint', true);
        const onPaymentSuccess = this.getAttribute('onPaymentSuccess', true);
        const payBtnCaption = this.getAttribute('payBtnCaption', true);
        this._invoiceData = data;
        this.botAPIEndpoint = botAPIEndpoint;
        this.onPaymentSuccess = onPaymentSuccess;
        this.payBtnCaption = payBtnCaption;
    }

    set invoiceData(data: CreateInvoiceBody) {
        this._invoiceData = data;
    }

    get invoiceData() {
        return this._invoiceData;
    }

    set payBtnCaption(value: string) {
        this._payBtnCaption = value;
        this.btnPayNow.caption = value || 'Pay';
    }

    get payBtnCaption() {
        return this._payBtnCaption;
    }

    get font(): IFont {
      return this.btnPayNow.font;
    }

    set font(value: IFont) {
        this.btnPayNow.font = value;
    }

    private async getInvoiceLink() {
        if(!this._invoiceData) {
            console.error('Invoice data is empty.');
            return;
        }
        const response = await fetch(`${this.botAPIEndpoint}/invoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...this._invoiceData,
                prices: JSON.stringify(this._invoiceData.prices)
            })
        });
        if(response.ok) {
            const data = await response.json();
            if(data.success) {
                return data.data.invoiceLink;
            }
            else return '';
        }
    }

    private async handlePayClick() {
        const telegram = (window as any).Telegram;
        if(telegram) {
            const app = telegram.WebApp;
            if(app) {
                const invoiceLink = await this.getInvoiceLink();
                if(invoiceLink) {
                    app.openInvoice(invoiceLink, this.onPaymentSuccess);
                }
            }
        }
    }

    render() {
        return (
            <i-stack direction="vertical">
                <i-button id="btnPayNow" onClick={this.handlePayClick} caption={this._payBtnCaption || 'Pay'} padding={{top: 10, bottom: 10, left: 10, right: 10}} width={'100%'}/>
            </i-stack>
        );
    }
}
