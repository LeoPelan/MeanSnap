import { SnapPage } from './app.po';

describe('snap App', function() {
  let page: SnapPage;

  beforeEach(() => {
    page = new SnapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
