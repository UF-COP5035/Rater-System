import { LoginPage } from './login.po';

describe('Login Page', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
    });

    it('should display a login card', () => {
        page.navigateTo();
        expect(page.getLoginCard().isDisplayed).toBeTruthy();
    });

    it('should display a login card title', () => {
        page.navigateTo();
        expect(page.getLoginCardTitle()).toEqual('Login');
    });

    it('should display all form options options correctly', () => {
        page.navigateTo();

        expect(page.getFormFieldOptionsCount()).toEqual(3);
        expect(page.getUserTypeSelectButton().isDisplayed).toBeTruthy();
    });

    it('should display a userType login field', () => {
        page.navigateTo();
        expect(page.getUserTypeLogin().isDisplayed).toBeTruthy();
    });

    it('should display a username login field', () => {
        page.navigateTo();
        expect(page.getUsernameLogin().isDisplayed).toBeTruthy();
    });

    it('should display a password login field', () => {
        page.navigateTo();
        expect(page.getPasswordLogin().isDisplayed).toBeTruthy();
    });

    it('should display a login button', () => {
        page.navigateTo();
        expect(page.getLoginButton().isDisplayed).toBeTruthy();
    });
});
