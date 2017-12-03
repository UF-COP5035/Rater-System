import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    getLoginCard() {
        return element(by.css('app-login mat-card'));
    }

    getLoginCardTitle() {
        return element(by.css('app-login mat-toolbar')).getText();
    }

    getUserTypeSelectButton() {
        return element(by.css('app-login mat-select'));
    }

    getFormFieldOptionsCount() {
        return element.all(by.css('app-login mat-form-field')).count();
    }

    getUserTypeLogin() {
        return element(by.className('userType'));
    }

    getUsernameLogin() {
        return element(by.className('username'));
    }

    getPasswordLogin() {
        return element(by.className('password'));
    }

    getLoginButton() {
        return element(by.cssContainingText('mat-raised-button', 'Login'));
    }
}
