import $ from 'jquery';
export interface TotonooDrawerOption {
  id?: string,
  direction?: string,
  title?: string,
  content?: string,
  zIndex?: number,
  className?: string
}

export const totonooDrawerOption: TotonooDrawerOption = {
  id: `totonoo-drawer-${new Date().getTime()}`,
  direction: 'ltr',
  title: '&nbsp;',
  content: '',
  zIndex: 20,
  className: ''
};

class TotonooDrawer {
  opts: TotonooDrawerOption = null;
  container: JQuery = null;
  content: JQuery = null;
  duration = 160;
  transition = '';

  constructor (options?: TotonooDrawerOption) {
    const _totonooDrawerOption = Object.assign({}, totonooDrawerOption, options);
    this.opts = _totonooDrawerOption;
    this.container = this.getTemplate();
    this.transition = `all ${this.duration}ms ease`;
    this.content = this.container.children('.content');
    this.container.find('.closed').on('click', () => {
      this.closed();
    });
    this.container.on('click', (e) => {
      if(e.target === e.currentTarget) {
        this.closed();
      }
    });
    $('body').append(this.container);
  }

  getTemplate (): JQuery {
    const temp = $(`<div id="${this.opts.id}" class="totonoo--drawer totonoo--drawer-${this.opts.direction}" style="z-index: ${this.opts.zIndex}; display: none;">
    <div class="content">
      <header class="drawer-header">
        <div class="title">${this.opts.title}</div>
        <div class="closed">
          <button><i class="iconfont icon-close"></i></button>
        </div>
      </header>
      <main class="drawer-content">
        <div class="drawer-content-box ${this.opts.className}">
          ${this.opts.content}
        </div>
      </main>
    </div>`);
    return temp;
  }

  aniShowBefore (): void {
    this.container.css({
      transition: this.transition,
      opacity: 1
    });
    this.content.css({
      position: 'relative',
      transition: this.transition
    });
    switch (this.opts.direction) {
    case 'rtl': {
      this.container.css({
        right: '-80%'
      });
      this.content.css({
        right: '-100%'
      });
      break;
    }
    default: {
      this.container.css({
        left: '-80%'
      });
      this.content.css({
        left: '-100%'
      });
      break;
    }
    }
  }

  aniShowAfter (): void {
    switch (this.opts.direction) {
    case 'rtl': {
      this.container.css({
        right: '0'
      });
      this.content.css({
        right: '0'
      });
      break;
    }
    default: {
      this.container.css({
        left: '0'
      });
      this.content.css({
        left: '0'
      });
      break;
    }
    }
  }

  aniHideBefore (): void {
    switch (this.opts.direction) {
    case 'rtl': {
      this.content.css({
        right: '-100%'
      });
      this.container.css({
        right: '-80%',
        opacity: 0
      });
      break;
    }
    default: {
      this.content.css({
        left: '-100%'
      });
      this.container.css({
        left: '-80%',
        opacity: 0
      });
      break;
    }
    }
  }

  show (): Promise<void> {
    return new Promise((resolve) => {
      this.aniShowBefore();
      this.container.show();
      setTimeout(() => {
        this.aniShowAfter();
        resolve();
      });
    });
  }

  closed (): Promise<void> {
    return new Promise((resolve) => {
      this.aniHideBefore();
      setTimeout(() => {
        this.container.hide();
        resolve();
      }, this.duration);
    });
  }
}

export default TotonooDrawer;
