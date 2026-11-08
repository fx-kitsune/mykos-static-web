import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'ID trùng trong HTML');
for (const [, target] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  if (target === '#') continue;
  if (target.startsWith('#')) assert(ids.includes(target.slice(1)), `Thiếu điểm neo ${target}`);
  else if (!/^https?:/.test(target)) assert(fs.existsSync(path.join(root, target)), `Thiếu tài nguyên ${target}`);
}
for (const tag of html.match(/<img\b[^>]+>/g) || []) {
  assert(/\balt="[^"]*"/.test(tag), 'Ảnh thiếu alt');
  assert(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag), 'Ảnh thiếu kích thước');
}
for (const [, tag] of html.matchAll(/(<a\b[^>]+target="_blank"[^>]*>)/g)) {
  assert(/rel="[^"]*noopener/.test(tag), 'Liên kết ngoài thiếu noopener');
}
function element(attributes = {}) {
  return { dataset: {}, attributes, tabIndex: 0, handlers: {},
    setAttribute(key, value) { this.attributes[key] = value; },
    getAttribute(key) { return this.attributes[key]; },
    addEventListener(name, handler) { this.handlers[name] = handler; },
    focus() { this.focused = true; } };
}
const menu = element({'aria-expanded': 'false'});
const links = [element(), element()];
const navigation = {querySelectorAll: () => links};
const tabs = ['desktop', 'launcher', 'settings'].map(id => { const e = element(); e.dataset.view = id; e.id = 'tab-' + id; return e; });
const image = element(), description = element(), panel = element();
const elements = {'#menuToggle': menu, '#navigation': navigation, '#galleryImage': image, '#galleryDescription': description, '#screenPanel': panel};
const document = {body: {dataset: {}}, handlers: {}, querySelector: key => elements[key], querySelectorAll: () => tabs, addEventListener(name, handler) { this.handlers[name] = handler; }};
vm.runInNewContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), { document, matchMedia: () => element() });
menu.handlers.click(); assert.equal(menu.attributes['aria-expanded'], 'true');
links[0].handlers.click(); assert.equal(menu.attributes['aria-expanded'], 'false');
menu.handlers.click(); document.handlers.keydown({key: 'Escape'}); assert.equal(menu.attributes['aria-expanded'], 'false');assert(menu.focused);
tabs[1].handlers.click(); assert.equal(image.src, 'assets/launcher-paper.png');assert.equal(panel.attributes['aria-labelledby'], 'tab-launcher');
tabs[1].handlers.keydown({key: 'ArrowRight', preventDefault() {}}); assert.equal(image.src, 'assets/settings-paper.png');assert(tabs[2].focused);
tabs[2].handlers.keydown({key: 'Home', preventDefault() {}}); assert.equal(image.src, 'assets/desktop-ink.png');
for (const [, file] of fs.readFileSync(path.join(root, 'app.js'), 'utf8').matchAll(/src: '(assets\/[^']+)'/g)) assert(fs.existsSync(path.join(root, file)));
console.log('Đạt kiểm tra ID, điểm neo, tài nguyên, ảnh và hành vi menu/tab với DOM giả lập. Chưa thay thế kiểm tra trình duyệt.');
