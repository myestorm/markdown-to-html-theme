import $ from 'jquery';
class MarkdownNav {
  container: JQuery<HTMLElement> = null;
  nav: JQuery<HTMLElement> = null;

  hgroups: JQuery = null;
  navItems: JQuery = null;
  coordinates: number[] = [];

  constructor (container: string, nav: string, srcollBody: string) {
    this.container = $(container).eq(0);
    this.nav = $(nav);
    this.hgroups = this.container.find('h1, h2, h3, h4, h5, h6');
    this.navItems = this.nav.find('li');
    this.hgroups.each((index, item) => {
      this.coordinates[index] = item.offsetTop;
    });
    const navItems = this.navItems;
    const coordinates = this.coordinates;
    this.navItems.on('click', function () {
      const index = navItems.index(this);
      const top = coordinates[index];
      $(this).addClass('current').siblings().removeClass('current');
      $(srcollBody).animate({ scrollTop: top }, 260);
      return false;
    });
  }

  setIndex (scrollTop: number): void {
    let index = 0;
    let offsetTop = 0;
    this.coordinates.forEach((coordinate, idx) => {
      const _offsetTop = Math.abs(coordinate - scrollTop);
      if (_offsetTop < offsetTop) {
        index = idx;
      }
      offsetTop = _offsetTop;
    });
    this.navItems.eq(index).addClass('current').siblings().removeClass('current');
  }
}

export default MarkdownNav;
