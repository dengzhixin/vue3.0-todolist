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
