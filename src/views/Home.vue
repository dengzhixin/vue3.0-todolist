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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "@vue/composition-api"
import { addTodo, listTodo, updateTodo, deleteTodo } from '../api/toDoServer'
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
        list: []
      }
    )
    const fetch = () => {
      listTodo().then((res) => {
        state.list = res.data
      })
    }
    const inputTodoList = (e) => {
      console.log(e)
      let obj = { do: e, status: 0 }
      state.input_todo = ""
      addTodo(obj).then(() => {
        fetch()
      })
    }
    const handleSelectionChange = (selections) => {
      selections.forEach((selection) => {
        selection.status = 1
        updateTodo(selection)
      })
    }
    const handleDelete = (index, row) => {
      deleteTodo(row._id).then(() => {
        fetch()

      })
    }
    const methods = { fetch, inputTodoList, handleSelectionChange, handleDelete }
    return { ...toRefs(state), ...methods }
  },
  created () {
    this.fetch()
  }


}
</script>
