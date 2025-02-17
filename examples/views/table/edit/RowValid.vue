<template>
  <div>
    <p>通过调用 <table-api-link prop="validate"/> 函数校验数据，<table-api-link prop="edit-rules"/> 校验规则配置</p>
    <p>如果是在弹出框中使用，可能校验提示信息的 z-index 堆叠顺序会被覆盖，可以通过设置 <table-api-link prop="tooltip-config"/> 属性的 zIndex 解决</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="validEvent">校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整校验</vxe-button>
        <vxe-button @click="selectValidEvent">选中校验</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      show-overflow
      :data.sync="tableData"
      :edit-rules="validRules"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"
      :keyboard-config="{isArrow: true, isTab: true}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      validRules: {
        name: [
          { required: true, message: '名称必须填写' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="validEvent">校验</vxe-button>
            <vxe-button @click="fullValidEvent">完整校验</vxe-button>
            <vxe-button @click="selectValidEvent">选中校验</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          show-overflow
          :data.sync="tableData"
          :edit-rules="validRules"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"
          :keyboard-config="{isArrow: true, isTab: true}">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              validRules: {
                name: [
                  { required: true, message: '名称必须填写' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                sex: [
                  { required: true, message: '性别必须填写' }
                ]
              }
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            validEvent () {
              this.$refs.xTable.validate(valid => {
                if (valid) {
                }
              })
            },
            fullValidEvent () {
              this.$refs.xTable.fullValidate((valid, errMap) => {
                if (valid) {
                  this.$XMsg.alert('校验成功！')
                } else {
                  let msgList = []
                  Object.values(errMap).forEach(errList => {
                    errList.forEach(params => {
                      let { rowIndex, column, rules } = params
                      rules.forEach(rule => {
                        msgList.push(\`第 \${rowIndex} 行 \${column.label} 校验错误：\${rule.message}\`)
                      })
                    })
                  })
                  this.$XMsg.alert({
                    message: () => {
                      return [
                        <div class="red" style="max-height: 400px;overflow: auto;">
                          {
                            msgList.map(msg => {
                              return <p>{ msg }</p>
                            })
                          }
                        </div>
                      ]
                    }
                  })
                }
              })
            },
            selectValidEvent () {
              let selectRecords = this.$refs.xTable.getSelectRecords()
              if (selectRecords.length > 0) {
                this.$refs.xTable.validate(selectRecords, valid => {
                  if (valid) {
                  }
                })
              } else {
                // 未选中数据！
              }
            },
            insertEvent () {
              this.$refs.xTable.insert().then(({ row }) => {
                // 插入一条数据并触发校验
                this.$refs.xTable.validate(row, valid => {
                  if (valid) {

                  }
                })
              })
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XMsg.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              this.$XMsg.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTable.getUpdateRecords()
              this.$XMsg.alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    validEvent () {
      this.$refs.xTable.validate(valid => {
        if (valid) {
        }
      })
    },
    fullValidEvent () {
      this.$refs.xTable.fullValidate((valid, errMap) => {
        if (valid) {
          this.$XMsg.alert('校验成功！')
        } else {
          let msgList = []
          Object.values(errMap).forEach(errList => {
            errList.forEach(params => {
              let { rowIndex, column, rules } = params
              rules.forEach(rule => {
                msgList.push(`第 ${rowIndex} 行 ${column.label} 校验错误：${rule.message}`)
              })
            })
          })
          this.$XMsg.alert({
            message: () => {
              return [
                <div class="red" style="max-height: 400px;overflow: auto;">
                  {
                    msgList.map(msg => {
                      return <p>{ msg }</p>
                    })
                  }
                </div>
              ]
            }
          })
        }
      })
    },
    selectValidEvent () {
      let selectRecords = this.$refs.xTable.getSelectRecords()
      if (selectRecords.length > 0) {
        this.$refs.xTable.validate(selectRecords, valid => {
          if (valid) {
          }
        })
      } else {
        // 未选中数据！
      }
    },
    insertEvent () {
      this.$refs.xTable.insert().then(({ row }) => {
        // 插入一条数据并触发校验
        this.$refs.xTable.validate(row, valid => {
          if (valid) {

          }
        })
      })
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XMsg.alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XMsg.alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XMsg.alert(updateRecords.length)
    }
  }
}
</script>
