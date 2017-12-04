import { AppPage } from './app.po';

describe('Gator Grader App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getHeadingText()).toEqual('Gator Grader');
    });
});
