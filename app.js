const menuButton = document.querySelector('#menuToggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  document.body.dataset.menuOpen = 'false';
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  document.body.dataset.menuOpen = String(open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

const views = {
  desktop: {src: 'assets/desktop-ink.png', alt: 'Bản thiết kế desktop Ink: hình nền và thanh tác vụ, không có cửa sổ tự mở', description: 'Một hình nền, một thanh tác vụ. Phần còn lại dành cho việc bạn đang làm.'},
  launcher: {src: 'assets/launcher-paper.png', alt: 'Bản thiết kế menu ứng dụng MyKOS ở góc dưới trái trên nền sáng', description: 'Tìm ứng dụng, chọn công cụ và bắt đầu. Một menu gọn ở nơi quen thuộc.'},
  settings: {src: 'assets/settings-paper.png', alt: 'Bản thiết kế cửa sổ thiết lập giao diện với lựa chọn sáng tối của MyKOS', description: 'Các lựa chọn giao diện nằm cùng một chỗ, dựa trên trang thiết lập KDE.'}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus = false) {
  const view = views[tab.dataset.view];
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  const image = document.querySelector('#galleryImage');
  image.src = view.src;
  image.alt = view.alt;
  document.querySelector('#galleryDescription').textContent = view.description;
  document.querySelector('#screenPanel').setAttribute('aria-labelledby', tab.id);
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    if (target !== undefined) {
      event.preventDefault();
      selectTab(tabs[target], true);
    }
  });
});
