
## 安装
```
npm install @vue/composition-api --save
```
## 使用
在main.js中挂载VueCompositionApi
```
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)
```
## Vue3.0的核心方法
### setup
1. 在created方法调用之前自动执行
2. 为当前组件提供数据或方法
3. 合并到组件的data中
4. 形参props,context
5. return{数据名：值} 

### reactive
作用：为组件提供响应式数据,相当于vue2.x的data
```
const state = reactive({input_todo:''}) //{input_todo:''}
```

### toRefs
转换对象，保证对象不会因为数据解构丢失原有的响应式

## 探索新特性实现简易版todolist
```
<template>
  <div class="home">
    <el-input placeholder="input your todolist"
              v-model="input_todo"
              @change="inputTodoList"></el-input>
    <p></p>
    <h3>todolist</h3>
    <el-table ref="multipleTable"
              :data="list|todo"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              :show-header="false"
              style="width: 100%">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="do">
      </el-table-column>

    </el-table>
    <h3>finishList</h3>
    <el-table ref="multipleTable"
              :data="list|finish"
              tooltip-effect="dark"
              :show-header="false"
              style="width: 100%">
      <el-table-column prop="do">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "@vue/composition-api"
export default {
  name: 'ToDoList',
  filters: {
    todo: function (list) {
      let result = list.filter(l => l.status === 0)
      return result
    },
    finish: function (list) {
      let result = list.filter(l => l.status === 1)
      return result
    }
  },


  setup () {
    const state = reactive(
      {
        input_todo: '',
        list: [{
          do: "刷牙",
          status: 0
        }, {
          do: "起床",
          status: 1
        }]
      }
    )
    const inputTodoList = (e) => {
      console.log(e)
      state.list.splice(0, 0, { do: e, status: 0 })
      state.input_todo = ""
    }
    const handleSelectionChange = (selections) => {
      selections.forEach((selection) => {
        selection.status = 1
      })
    }
    const methods = { inputTodoList, handleSelectionChange }
    return { ...toRefs(state), ...methods }
  }


}
</script>

```

## Vue2.x中的写法
```
  data () {
    return {
      input_todo: '',
      list: [{
        do: "刷牙",
        status: 0
      }, {
        do: "起床",
        status: 1
      }]
    }
  },
  methods: {
    inputTodoList (e) {
      this.list.splice(0, 0, { do: e, status: 0 })
      this.input_todo = ""
    },
    handleSelectionChange (selections) {
      selections.forEach((selection) => {
        selection.status = 1
      })
    }
  },
```


