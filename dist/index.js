var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-payment-widget/components/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadingImageStyle = exports.checkboxTextStyle = exports.textCenterStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    const spinnerAnim = components_1.Styles.keyframes({
        "0%": {
            transform: 'rotate(0deg)'
        },
        "100%": {
            transform: 'rotate(360deg)'
        },
    });
    exports.textCenterStyle = components_1.Styles.style({
        textAlign: 'center'
    });
    exports.checkboxTextStyle = components_1.Styles.style({
        $nest: {
            'span': {
                display: 'inline'
            },
            'a': {
                display: 'inline',
                color: Theme.colors.info.main
            }
        }
    });
    exports.loadingImageStyle = components_1.Styles.style({
        animation: `${spinnerAnim} 2s linear infinite`
    });
});
define("@scom/scom-payment-widget/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PaymentProvider = exports.PaymentType = void 0;
    var PaymentType;
    (function (PaymentType) {
        PaymentType["Fiat"] = "Fiat";
        PaymentType["Crypto"] = "Crypto";
    })(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
    var PaymentProvider;
    (function (PaymentProvider) {
        PaymentProvider["Stripe"] = "Stripe";
        PaymentProvider["Paypal"] = "Paypal";
        PaymentProvider["TonWallet"] = "Ton Wallet";
        PaymentProvider["Metamask"] = "Metamask";
    })(PaymentProvider = exports.PaymentProvider || (exports.PaymentProvider = {}));
});
define("@scom/scom-payment-widget/components/invoiceCreation.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-payment-widget/components/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvoiceCreation = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    let InvoiceCreation = class InvoiceCreation extends components_2.Module {
        get payment() {
            return this._payment;
        }
        set payment(value) {
            this._payment = value;
            this.updateInfo();
        }
        constructor(parent, options) {
            super(parent, options);
            this._payment = { title: '', paymentId: '', amount: 0 };
        }
        updateInfo() {
            const { paymentId, amount, currency } = this.payment;
            if (this.lbAmount) {
                this.lbAmount.caption = `${components_2.FormatUtils.formatNumber(amount || 0, { decimalFigures: 2 })} ${currency || 'USD'}`;
            }
            if (this.pnlPaymentId) {
                const _paymentId = paymentId || '';
                this.pnlPaymentId.visible = !!_paymentId;
                this.lbPaymentId.caption = _paymentId;
            }
            if (this.checkboxAgree.checked) {
                this.checkboxAgree.checked = false;
                this.btnContinue.enabled = false;
            }
        }
        handleCheckboxChanged() {
            const checked = this.checkboxAgree.checked;
            this.btnContinue.enabled = checked;
        }
        handleContinue() {
            if (this.onContinue)
                this.onContinue();
        }
        async init() {
            super.init();
            this.onContinue = this.getAttribute('onContinue', true) || this.onContinue;
            const payment = this.getAttribute('payment', true);
            if (payment) {
                this.payment = payment;
            }
        }
        render() {
            return this.$render("i-stack", { direction: "vertical", gap: "1rem", height: "100%", alignItems: "center", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-stack", { direction: "vertical", gap: "1rem", height: "100%" },
                    this.$render("i-stack", { direction: "vertical", gap: "1rem", alignItems: "center", width: "100%" },
                        this.$render("i-stack", { direction: "vertical", gap: "0.5rem", alignItems: "center" },
                            this.$render("i-label", { caption: "Amount to pay", font: { color: Theme.text.primary, bold: true, transform: 'uppercase' } }),
                            this.$render("i-label", { id: "lbAmount", class: index_css_1.textCenterStyle, font: { size: '1.25rem', color: Theme.colors.primary.main, bold: true } })),
                        this.$render("i-stack", { id: "pnlPaymentId", visible: false, direction: "vertical", gap: "0.25rem", alignItems: "center" },
                            this.$render("i-label", { caption: "Payment ID", font: { color: Theme.text.primary, bold: true, transform: 'uppercase' } }),
                            this.$render("i-label", { id: "lbPaymentId", class: index_css_1.textCenterStyle, font: { color: Theme.text.primary, bold: true, transform: 'uppercase' } })),
                        this.$render("i-panel", { width: "80%", height: 1, background: { color: Theme.divider } })),
                    this.$render("i-stack", { direction: "vertical", gap: "1rem", alignItems: "center", margin: { top: '1rem' } },
                        this.$render("i-label", { caption: "We just need your email to inform you of payment details and possible refunds.", font: { size: '0.75rem', color: Theme.colors.primary.main }, class: index_css_1.textCenterStyle }),
                        this.$render("i-stack", { direction: "vertical", gap: "0.25rem", width: "100%", background: { color: Theme.input.background }, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { radius: 8 } },
                            this.$render("i-label", { caption: "Your email", font: { size: '0.75rem', color: Theme.input.fontColor } }),
                            this.$render("i-input", { background: { color: 'transparent' }, padding: { left: '0.25rem', right: '0.25rem' }, border: { radius: 4, width: 1, style: 'solid', color: Theme.divider }, height: 32, width: "100%" }))),
                    this.$render("i-stack", { direction: "horizontal", gap: "0.25rem" },
                        this.$render("i-checkbox", { id: "checkboxAgree", onChanged: this.handleCheckboxChanged }),
                        this.$render("i-label", { caption: "I have read and accept the <a href='' target='_blank'>Terms of Service</a> and <a href='' target='_blank'>Privacy Policy</a>", class: index_css_1.checkboxTextStyle }))),
                this.$render("i-button", { id: "btnContinue", enabled: false, width: "100%", maxWidth: 180, caption: "Continue", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.primary.contrastText }, background: { color: Theme.colors.primary.main }, border: { radius: 12 }, rightIcon: { name: 'arrow-right', visible: true }, onClick: this.handleContinue }));
        }
    };
    InvoiceCreation = __decorate([
        (0, components_2.customElements)('scom-payment-widget--invoice-creation')
    ], InvoiceCreation);
    exports.InvoiceCreation = InvoiceCreation;
});
define("@scom/scom-payment-widget/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const moduleDir = components_3.application.currentModuleDir;
    function fullPath(path) {
        return `${moduleDir}/${path}`;
    }
    ;
    exports.default = {
        fullPath
    };
});
define("@scom/scom-payment-widget/store.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-network-list", "@scom/scom-payment-widget/interface.ts"], function (require, exports, components_4, eth_wallet_1, scom_network_list_1, interface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stripeCurrencies = exports.PaymentProviders = exports.isClientWalletConnected = exports.getClientWallet = exports.State = exports.STRIPE_CONFIG = exports.STRIPE_LIB_URL = void 0;
    const infuraId = 'adc596bf88b648e2a8902bc9093930c5';
    exports.STRIPE_LIB_URL = 'https://js.stripe.com/v3';
    exports.STRIPE_CONFIG = {
        STRIPE_PUBLISHABLE_KEY: 'pk_test_51Q60lAP7pMwOSpCLJJQliRgIVHlmPlpkrstk43VlRG2vutqIPZKhoSv8XVzK3nbxawr2ru5cWQ1SFfkayFu5m25o00RHU1gBhl',
        STRIPE_SECRET_KEY: 'sk_test_51Q60lAP7pMwOSpCLNlbVBSZOIUOaqYVFVWihoOpqVOjOag6hUtOktCBYFudiXkVLiYKRlgZODmILVnr271jm9yQc00ANkHT99O'
    };
    class State {
        constructor(options) {
            this.rpcWalletId = '';
            this.networkMap = {};
            this.infuraId = '';
            this.getNetworkInfo = (chainId) => {
                return this.networkMap[chainId];
            };
            if (options.infuraId) {
                this.infuraId = options.infuraId;
            }
        }
        initRpcWallet(defaultChainId) {
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_1.Wallet.getClientInstance();
            const networkList = Object.values(components_4.application.store?.networkMap || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: components_4.application.store?.infuraId,
                multicalls: components_4.application.store?.multicalls
            });
            this.rpcWalletId = instanceId;
            if (clientWallet.address) {
                const rpcWallet = eth_wallet_1.Wallet.getRpcWalletInstance(instanceId);
                rpcWallet.address = clientWallet.address;
            }
            const defaultNetworkList = (0, scom_network_list_1.default)();
            const defaultNetworkMap = defaultNetworkList.reduce((acc, cur) => {
                acc[cur.chainId] = cur;
                return acc;
            }, {});
            for (let network of networkList) {
                const networkInfo = defaultNetworkMap[network.chainId];
                if (!networkInfo)
                    continue;
                if (infuraId && network.rpcUrls && network.rpcUrls.length > 0) {
                    for (let i = 0; i < network.rpcUrls.length; i++) {
                        network.rpcUrls[i] = network.rpcUrls[i].replace(/{InfuraId}/g, infuraId);
                    }
                }
                this.networkMap[network.chainId] = {
                    ...networkInfo,
                    ...network
                };
            }
            return instanceId;
        }
        getRpcWallet() {
            return this.rpcWalletId ? eth_wallet_1.Wallet.getRpcWalletInstance(this.rpcWalletId) : null;
        }
        isRpcWalletConnected() {
            const wallet = this.getRpcWallet();
            return wallet?.isConnected;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet?.chainId;
        }
    }
    exports.State = State;
    function getClientWallet() {
        return eth_wallet_1.Wallet.getClientInstance();
    }
    exports.getClientWallet = getClientWallet;
    function isClientWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isClientWalletConnected = isClientWalletConnected;
    exports.PaymentProviders = [
        {
            provider: interface_1.PaymentProvider.Stripe,
            type: interface_1.PaymentType.Fiat,
            image: 'stripe.png'
        },
        {
            provider: interface_1.PaymentProvider.Paypal,
            type: interface_1.PaymentType.Fiat,
            image: 'paypal.png'
        },
        {
            provider: interface_1.PaymentProvider.TonWallet,
            type: interface_1.PaymentType.Crypto,
            image: 'ton.png'
        },
        {
            provider: interface_1.PaymentProvider.Metamask,
            type: interface_1.PaymentType.Crypto,
            image: 'metamask.png'
        }
    ];
    exports.stripeCurrencies = [
        "aed", "afn", "all", "amd", "ang", "aoa", "ars", "aud", "awg", "azn",
        "bam", "bbd", "bdt", "bgn", "bhd", "bif", "bmd", "bnd", "bob", "brl",
        "bsd", "btn", "bwp", "byn", "byr", "bzd", "cad", "cdf", "chf", "clf",
        "clp", "cny", "cop", "crc", "cuc", "cup", "cve", "czk", "djf", "dkk",
        "dop", "dzd", "egp", "ern", "etb", "eur", "fjd", "fkp", "gbp", "gel",
        "ghs", "gip", "gmd", "gnf", "gtq", "gyd", "hkd", "hnl", "htg", "huf",
        "idr", "ils", "inr", "iqd", "irr", "isk", "jmd", "jod", "jpy", "kes",
        "kgs", "khr", "kmf", "kpw", "krw", "kwd", "kyd", "kzt", "lak", "lbp",
        "lkr", "lrd", "lsl", "ltl", "lvl", "lyd", "mad", "mdl", "mga", "mkd",
        "mmk", "mnt", "mop", "mro", "mur", "mvr", "mwk", "mxn", "myr", "mzn",
        "nad", "ngn", "nio", "nok", "npr", "nzd", "omr", "pab", "pen", "pgk",
        "php", "pkr", "pln", "pyg", "qar", "ron", "rsd", "rub", "rwf", "sar",
        "sbd", "scr", "sdg", "sek", "sgd", "shp", "skk", "sll", "sos", "srd",
        "ssp", "std", "svc", "syp", "szl", "thb", "tjs", "tmt", "tnd", "top",
        "try", "ttd", "twd", "tzs", "uah", "ugx", "usd", "uyu", "uzs", "vef",
        "vnd", "vuv", "wst", "xaf", "xag", "xau", "xcd", "xdr", "xof", "xpf",
        "yer", "zar", "zmk", "zmw", "btc", "jep", "eek", "ghc", "mtl", "tmm",
        "yen", "zwd", "zwl", "zwn", "zwr"
    ];
});
define("@scom/scom-payment-widget/components/paymentMethod.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-payment-widget/interface.ts", "@scom/scom-payment-widget/assets.ts", "@scom/scom-payment-widget/store.ts"], function (require, exports, components_5, interface_2, assets_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PaymentMethod = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    const paymentTypes = [
        {
            type: interface_2.PaymentType.Fiat,
            title: 'Fiat currency',
            description: 'Stripe, Paypal, Payme,...etc',
            iconName: 'exchange-alt',
            providerImages: ['stripe.png', 'paypal.png']
        },
        {
            type: interface_2.PaymentType.Crypto,
            title: 'Crypto currency',
            description: 'Metamask, Ton Wallet,...etc',
            iconName: 'wallet',
            providerImages: ['metamask.png', 'ton.png']
        }
    ];
    let PaymentMethod = class PaymentMethod extends components_5.Module {
        get payment() {
            return this._payment;
        }
        set payment(value) {
            this._payment = value;
            this.updateAmount();
        }
        constructor(parent, options) {
            super(parent, options);
        }
        updateAmount() {
            if (this.lbAmount && this.payment) {
                const { amount, currency } = this.payment;
                const formattedAmount = components_5.FormatUtils.formatNumber(amount || 0, { decimalFigures: 2 });
                this.lbAmount.caption = `${formattedAmount} ${currency || 'USD'}`;
            }
        }
        renderMethodItems(type) {
            this.lbPayMethod.caption = type === interface_2.PaymentType.Fiat ? 'Select a payment gateway' : 'Select your wallet';
            const providers = store_1.PaymentProviders.filter(v => v.type === type);
            const nodeItems = [];
            for (const item of providers) {
                nodeItems.push(this.$render("i-stack", { direction: "horizontal", justifyContent: "center", gap: "0.5rem", width: "100%", minHeight: 40, border: { width: 1, style: 'solid', color: Theme.divider, radius: 8 }, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, cursor: "pointer", onClick: () => this.handlePaymentProvider(item.provider) },
                    this.$render("i-stack", { direction: "horizontal", alignItems: "center", gap: "0.75rem", width: "calc(100% - 30px)" },
                        this.$render("i-image", { width: 20, height: 20, url: assets_1.default.fullPath(`img/${item.image}`) }),
                        this.$render("i-label", { caption: item.provider, font: { size: '1rem', bold: true, color: Theme.text.primary } })),
                    this.$render("i-icon", { name: "arrow-right", width: 20, height: 20, fill: Theme.text.primary, margin: { left: 'auto', right: 'auto' } })));
            }
            this.pnlMethodItems.clearInnerHTML();
            this.pnlMethodItems.append(...nodeItems);
        }
        handlePaymentType(target) {
            const type = target.id;
            if (type) {
                this.renderMethodItems(type);
                this.pnlPaymentType.visible = false;
                this.pnlPaymentMethod.visible = true;
            }
        }
        handlePaymentProvider(provider) {
            if (provider === interface_2.PaymentProvider.Metamask || provider === interface_2.PaymentProvider.Stripe) {
                if (this.onSelectedPaymentProvider)
                    this.onSelectedPaymentProvider(this.payment, provider);
            }
        }
        handleBack() {
            this.lbPayMethod.caption = 'How will you pay?';
            this.pnlPaymentType.visible = true;
            this.pnlPaymentMethod.visible = false;
        }
        async init() {
            super.init();
            this.onBack = this.getAttribute('onBack', true) || this.onBack;
            this.onSelectedPaymentProvider = this.getAttribute('onSelectedPaymentProvider', true) || this.onSelectedPaymentProvider;
            const payment = this.getAttribute('payment', true);
            if (payment) {
                this.payment = payment;
            }
        }
        render() {
            return this.$render("i-stack", { direction: "vertical", gap: "1rem", alignItems: "center", height: "100%" },
                this.$render("i-stack", { direction: "vertical", gap: "0.5rem", justifyContent: "center", alignItems: "center", width: "100%", height: 60, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main } },
                    this.$render("i-label", { caption: "Amount to pay", font: { size: '0.675rem', bold: true, transform: 'uppercase', color: Theme.text.primary } }),
                    this.$render("i-label", { id: "lbAmount", font: { size: '0.875rem', color: Theme.text.primary, bold: true } })),
                this.$render("i-stack", { direction: "vertical", gap: "1rem", width: "100%", height: "100%", alignItems: "center", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                    this.$render("i-label", { id: "lbPayMethod", caption: "How will you pay?", font: { size: '1rem', bold: true, color: Theme.colors.primary.main } }),
                    this.$render("i-stack", { id: "pnlPaymentType", direction: "vertical", gap: "1rem", width: "100%", height: "100%", alignItems: "center" }, paymentTypes.map(v => this.$render("i-stack", { id: v.type, direction: "horizontal", alignItems: "center", gap: "1rem", width: "100%", border: { width: 1, style: 'solid', color: Theme.divider, radius: 8 }, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, cursor: "pointer", onClick: this.handlePaymentType },
                        this.$render("i-stack", { direction: "vertical", gap: "0.75rem", width: "calc(100% - 30px)" },
                            this.$render("i-stack", { direction: "horizontal", gap: "0.5rem", alignItems: "center" },
                                this.$render("i-icon", { name: v.iconName, width: 20, height: 20, fill: Theme.colors.primary.main }),
                                this.$render("i-label", { caption: v.title, font: { size: '1rem', bold: true, color: Theme.text.primary } })),
                            this.$render("i-label", { caption: v.description, font: { color: Theme.text.secondary } }),
                            this.$render("i-stack", { direction: "horizontal", gap: "0.25rem" }, v.providerImages.map(image => this.$render("i-image", { width: 20, height: 20, url: assets_1.default.fullPath(`img/${image}`) })))),
                        this.$render("i-icon", { name: "arrow-right", width: 20, height: 20, fill: Theme.text.primary, margin: { left: 'auto', right: 'auto' } })))),
                    this.$render("i-stack", { id: "pnlPaymentMethod", visible: false, direction: "vertical", gap: "2rem", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" },
                        this.$render("i-stack", { id: "pnlMethodItems", direction: "vertical", gap: "1rem", width: "100%", height: "100%" }),
                        this.$render("i-button", { width: "100%", maxWidth: 180, caption: "Back", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.secondary.contrastText }, background: { color: Theme.colors.secondary.main }, border: { radius: 12 }, onClick: this.handleBack }))));
        }
    };
    PaymentMethod = __decorate([
        (0, components_5.customElements)('scom-payment-widget--payment-method')
    ], PaymentMethod);
    exports.PaymentMethod = PaymentMethod;
});
define("@scom/scom-payment-widget/data.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-payment-widget/data.ts'/> 
    const Tokens_BSC_Testnet = [
        {
            "name": "USDT",
            "address": "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
            "symbol": "USDT",
            "decimals": 6,
        }
    ];
    const Tokens_Fuji = [
        {
            "name": "Tether USD",
            "address": "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
            "symbol": "USDT.e",
            "decimals": 6
        }
    ];
    exports.default = {
        "infuraId": "adc596bf88b648e2a8902bc9093930c5",
        "defaultData": {
            "defaultChainId": 97,
            "networks": [
                {
                    "chainId": 97
                },
                {
                    "chainId": 43113
                }
            ],
            "tokens": [
                ...Tokens_BSC_Testnet.map(v => { return { ...v, chainId: 97 }; }),
                ...Tokens_Fuji.map(v => { return { ...v, chainId: 43113 }; })
            ],
            "wallets": [
                {
                    "name": "metamask"
                }
            ]
        }
    };
});
define("@scom/scom-payment-widget/components/walletPayment.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-payment-widget/interface.ts", "@scom/scom-payment-widget/assets.ts", "@scom/scom-payment-widget/data.ts", "@scom/scom-token-list", "@scom/scom-payment-widget/store.ts"], function (require, exports, components_6, interface_3, assets_2, data_1, scom_token_list_1, store_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletPayment = void 0;
    const Theme = components_6.Styles.Theme.ThemeVars;
    let WalletPayment = class WalletPayment extends components_6.Module {
        constructor(parent, options) {
            super(parent, options);
            this._wallets = [];
            this._networks = [];
            this._tokens = [];
        }
        get state() {
            return this._state;
        }
        set state(value) {
            this._state = value;
        }
        get wallets() {
            return this._wallets ?? data_1.default.defaultData.wallets;
        }
        set wallets(value) {
            this._wallets = value;
        }
        get networks() {
            return this._networks ?? data_1.default.defaultData.networks;
        }
        set networks(value) {
            this._networks = value;
        }
        get tokens() {
            return this._tokens ?? data_1.default.defaultData.tokens;
        }
        set tokens(value) {
            this._tokens = value;
        }
        async onStartPayment(payment) {
            this.payment = payment;
            if (!this.pnlAmount)
                return;
            this.isInitialized = true;
            if (this.payment.provider === interface_3.PaymentProvider.Metamask) {
                // TODO
            }
            else if (this.payment.provider === interface_3.PaymentProvider.TonWallet) {
                // TODO
            }
            this.showFirstScreen();
            this.updateAmount();
            this.checkWalletStatus();
        }
        showFirstScreen() {
            this.pnlAmount.visible = true;
            this.pnlPayAmount.visible = false;
            this.pnlTokenItems.visible = true;
            this.pnlPayDetail.visible = false;
            this.btnPay.visible = false;
            this.btnBack.width = '100%';
            this.isToPay = false;
        }
        updateAmount() {
            if (this.lbAmount && this.payment) {
                const { amount, currency } = this.payment;
                const formattedAmount = components_6.FormatUtils.formatNumber(amount || 0, { decimalFigures: 2 });
                this.lbAmount.caption = `${formattedAmount} ${currency || 'USD'}`;
                this.lbPayAmount.caption = `${formattedAmount} ${currency || 'USD'}`;
            }
        }
        async checkWalletStatus() {
            const paymentProvider = this.payment.provider;
            let isConnected = this.isWalletConnected;
            if (paymentProvider === interface_3.PaymentProvider.Metamask) {
                // TODO
            }
            else if (paymentProvider === interface_3.PaymentProvider.TonWallet) {
                // TODO
            }
            this.pnlWallet.visible = !isConnected;
            const provider = store_2.PaymentProviders.find(v => v.provider === this.payment.provider);
            if (isConnected) {
                if (paymentProvider === interface_3.PaymentProvider.Metamask) {
                    const address = '0xA81961100920df22CF98703155029822f2F7f033';
                    const chainId = 97;
                    const network = {
                        image: assets_2.default.fullPath('img/bscMainnet.svg'),
                        chainName: 'BNB Chain Testnet'
                    };
                    if (provider) {
                        this.imgCurrentWallet.url = assets_2.default.fullPath(`img/${provider.image}`);
                        this.lbCurrentAddress.caption = address.substr(0, 6) + '...' + address.substr(-4);
                        this.imgCurrentNetwork.url = network.image;
                        this.lbCurrentNetwork.caption = network.chainName;
                        this.pnlNetwork.visible = true;
                    }
                    await this.renderTokens(chainId);
                }
                else if (paymentProvider === interface_3.PaymentProvider.TonWallet) {
                    // TODO
                }
            }
            else if (provider) {
                this.imgWallet.url = assets_2.default.fullPath(`img/${provider.image}`);
                this.lbWallet.caption = `Connect to ${provider.provider}`;
            }
            this.pnlTokens.visible = isConnected;
        }
        async renderTokens(chainId) {
            const tokens = this.tokens.filter(v => v.chainId === chainId);
            const network = {
                image: '/libs/@scom/scom-network-list/img/bscMainnet.svg',
                chainName: 'BNB Chain Testnet'
            };
            const nodeItems = [];
            for (const token of tokens) {
                const balances = scom_token_list_1.tokenStore.getTokenBalancesByChainId(chainId) || {};
                const tokenBalance = balances[token.address?.toLowerCase() || token.symbol] || 0;
                const formattedBalance = components_6.FormatUtils.formatNumber(tokenBalance, { decimalFigures: 2 });
                nodeItems.push(this.$render("i-stack", { direction: "horizontal", justifyContent: "space-between", alignItems: "center", wrap: "wrap", gap: "0.5rem", width: "100%", minHeight: 40, border: { width: 1, style: 'solid', color: Theme.divider, radius: 8 }, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, cursor: "pointer", onClick: () => this.handleSelectToken(token) },
                    this.$render("i-stack", { direction: "horizontal", alignItems: "center", gap: "0.75rem" },
                        this.$render("i-image", { width: 20, height: 20, minWidth: 20, url: scom_token_list_1.assets.tokenPath(token, chainId) }),
                        this.$render("i-stack", { direction: "vertical", gap: "0.25rem" },
                            this.$render("i-label", { caption: token.name || token.symbol, font: { bold: true, color: Theme.text.primary } }),
                            this.$render("i-label", { caption: network.chainName || '', font: { size: '0.75rem', color: Theme.text.primary } }))),
                    this.$render("i-stack", { direction: "vertical", gap: "0.25rem" },
                        this.$render("i-label", { caption: `${formattedBalance} ${token.symbol}`, font: { bold: true, color: Theme.text.primary } }))));
            }
            this.pnlTokenItems.clearInnerHTML();
            this.pnlTokenItems.append(...nodeItems);
        }
        handleConnectWallet() {
            this.isWalletConnected = true;
            this.checkWalletStatus();
        }
        handleShowNetworks() {
        }
        handleSelectToken(token) {
            this.pnlAmount.visible = false;
            this.pnlTokenItems.visible = false;
            this.pnlPayAmount.visible = true;
            this.pnlPayDetail.visible = true;
            this.btnPay.visible = true;
            this.btnBack.width = 'calc(50% - 1rem)';
            this.isToPay = true;
            this.imgToken.url = scom_token_list_1.assets.tokenPath(token, token.chainId);
            const { address, amount, currency } = this.payment;
            const toAddress = address || '';
            this.lbToAddress.caption = toAddress.substr(0, 12) + '...' + toAddress.substr(-12);
            const formattedAmount = components_6.FormatUtils.formatNumber(amount || 0, { decimalFigures: 2 });
            this.lbAmountToPay.caption = `${formattedAmount} ${token.symbol}`;
            this.lbUSD.caption = `${formattedAmount} ${currency || 'USD'}`;
            this.imgPayToken.url = scom_token_list_1.assets.tokenPath(token, token.chainId);
        }
        async handleCopyAddress() {
            try {
                await components_6.application.copyToClipboard(this.payment.address);
                this.iconCopyAddress.name = 'check';
                this.iconCopyAddress.fill = Theme.colors.success.main;
                if (this.copyAddressTimer)
                    clearTimeout(this.copyAddressTimer);
                this.copyAddressTimer = setTimeout(() => {
                    this.iconCopyAddress.name = 'copy';
                    this.iconCopyAddress.fill = Theme.text.primary;
                }, 500);
            }
            catch { }
        }
        async handleCopyAmount() {
            try {
                await components_6.application.copyToClipboard(this.payment.amount.toString());
                this.iconCopyAmount.name = 'check';
                this.iconCopyAmount.fill = Theme.colors.success.main;
                if (this.copyAmountTimer)
                    clearTimeout(this.copyAmountTimer);
                this.copyAmountTimer = setTimeout(() => {
                    this.iconCopyAmount.name = 'copy';
                    this.iconCopyAmount.fill = Theme.text.primary;
                }, 500);
            }
            catch { }
        }
        handlePay() {
            if (this.onPaid) {
                const address = '0xA81961100920df22CF98703155029822f2F7f033';
                this.onPaid({ status: 'pending', provider: this.payment.provider, receipt: '0x00000000000000000000000000000', ownerAddress: address });
                setTimeout(() => {
                    this.onPaid({ status: 'complete', provider: this.payment.provider, receipt: '0x00000000000000000000000000000', ownerAddress: address });
                }, 3000);
            }
        }
        handleBack() {
            if (this.isToPay) {
                this.showFirstScreen();
                return;
            }
            if (this.onBack)
                this.onBack();
        }
        async init() {
            super.init();
            this.onBack = this.getAttribute('onBack', true) || this.onBack;
            this.onPaid = this.getAttribute('onPaid', true) || this.onPaid;
            const state = this.getAttribute('state', true);
            if (state) {
                this.state = state;
            }
            const payment = this.getAttribute('payment', true);
            if (payment) {
                this.payment = payment;
            }
            const tokens = this.getAttribute('tokens', true);
            if (tokens) {
                this.tokens = tokens;
            }
            if (this.payment && !this.isInitialized) {
                this.onStartPayment(this.payment);
            }
        }
        render() {
            return this.$render("i-stack", { direction: "vertical", alignItems: "center", height: "100%" },
                this.$render("i-stack", { direction: "vertical", alignItems: "center", width: "100%", minHeight: 60, margin: { bottom: '1rem' } },
                    this.$render("i-stack", { id: "pnlAmount", direction: "vertical", gap: "0.5rem", justifyContent: "center", alignItems: "center", width: "100%", minHeight: 60, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main } },
                        this.$render("i-label", { caption: "Amount to pay", font: { size: '0.675rem', bold: true, transform: 'uppercase', color: Theme.text.primary } }),
                        this.$render("i-label", { id: "lbAmount", font: { size: '0.875rem', color: Theme.text.primary, bold: true } })),
                    this.$render("i-stack", { id: "pnlPayAmount", visible: false, direction: "horizontal", gap: "0.25rem", alignItems: "center", width: "100%", minHeight: 60, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, border: { bottom: { style: 'solid', width: 1, color: Theme.divider } } },
                        this.$render("i-image", { id: "imgPayToken", width: 20, height: 20, minWidth: 20, display: "flex" }),
                        this.$render("i-label", { id: "lbPayAmount", font: { size: '1rem', color: Theme.text.primary, bold: true } }))),
                this.$render("i-stack", { direction: "vertical", gap: "1.5rem", width: "100%", height: "100%", alignItems: "center", padding: { top: '1rem', bottom: '1rem' } },
                    this.$render("i-stack", { id: "pnlWallet", visible: false, direction: "vertical", gap: "2rem", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", padding: { left: '1rem', right: '1rem' } },
                        this.$render("i-image", { id: "imgWallet", width: 64, height: 64 }),
                        this.$render("i-label", { id: "lbWallet", font: { size: '0.825rem', bold: true } }),
                        this.$render("i-button", { caption: "Connect Wallet", width: "100%", maxWidth: 180, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.primary.contrastText }, background: { color: Theme.colors.primary.main }, border: { radius: 12 }, onClick: this.handleConnectWallet }),
                        this.$render("i-button", { caption: "Back", width: "100%", maxWidth: 180, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.secondary.contrastText }, background: { color: Theme.colors.secondary.main }, border: { radius: 12 }, onClick: this.handleBack })),
                    this.$render("i-stack", { id: "pnlTokens", visible: false, direction: "vertical", gap: "1rem", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" },
                        this.$render("i-stack", { direction: "horizontal", justifyContent: "space-between", alignItems: "center", gap: "1rem", width: "100%", wrap: "wrap", margin: { bottom: '0.5rem' }, padding: { left: '1rem', right: '1rem' } },
                            this.$render("i-stack", { direction: "horizontal", gap: "0.5rem", alignItems: "center", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { style: 'solid', width: 1, color: Theme.divider, radius: 8 } },
                                this.$render("i-image", { id: "imgCurrentWallet", width: 24, height: 24, minWidth: 24 }),
                                this.$render("i-label", { id: "lbCurrentAddress" })),
                            this.$render("i-stack", { id: "pnlNetwork", direction: "horizontal", gap: "0.5rem", alignItems: "center", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { style: 'solid', width: 1, color: Theme.divider, radius: 8 }, cursor: "pointer", width: "fit-content", onClick: this.handleShowNetworks },
                                this.$render("i-image", { id: "imgCurrentNetwork", width: 24, height: 24, minWidth: 24 }),
                                this.$render("i-label", { id: "lbCurrentNetwork" }))),
                        this.$render("i-stack", { id: "pnlTokenItems", direction: "vertical", gap: "1rem", width: "100%", height: "100%", minHeight: 200, maxHeight: "calc(100vh - 305px)", overflow: "auto", padding: { left: '1rem', right: '1rem' } }),
                        this.$render("i-stack", { id: "pnlPayDetail", visible: false, direction: "vertical", gap: "0.25rem", width: "100%", height: "100%", alignItems: "center", padding: { left: '1rem', right: '1rem' } },
                            this.$render("i-label", { caption: "Paid to address" }),
                            this.$render("i-stack", { direction: "horizontal", alignItems: "center", width: "100%", margin: { bottom: '1rem' }, border: { radius: 8 }, background: { color: Theme.input.background }, overflow: "hidden" },
                                this.$render("i-stack", { direction: "horizontal", gap: "0.5rem", alignItems: "center", width: "100%", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' } },
                                    this.$render("i-image", { id: "imgToken", width: 16, height: 16, minWidth: 16, display: "flex" }),
                                    this.$render("i-label", { id: "lbToAddress", wordBreak: "break-all", font: { color: Theme.input.fontColor } })),
                                this.$render("i-stack", { direction: "horizontal", width: 32, minWidth: 32, height: "100%", alignItems: "center", justifyContent: "center", cursor: "pointer", margin: { left: 'auto' }, background: { color: Theme.colors.primary.main }, onClick: this.handleCopyAddress },
                                    this.$render("i-icon", { id: "iconCopyAddress", name: "copy", width: 16, height: 16, cursor: "pointer", fill: Theme.text.primary }))),
                            this.$render("i-stack", { direction: "horizontal", alignItems: "center", width: "100%", border: { radius: 8 }, background: { color: Theme.input.background }, overflow: "hidden" },
                                this.$render("i-stack", { direction: "vertical", gap: "0.5rem", justifyContent: "center", alignItems: "center", width: "100%", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' } },
                                    this.$render("i-label", { caption: "Amount to pay", font: { size: '0.75rem', transform: 'uppercase', color: Theme.input.fontColor } }),
                                    this.$render("i-label", { id: "lbAmountToPay", wordBreak: "break-all", font: { size: '0.875rem', color: Theme.colors.primary.main, bold: true } }),
                                    this.$render("i-label", { id: "lbUSD", wordBreak: "break-all", font: { size: '0.75rem', color: Theme.colors.primary.main } })),
                                this.$render("i-stack", { direction: "horizontal", width: 32, minWidth: 32, height: "100%", alignItems: "center", justifyContent: "center", cursor: "pointer", margin: { left: 'auto' }, background: { color: Theme.colors.primary.main }, onClick: this.handleCopyAmount },
                                    this.$render("i-icon", { id: "iconCopyAmount", name: "copy", width: 16, height: 16, fill: Theme.text.primary })))),
                        this.$render("i-stack", { direction: "horizontal", width: "100%", alignItems: "center", justifyContent: "center", gap: "1rem", wrap: "wrap", padding: { left: '1rem', right: '1rem' } },
                            this.$render("i-button", { id: "btnBack", caption: "Back", width: "100%", maxWidth: 180, minWidth: 90, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.secondary.contrastText }, background: { color: Theme.colors.secondary.main }, border: { radius: 12 }, onClick: this.handleBack }),
                            this.$render("i-button", { id: "btnPay", visible: false, caption: "Pay", width: "calc(50% - 1rem)", maxWidth: 180, minWidth: 90, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.primary.contrastText }, background: { color: Theme.colors.primary.main }, border: { radius: 12 }, onClick: this.handlePay })))));
        }
    };
    WalletPayment = __decorate([
        (0, components_6.customElements)('scom-payment-widget--wallet-payment')
    ], WalletPayment);
    exports.WalletPayment = WalletPayment;
});
define("@scom/scom-payment-widget/components/statusPayment.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-payment-widget/components/index.css.ts", "@scom/scom-payment-widget/assets.ts", "@scom/scom-payment-widget/store.ts"], function (require, exports, components_7, index_css_2, assets_3, store_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusPayment = void 0;
    const Theme = components_7.Styles.Theme.ThemeVars;
    let StatusPayment = class StatusPayment extends components_7.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        updateStatus(state, info) {
            this.state = state;
            const { status, receipt, provider, ownerAddress } = info;
            this.receipt = receipt;
            this.status = status;
            const isPending = status === 'pending';
            const isCompleted = status === 'complete';
            this.lbHeaderStatus.caption = isPending ? 'Payment Pending' : isCompleted ? 'Success' : 'Failed';
            this.lbHeaderStatus.style.color = isPending ? Theme.colors.primary.main : isCompleted ? Theme.colors.success.main : Theme.colors.error.main;
            this.lbHeaderStatus.style.marginInline = isPending ? 'inherit' : 'auto';
            this.imgHeaderStatus.visible = isPending;
            this.lbStatus.caption = `Payment ${status}`;
            if (isPending) {
                this.imgStatus.classList.add(index_css_2.loadingImageStyle);
            }
            else {
                this.imgStatus.classList.remove(index_css_2.loadingImageStyle);
            }
            this.imgStatus.url = assets_3.default.fullPath(`img/${isPending ? 'loading.svg' : isCompleted ? 'success.svg' : 'error.png'}`);
            const currentProvider = store_3.PaymentProviders.find(v => v.provider === provider);
            this.imgWallet.url = assets_3.default.fullPath(`img/${currentProvider.image}`);
            this.lbAddress.caption = ownerAddress.substr(0, 6) + '...' + ownerAddress.substr(-4);
            this.btnClose.visible = !isPending;
        }
        handleViewTransaction() {
            const network = this.state.getNetworkInfo(this.state.getChainId());
            if (network && network.explorerTxUrl) {
                const url = `${network.explorerTxUrl}${this.receipt}`;
                window.open(url);
            }
        }
        handleClose() {
            if (this.onClose)
                this.onClose(this.status);
        }
        async init() {
            super.init();
            this.onClose = this.getAttribute('onClose', true) || this.onClose;
        }
        render() {
            return this.$render("i-stack", { direction: "vertical", gap: "1rem", height: "100%", width: "100%", alignItems: "center", padding: { top: '1rem', bottom: '1rem' } },
                this.$render("i-stack", { direction: "vertical", gap: "1rem", height: "100%", width: "100%" },
                    this.$render("i-stack", { direction: "horizontal", gap: "1rem", justifyContent: "space-between", alignItems: "center", width: "100%", minHeight: 40, padding: { left: '1rem', right: '1rem', bottom: '1rem' }, border: { bottom: { style: 'solid', width: 1, color: Theme.divider } } },
                        this.$render("i-label", { id: "lbHeaderStatus", font: { size: '0.875rem', color: Theme.colors.primary.main, transform: 'uppercase', bold: true } }),
                        this.$render("i-image", { id: "imgHeaderStatus", class: index_css_2.loadingImageStyle, url: assets_3.default.fullPath('img/loading.svg'), width: 20, height: 20, minWidth: 20 })),
                    this.$render("i-stack", { direction: "vertical", gap: "1rem", width: "100%", height: "100%", alignItems: "center", padding: { left: '1rem', right: '1rem' } },
                        this.$render("i-stack", { direction: "horizontal", justifyContent: "space-between", alignItems: "center", gap: "1rem", width: "100%", wrap: "wrap", margin: { bottom: '0.5rem' } },
                            this.$render("i-stack", { direction: "horizontal", gap: "0.5rem", alignItems: "center", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { style: 'solid', width: 1, color: Theme.divider, radius: 8 } },
                                this.$render("i-image", { id: "imgWallet", width: 24, height: 24, minWidth: 24 }),
                                this.$render("i-label", { id: "lbAddress" })),
                            this.$render("i-stack", { direction: "horizontal", gap: "0.5rem", alignItems: "center", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, border: { style: 'solid', width: 1, color: Theme.divider, radius: 8 }, cursor: "pointer", width: "fit-content", onClick: this.handleViewTransaction },
                                this.$render("i-label", { caption: "View transaction" }))),
                        this.$render("i-stack", { direction: "vertical", alignItems: "center", justifyContent: "center", gap: "1rem", width: "100%", height: "100%" },
                            this.$render("i-image", { id: "imgStatus", width: 64, height: 64 }),
                            this.$render("i-label", { id: "lbStatus", class: index_css_2.textCenterStyle, font: { size: '1rem', color: Theme.text.primary, bold: true } })))),
                this.$render("i-button", { id: "btnClose", visible: false, width: "100%", maxWidth: 180, caption: "Close", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.primary.contrastText }, background: { color: Theme.colors.primary.main }, border: { radius: 12 }, onClick: this.handleClose }));
        }
    };
    StatusPayment = __decorate([
        (0, components_7.customElements)('scom-payment-widget--status-payment')
    ], StatusPayment);
    exports.StatusPayment = StatusPayment;
});
define("@scom/scom-payment-widget/components/stripePayment.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-payment-widget/store.ts"], function (require, exports, components_8, store_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StripePayment = void 0;
    const Theme = components_8.Styles.Theme.ThemeVars;
    let StripePayment = class StripePayment extends components_8.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        set payment(data) {
            this._payment = data;
            this.updateAmount();
        }
        get payment() {
            return this._payment;
        }
        updateAmount() {
            if (this.lbAmount) {
                const { amount, currency } = this.payment;
                this.lbAmount.caption = `${components_8.FormatUtils.formatNumber(amount, { decimalFigures: 2 })} ${currency?.toUpperCase()}`;
                this.initStripePayment();
            }
        }
        async loadLib() {
            if (window.Stripe)
                return;
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = store_4.STRIPE_LIB_URL;
                script.async = true;
                script.onload = () => {
                    resolve(true);
                };
                document.head.appendChild(script);
            });
        }
        async initStripePayment() {
            if (!window.Stripe) {
                await this.loadLib();
            }
            if (window.Stripe) {
                const currency = this.payment.currency?.toLowerCase();
                const stripeCurrency = store_4.stripeCurrencies.find(v => v === currency) || 'usd';
                if (this.stripeElements) {
                    this.stripeElements.update({
                        currency: stripeCurrency,
                        amount: this.payment.amount,
                    });
                    return;
                }
                this.stripe = window.Stripe(store_4.STRIPE_CONFIG.STRIPE_PUBLISHABLE_KEY);
                this.stripeElements = this.stripe.elements({
                    mode: 'payment',
                    currency: stripeCurrency,
                    amount: this.payment.amount,
                });
                const paymentElement = this.stripeElements.create('payment');
                paymentElement.mount('#pnlStripePaymentForm');
            }
        }
        async handleStripeCheckoutClick() {
            if (!this.stripe)
                return;
            this.stripeElements.submit().then((result) => {
                console.log('stripe result', result);
                if (this.onPaymentSuccess) {
                    this.onPaymentSuccess(result);
                }
            });
        }
        handleBack() {
            if (this.onBack)
                this.onBack();
        }
        async init() {
            super.init();
            this.onPaymentSuccess = this.getAttribute('onPaymentSuccess', true) || this.onPaymentSuccess;
            this.onBack = this.getAttribute('onBack', true) || this.onBack;
            const payment = this.getAttribute('payment', true);
            if (payment) {
                this.payment = payment;
            }
        }
        render() {
            return this.$render("i-stack", { direction: "vertical", gap: "1rem", alignItems: "center", height: "100%" },
                this.$render("i-stack", { direction: "vertical", gap: "0.5rem", justifyContent: "center", alignItems: "center", width: "100%", height: 60, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main } },
                    this.$render("i-label", { caption: "Amount to pay", font: { size: '0.675rem', bold: true, transform: 'uppercase', color: Theme.text.primary } }),
                    this.$render("i-label", { id: "lbAmount", font: { size: '0.875rem', color: Theme.text.primary, bold: true } })),
                this.$render("i-stack", { direction: "vertical", gap: "1rem", width: "100%", height: "100%", alignItems: "center", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                    this.$render("i-stack", { direction: "vertical", id: "pnlStripePaymentForm", background: { color: '#fff' }, border: { radius: 12 }, padding: { top: '1rem', left: '1rem', bottom: '2rem', right: '1rem' } }),
                    this.$render("i-stack", { direction: "horizontal", width: "100%", alignItems: "center", justifyContent: "center", margin: { top: 'auto' }, gap: "1rem", wrap: "wrap" },
                        this.$render("i-button", { caption: "Back", width: "calc(50% - 0.5rem)", maxWidth: 180, minWidth: 90, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.secondary.contrastText }, background: { color: Theme.colors.secondary.main }, border: { radius: 12 }, onClick: this.handleBack }),
                        this.$render("i-button", { caption: "Checkout", width: "calc(50% - 0.5rem)", maxWidth: 180, minWidth: 90, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }, font: { size: '1rem', color: Theme.colors.primary.contrastText }, background: { color: Theme.colors.primary.main }, border: { radius: 12 }, onClick: this.handleStripeCheckoutClick }))));
        }
    };
    StripePayment = __decorate([
        (0, components_8.customElements)('scom-payment-widget--stripe-payment')
    ], StripePayment);
    exports.StripePayment = StripePayment;
});
define("@scom/scom-payment-widget/components/index.ts", ["require", "exports", "@scom/scom-payment-widget/components/invoiceCreation.tsx", "@scom/scom-payment-widget/components/paymentMethod.tsx", "@scom/scom-payment-widget/components/walletPayment.tsx", "@scom/scom-payment-widget/components/statusPayment.tsx", "@scom/scom-payment-widget/components/stripePayment.tsx"], function (require, exports, invoiceCreation_1, paymentMethod_1, walletPayment_1, statusPayment_1, stripePayment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusPayment = exports.StripePayment = exports.WalletPayment = exports.PaymentMethod = exports.InvoiceCreation = void 0;
    Object.defineProperty(exports, "InvoiceCreation", { enumerable: true, get: function () { return invoiceCreation_1.InvoiceCreation; } });
    Object.defineProperty(exports, "PaymentMethod", { enumerable: true, get: function () { return paymentMethod_1.PaymentMethod; } });
    Object.defineProperty(exports, "WalletPayment", { enumerable: true, get: function () { return walletPayment_1.WalletPayment; } });
    Object.defineProperty(exports, "StatusPayment", { enumerable: true, get: function () { return statusPayment_1.StatusPayment; } });
    Object.defineProperty(exports, "StripePayment", { enumerable: true, get: function () { return stripePayment_1.StripePayment; } });
});
define("@scom/scom-payment-widget/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dappContainerStyle = void 0;
    exports.dappContainerStyle = components_9.Styles.style({
        $nest: {
            '&>:first-child': {
                borderRadius: 12
            },
            '#pnlModule': {
                height: '100%'
            },
            'dapp-container-header': {
                width: 0,
                height: 0,
                overflow: 'hidden'
            },
            'dapp-container-footer': {
                display: 'none'
            }
        }
    });
});
define("@scom/scom-payment-widget", ["require", "exports", "@ijstech/components", "@scom/scom-payment-widget/interface.ts", "@scom/scom-payment-widget/store.ts", "@scom/scom-payment-widget/data.ts", "@scom/scom-payment-widget/index.css.ts", "@scom/scom-dapp-container"], function (require, exports, components_10, interface_4, store_5, data_2, index_css_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomPaymentWidget = void 0;
    let ScomPaymentWidget = class ScomPaymentWidget extends components_10.Module {
        constructor(parent, options) {
            super(parent, options);
            this._wallets = [];
            this._networks = [];
            this._tokens = [];
        }
        get payment() {
            return this._payment;
        }
        set payment(value) {
            this._payment = value;
            this.onStartPayment(value);
        }
        get wallets() {
            return this._wallets ?? data_2.default.defaultData.wallets;
        }
        set wallets(value) {
            this._wallets = value;
        }
        get networks() {
            return this._networks ?? data_2.default.defaultData.networks;
        }
        set networks(value) {
            this._networks = value;
        }
        get tokens() {
            return this._tokens ?? data_2.default.defaultData.tokens;
        }
        set tokens(value) {
            this._tokens = value;
        }
        get rpcWallet() {
            return this.state.getRpcWallet();
        }
        async updateTheme() {
            const themeVar = this.containerDapp?.theme || 'dark';
            this.updateStyle('--divider', '#fff');
            const theme = {
                [themeVar]: {
                    inputFontColor: '#fff',
                    secondaryColor: '#444444'
                }
            };
            await this.containerDapp.ready();
            this.containerDapp.setTag(theme);
        }
        updateStyle(name, value) {
            if (value) {
                this.style.setProperty(name, value);
            }
            else {
                this.style.removeProperty(name);
            }
        }
        onStartPayment(payment) {
            this._payment = payment;
            if (!this.invoiceCreation)
                return;
            this.invoiceCreation.payment = payment;
            this.invoiceCreation.visible = true;
            this.paymentMethod.payment = payment;
            this.paymentMethod.visible = false;
            this.walletPayment.visible = false;
            this.walletPayment.state = this.state;
            this.stripePayment.payment = payment;
            this.stripePayment.visible = false;
            this.statusPayment.visible = false;
        }
        async init() {
            if (!this.state) {
                this.state = new store_5.State(data_2.default);
            }
            super.init();
            this.updateTheme();
            this.onPaymentSuccess = this.getAttribute('onPaymentSuccess', true) || this.onPaymentSuccess;
            this.invoiceCreation.onContinue = () => {
                this.invoiceCreation.visible = false;
                this.paymentMethod.visible = true;
            };
            this.paymentMethod.onSelectedPaymentProvider = (payment, paymentProvider) => {
                this.paymentMethod.visible = false;
                if (paymentProvider === interface_4.PaymentProvider.Metamask || paymentProvider === interface_4.PaymentProvider.TonWallet) {
                    this.paymentMethod.visible = false;
                    this.walletPayment.wallets = this.wallets;
                    this.walletPayment.networks = this.networks;
                    this.walletPayment.tokens = this.tokens;
                    this.walletPayment.onStartPayment({
                        ...payment,
                        provider: paymentProvider
                    });
                    this.walletPayment.visible = true;
                }
                else {
                    this.stripePayment.visible = true;
                }
            };
            this.walletPayment.onPaid = (paymentStatus) => {
                this.walletPayment.visible = false;
                this.statusPayment.visible = true;
                this.statusPayment.updateStatus(this.state, paymentStatus);
            };
            this.walletPayment.onBack = () => {
                this.paymentMethod.visible = true;
                this.walletPayment.visible = false;
            };
            this.stripePayment.onBack = () => {
                this.paymentMethod.visible = true;
                this.stripePayment.visible = false;
            };
            this.stripePayment.onPaymentSuccess = (status) => {
                if (this.onPaymentSuccess)
                    this.onPaymentSuccess(status);
            };
            this.statusPayment.onClose = (status) => {
                if (this.onPaymentSuccess)
                    this.onPaymentSuccess(status);
            };
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const payment = this.getAttribute('payment', true);
                this.networks = this.getAttribute('networks', true, data_2.default.defaultData.networks);
                this.tokens = this.getAttribute('tokens', true, data_2.default.defaultData.tokens);
                this.wallets = this.getAttribute('wallets', true, data_2.default.defaultData.wallets);
                if (payment)
                    this.payment = payment;
            }
            this.executeReadyCallback();
        }
        render() {
            return this.$render("i-scom-dapp-container", { id: "containerDapp", showHeader: true, showFooter: false, class: index_css_3.dappContainerStyle },
                this.$render("i-stack", { direction: "vertical", width: "100%", height: "100%", minHeight: 480, border: { radius: 12 } },
                    this.$render("scom-payment-widget--invoice-creation", { id: "invoiceCreation", visible: false, height: "100%" }),
                    this.$render("scom-payment-widget--payment-method", { id: "paymentMethod", visible: false, height: "100%" }),
                    this.$render("scom-payment-widget--wallet-payment", { id: "walletPayment", visible: false, height: "100%" }),
                    this.$render("scom-payment-widget--stripe-payment", { id: "stripePayment", visible: false, height: "100%" }),
                    this.$render("scom-payment-widget--status-payment", { id: "statusPayment", visible: false, height: "100%" })));
        }
    };
    ScomPaymentWidget = __decorate([
        (0, components_10.customElements)('i-scom-payment-widget')
    ], ScomPaymentWidget);
    exports.ScomPaymentWidget = ScomPaymentWidget;
});
