import $ from 'jquery';
import './ImgBox.scss';
class ImgBox {
  imgList: string[] = [];
  current = 0;
  dialog: JQuery = null;
  constructor (box: string) {
    const imgs = $(box).find('img');
    imgs.each(index => {
      const img = $(imgs[index]);
      const src = img.attr('src');
      this.imgList.push(src);
      img.data('index', index).css('cursor', 'pointer');
      img.on('click', (e) => {
        this.clickEvent(e);
      });
    });
    this.createDialog();
  }
  clickEvent (e: JQuery.ClickEvent): void {
    const index = $(e.target).data('index');
    this.current = index;
    this.dialog.css('backgroundImage', `url(${this.imgList[index]})`);
    this.dialog.show();
  }
  createDialog (): void {
    const styles = {
      backgroundImage: `url(${this.imgList[0]})`
    };
    const prev = $('<a href="javascript:;" class="prev"><i class="iconfont icon-left"></i></a>');
    prev.on('click', () => {
      let index = this.current - 1;
      if (index < 0) {
        index = this.imgList.length - 1;
      }
      this.current = index;
      dialog.css('backgroundImage', `url(${this.imgList[index]})`);
    });
    const next = $('<a href="javascript:;" class="next"><i class="iconfont icon-right"></i></a>');
    next.on('click', () => {
      let index = this.current + 1;
      if (index >= this.imgList.length) {
        index = 0;
      }
      this.current = index;
      dialog.css('backgroundImage', `url(${this.imgList[index]})`);
    });
    const closed = $('<a href="javascript:;" class="closed"><i class="iconfont icon-close"></i></a>');
    closed.on('click', () => {
      dialog.hide();
    });
    const dialog = $('<div id="totonoo-img-box" class="totonoo--img-box"></div>');
    dialog.css(styles);
    dialog.append(prev).append(next).append(closed);
    $('body').append(dialog);
    this.dialog = dialog;
  }
}
export default ImgBox;
