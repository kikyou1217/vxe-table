<template>
  <div>
    <p>使用 <table-column-api-link prop="slot"/> 自定义模板；可以实现自定义任意内容及 html 元素</p>
    <p>相关参数说明 {seq: 序号, $rowIndex: 获取渲染中的行索引, rowIndex: 获取真实的行索引, row: 获取行数据, column: 获取列配置, columnIndex: 获取真实列索引，$columnIndex:获取渲染中的列索引}</p>
    <p><table-column-api-link prop="default"/>：自定义内容模板（提前格式化好数据 > <table-column-api-link prop="formatter"/> > <table-column-api-link prop="slots"/></p>
    <p><table-column-api-link prop="header"/>：自定义表头模板</p>
    <p><table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link :to="{name: 'Advanced'}">渲染器</router-link>，可以更好的复用）</p>
    <p><table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link :to="{name: 'Advanced'}">渲染器</router-link>，可以更好的复用）</p>

    <vxe-table
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="80">
        <template v-slot="{ seq }">
          <span>seq= {{ seq }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable>
        <template v-slot="{ rowIndex, columnIndex }">
          <span>rowIndex= {{ rowIndex }}</span>
          <span>columnIndex= {{ columnIndex }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :filters="[{data: ''}]" :filter-method="filterSexMethod">
        <template v-slot:header="{ column }">
          <span style="color: red;">这样玩也行</span>
        </template>
        <template v-slot:filter="{ column, context }">
          <template v-for="(option, index) in column.filters">
            <input type="type" v-model="option.data" :key="index" @input="changeFilterEvent($event, option, context)">
          </template>
        </template>
        <template v-slot="{ row }">
          <span>{{ row.sex }} </span>
          <vxe-button type="text">编辑</vxe-button>
          <vxe-button type="text">删除</vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="time" label="Time">
        <template v-slot:header="{ column }">
          <vxe-input placeholder="这样也行" size="mini"></vxe-input>
        </template>
        <template v-slot="{ row }">
          <span>{{ formatDate(row.time) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow>
        <template v-slot="{ row, rowIndex }">
          <select v-if="rowIndex === 1">
            <option value="1">还可以这样</option>
          </select>
          <a href="https://github.com/xuliangzhan/vxe-table">{{ row.name }}</a>
        </template>
      </vxe-table-column>
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
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          :data.sync="tableData">
          <vxe-table-column type="index" width="80">
            <template v-slot="{ seq }">
              <span>seq= {{ seq }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable>
            <template v-slot="{ rowIndex, columnIndex }">
              <span>rowIndex= {{ rowIndex }}</span>
              <span>columnIndex= {{ columnIndex }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :filters="[{data: ''}]" :filter-method="filterSexMethod">
            <template v-slot:header="{ column }">
              <span style="color: red;">这样玩也行</span>
            </template>
            <template v-slot:filter="{ column, context }">
              <template v-for="(option, index) in column.filters">
                <input type="type" v-model="option.data" :key="index" @input="changeFilterEvent($event, option, context)">
              </template>
            </template>
            <template v-slot="{ row }">
              <span>{{ row.sex }} </span>
              <vxe-button type="text">编辑</vxe-button>
              <vxe-button type="text">删除</vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="time" label="Time">
            <template v-slot:header="{ column }">
              <vxe-input placeholder="这样也行" size="mini"></vxe-input>
            </template>
            <template v-slot="{ row }">
              <span>{{ formatDate(row.time) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow>
            <template v-slot="{ row, rowIndex }">
              <select v-if="rowIndex === 1">
                <option value="1">还可以这样</option>
              </select>
              <a href="https://github.com/xuliangzhan/vxe-table">{{ row.name }}</a>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            formatDate (value) {
              return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
            },
            filterSexMethod ({ option, row }) {
              return row.sex === option.data
            },
            changeFilterEvent (evnt, option, context) {
              context.changeMultipleOption(evnt, !!option.data, option)
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
    formatDate (value) {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    },
    filterSexMethod ({ option, row }) {
      return row.sex === option.data
    },
    changeFilterEvent (evnt, option, context) {
      context.changeMultipleOption(evnt, !!option.data, option)
    }
  }
}
</script>
