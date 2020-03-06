import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Input,
  Table,
  TableColumn,
  Button
} from 'element-ui';
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}]

const router = new VueRouter({
  routes
})

export default router