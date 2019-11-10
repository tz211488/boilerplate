export default function ($) {
  $(document).ready(() => {
    $('.close-header-top').on('click', () => $('.header-top').hide());

    const headerMenuDropDown = {
      hover: true,
      autoTrigger: false,
      constrainWidth: true,
      coverTrigger: false,
    };
    $('.header-menu').dropdown(headerMenuDropDown);

    const headerMenuDropDownFull = {
      alignment: 'center',
      hover: true,
      autoTrigger: false,
      constrainWidth: false,
      coverTrigger: false,
    };
    $('.header-menu-full').dropdown(headerMenuDropDownFull);
    const menu = $('.menu-item-full');
    $('nav').after(menu);


    const headerActionSearch = $('.search-bar-wrapper');
    $('.header-actions').after(headerActionSearch);
    // 点击搜索，出现searchbar
    $('.search-header-action').on('click', () => {
      $('.search-bar-wrapper').removeClass('scale-out').addClass('scale-in');
    });
    $('.search-bar-icon.close-icon').on('click', () => {
      $('.search-bar-wrapper').removeClass('scale-in').addClass('scale-out');
    });

    const accountRightSidenav = $('#account-sidenav');
    $('nav').after(accountRightSidenav);
    // 设置账户侧边栏
    const rightSidenavOptions = {
      edge: 'right',
    };
    $('.right-sidenav').sidenav(rightSidenavOptions);
    $('.sidenav-close-icon').on('click', () => {
      $('.right-sidenav').sidenav('close');
    });
  });
}
