import { Mean2AppPage } from './app.po';

describe('mean2-app App', function() {
  let page: Mean2AppPage;

  beforeEach(() => {
    page = new Mean2AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
