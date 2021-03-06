import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {PaymentRequestService, PAYMENT_METHODS, PAYMENT_REQUEST_SUPPORT} from '@ng-web-apis/payment-request';


class ShopItem implements PaymentItem {
    constructor(readonly image: string, readonly label: string, readonly price: number) {}

    get amount(): PaymentCurrencyAmount {
        return {
            currency: 'RUB',
            value: String(this.price),
        };
    }
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],

})
export class PaymentComponent implements OnInit {

  constructor(private router_second: Router) { }

  ngOnInit(): void {}
  readonly items: ReadonlyArray<ShopItem> = [
    new ShopItem(
        'https://image.flaticon.com/icons/svg/1868/1868178.svg',
        'Matryoshka',
        50,
    ),
    new ShopItem(
        'https://image.flaticon.com/icons/svg/820/820158.svg',
        'Balalaika',
        100,
    ),
    new ShopItem(
        'https://image.flaticon.com/icons/svg/1868/1868169.svg',
        'Ushanka',
        70,
    ),
    new ShopItem(
        'https://image.flaticon.com/icons/svg/1868/1868226.svg',
        'Kokoshnik',
        70,
    ),
    new ShopItem(
        'https://image.flaticon.com/icons/svg/1868/1868276.svg',
        'Borscht',
        10,
    ),
    new ShopItem(
        'https://image.flaticon.com/icons/svg/1868/1868380.svg',
        'Sputnik',
        1000,
    ),
];

shippingCart: ReadonlyArray<ShopItem> = [];

get totalSum() {
    return this.shippingCart.reduce((sum, item) => {
        return sum + item.price;
    }, 0);
}

get total(): PaymentItem {
    return {
        label: 'Total',
        amount: {
            currency: 'RUB',
            value: String(this.totalSum),
        },
    };
}

addToShippintCard(item: ShopItem) {
    this.shippingCart = [...this.shippingCart, item];
}

onPayment(response: PaymentResponse) {
    console.log('payment response:', response);
    this.clearShippingCart();
    response.complete();
}

onPaymentError(error: string) {
    console.log('payment error:', error);
    this.clearShippingCart();
}

private clearShippingCart() {
    this.shippingCart = [];
}
}
