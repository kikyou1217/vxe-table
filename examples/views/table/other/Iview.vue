<template>
  <div>
    <p>自定义渲染 <a class="link" href="https://www.npmjs.com/package/iview" target="_blank">iview</a> 组件（建议使用 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-iview" target="_blank">vxe-table-plugin-iview</a> 适配插件，当然你也可以自行处理兼容性</p>
    <p>使用自定义模板可以实现对更多细节的控制，但会失去默认的一些功能，比如自动聚焦等。（可以通过设置 <table-column-api-link prop="autofocus"/> 属性强制聚焦）</p>
    <p>如果很多页面都使用相同自定义模板的场景下建议使用<router-link class="link" :to="{name: 'Advanced'}">渲染器</router-link>，因为可以更好的复用</p>

    <vxe-table
      border
      show-overflow
      show-footer
      class="vxe-table-iview"
      height="600"
      :loading="loading"
      :data.sync="tableData"
      :footer-method="footerMethod"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="80" fixed="left">
        <template v-slot:header="{ column }">
          <span>序号</span>
          <Icon type="md-help-circle" />
        </template>
      </vxe-table-column>
      <vxe-table-column prop="name" label="Input"  min-width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <Input v-model="row.name"/>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="role" label="Input"  min-width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <AutoComplete v-model="row.role" :data="restaurants" :filterMethod="roleFilterMethod"></AutoComplete>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{type: 'default'}">
        <template v-slot:header="{ column }">
          <span>{{ column.label }}</span>
          <Icon type="md-alert" />
        </template>
        <template v-slot:edit="{ row }">
          <InputNumber v-model="row.age" :max="35" :min="18"></InputNumber>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <Select v-model="row.sex">
            <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
      </vxe-table-column>
      <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <Cascader v-model="row.region" :data="regionList"></Cascader>
        </template>
        <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
      </vxe-table-column>
      <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <DatePicker v-model="row.date" type="date" format="yyyy/MM/dd"></DatePicker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
      </vxe-table-column>
      <vxe-table-column prop="date2" label="TimePicker" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <TimePicker v-model="row.date2" type="time"></TimePicker>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <Rate v-model="row.rate" />
        </template>
      </vxe-table-column>
      <vxe-table-column prop="flag" label="iSwitch" width="100" fixed="right" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <iSwitch v-model="row.flag"/>
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
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      sexList: [],
      regionList: [],
      restaurants: ['前端', '后端'],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          show-footer
          class="vxe-table-iview"
          height="600"
          :loading="loading"
          :data.sync="tableData"
          :footer-method="footerMethod"
          :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="80" fixed="left">
            <template v-slot:header="{ column }">
              <span>序号</span>
              <Icon type="md-help-circle" />
            </template>
          </vxe-table-column>
          <vxe-table-column prop="name" label="Input"  min-width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <Input v-model="row.name"/>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="role" label="Input"  min-width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <AutoComplete v-model="row.role" :data="restaurants" :filterMethod="roleFilterMethod"></AutoComplete>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{type: 'default'}">
            <template v-slot:header="{ column }">
              <span>{{ column.label }}</span>
              <Icon type="md-alert" />
            </template>
            <template v-slot:edit="{ row }">
              <InputNumber v-model="row.age" :max="35" :min="18"></InputNumber>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <Select v-model="row.sex">
                <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </template>
            <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
          </vxe-table-column>
          <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <Cascader v-model="row.region" :data="regionList"></Cascader>
            </template>
            <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
          </vxe-table-column>
          <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <DatePicker v-model="row.date" type="date" format="yyyy/MM/dd"></DatePicker>
            </template>
            <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
          </vxe-table-column>
          <vxe-table-column prop="date2" label="TimePicker" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <TimePicker v-model="row.date2" type="time"></TimePicker>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="rate" label="Rate" width="200" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <Rate v-model="row.rate" />
            </template>
          </vxe-table-column>
          <vxe-table-column prop="flag" label="iSwitch" width="100" fixed="right" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <iSwitch v-model="row.flag"/>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              sexList: [],
              regionList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          },
          methods: {
            formatDate (value, format) {
              return XEUtils.toDateString(value, format)
            },
            getSelectLabel (value, list, valueProp = 'value', labelProp = 'label') {
              let item = XEUtils.find(list, item => item[valueProp] === value)
              return item ? item[labelProp] : null
            },
            getCascaderLabel (value, list) {
              let values = value || []
              let labels = []
              let matchCascaderData = function (index, list) {
                let val = values[index]
                if (list && values.length > index) {
                  list.forEach(item => {
                    if (item.value === val) {
                      labels.push(item.label)
                      matchCascaderData(++index, item.children)
                    }
                  })
                }
              }
              matchCascaderData(0, list)
              return labels.join(' / ')
            },
            roleFilterMethod  (value, option) {
              return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return '-'
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return '-'
                })
              ]
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let list = window.MOCK_DATA_LIST.slice(0, 100)
      this.tableData = list
      this.loading = false
    }, 500)
    this.findSexList()
    this.findRegionList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findSexList () {
      return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
        this.sexList = data
        return data
      })
    },
    findRegionList () {
      return XEAjax.doGet('/api/conf/region/list').then(({ data }) => {
        this.regionList = data
        return data
      })
    },
    formatDate (value, format) {
      return XEUtils.toDateString(value, format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelProp = 'label') {
      let item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelProp] : null
    },
    getCascaderLabel (value, list) {
      let values = value || []
      let labels = []
      let matchCascaderData = function (index, list) {
        let val = values[index]
        if (list && values.length > index) {
          list.forEach(item => {
            if (item.value === val) {
              labels.push(item.label)
              matchCascaderData(++index, item.children)
            }
          })
        }
      }
      matchCascaderData(0, list)
      return labels.join(' / ')
    },
    roleFilterMethod  (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return '-'
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return '-'
        })
      ]
    }
  }
}
</script>

<style>
/*注意：需要自行实现 iview 需要覆盖以下样式*/
/* .vxe-table-iview .vxe-cell > .ivu-input-wrapper,
.vxe-table-iview .vxe-cell > .ivu-input-number,
.vxe-table-iview .vxe-cell > .ivu-select,
.vxe-table-iview .vxe-cell > .ivu-cascader,
.vxe-table-iview .vxe-cell > .ivu-date-picker-editor {
  width: 100%;
} */
</style>
