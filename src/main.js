import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import VueAudio from 'vue-audio-better'
import { Swipe, SwipeItem, Icon, Button, Form, Field, CellGroup, Toast, Lazyload, Loading, Overlay, Tab, Tabs, ActionSheet, DropdownMenu, DropdownItem, Search, Dialog, Tag, Pagination, Popup } from 'vant';
import 'vant/lib/index.css'; // 全局引入样式
import 'amfe-flexible'
// import './utils/rem'

const app = createApp(App)

app.use(router);
app.use(store)

app.use(Swipe)
    .use(SwipeItem)
    .use(Icon)
    .use(Button)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(Toast)
    .use(Loading)
    .use(Overlay)
    .use(Tab)
    .use(Tabs)
    .use(ActionSheet)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Search)
    .use(VueAudio)
    .use(Dialog)
    .use(Tag)
    .use(Pagination)
    .use(Popup)

app.use(Lazyload, {
    lazyComponent: true,
});

app.mount('#app')