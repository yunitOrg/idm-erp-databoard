import Vue from 'vue'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/pagination/style/css'

import { 
  ConfigProvider,
  Input, 
  Button,
  Pagination,
  Space,
  Table
} from 'ant-design-vue'

Vue.use(ConfigProvider)
Vue.use(Input)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Space)
Vue.use(Table)
