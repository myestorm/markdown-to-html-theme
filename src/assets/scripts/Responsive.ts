import $ from 'jquery';
import TotonooDrawer from './TotonooDrawer';

class Responsive {
  header: JQuery = null;
  left: JQuery = null;
  right: JQuery = null;
  leftDrawer: TotonooDrawer = null;
  rightDrawer: TotonooDrawer = null;
  smallHeader: JQuery = null;
  isInit = false;

  constructor (header: JQuery, left: JQuery, right: JQuery) {
    this.header = header;
    this.left = left;
    this.right = right;

    const topNav = header.find('.top-nav-list').clone();
    topNav.find('ul').addClass('totonoo--drawer-tree');

    if (left[0]) {
      topNav.find('li').eq(0).append(left.html());
      this.leftDrawer = new TotonooDrawer({
        content: topNav.html()
      });
    }
    if (right[0]) {
      const rightTitle = right.children('h2').text();
      const rightClone = right.clone();
      rightClone.children('h2').remove();
      this.rightDrawer = new TotonooDrawer({
        title: rightTitle,
        content: rightClone.html(),
        direction: 'rtl',
        className: 'totonoo--aside'
      });
      $('button.totonoo--right-menu').on('click', () => {
        this.rightDrawer.show();
      });
    }
    // 创建窄频头部
    this.smallHeader = $(`<div class="totonoo--small-header">
      <button class="top-menu"><i class="iconfont icon-topmenu"></i></button>
      <div class="top-small-search">
      </div>
    </div>`);
    const topLogo = header.find('.top-logo').clone();
    const topSearch = header.find('.top-search').clone();
    const topMSearch = header.find('.top-search').clone();
    const middleSearch = $('<div class="top-middle-search"></div>');
    middleSearch.append(topMSearch);

    this.smallHeader.find('.top-menu').on('click', () => {
      this.leftDrawer.show();
    }).after(topLogo);
    topSearch.on('click', () => {
      topSearch.addClass('block');
    });
    topSearch.on('blur', 'input', () => {
      topSearch.removeClass('block');
    });
    this.smallHeader.find('.top-small-search').append(topSearch);

    header.find('.totonoo--large-header').after(this.smallHeader);
    header.find('.old-ox > .top-nav').append(middleSearch);

    this.isInit = true;
  }
}

export default Responsive;
