import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 앱 컴포넌트 불러오기
import App from './App.vue'

// 전역 css 불러오기
import './index.css'

// 전역 컴포넌트 불러오기
import HeaderBar from './components/HeaderBar.vue'

// 각 페이지 불러오기
import List from './pages/List.vue'
import View from './pages/View.vue'

// MainApi 불러오기
import { MainApi } from './apis/'

// MainApi 객체 생성
const mainApi = new MainApi();

// 라우팅 정보 설정(구성)
const routes = [
  { 
    path: '/', 
    redirect: '/api/list'
  },
  { 
    path: '/api/list', 
    component: List
  },
  { 
    path: '/api/view', 
    component: View
  },
];

// 라우팅 정보를 가져오는 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes : routes
});


// 앱 생성
const app = createApp(App);

app.use(router)

app.component('HeaderBar',HeaderBar)

app.config.globalProperties.$mainApi = mainApi;
app.config.globalProperties.$router = router;

app.mount('#app');
