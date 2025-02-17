<template>
  <div>
    <vxe-toolbar ref="xToolbar" id="document_api" :setting="{storage: true}">
      <template v-slot:buttons>
        <vxe-input class="search-input" v-model="filterName" type="search" :placeholder="`vxe-${apiName} ${$t('app.api.form.apiSearch')}`"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      highlight-hover-column
      ref="xTable"
      class="api-table"
      :cell-class-name="cellClassNameFunc"
      :data.sync="apiList"
      :tree-config="{key: 'id', children: 'list', expandAll: !!filterName, expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus},}"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column prop="name" :label="$t('app.api.title.prop')" min-width="280" tree-node :filters="nameFilters">
        <template v-slot="{ row }">
          <span v-html="row.name"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="desc" :label="$t('app.api.title.desc')" min-width="200">
        <template v-slot="{ row }">
          <span v-html="row.desc"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="type" :label="$t('app.api.title.type')" min-width="140">
        <template v-slot="{ row }">
          <span v-html="row.type"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="enum" :label="$t('app.api.title.enum')" min-width="160">
        <template v-slot="{ row }">
          <span v-html="row.enum"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="defVal" :label="$t('app.api.title.defVal')" min-width="160">
        <template v-slot="{ row }">
          <span v-html="row.defVal"></span>
        </template>
      </vxe-table-column>
      <template v-slot:empty>
        <span class="red">找不对应 API，请输入正确的关键字！</span>
      </template>
    </vxe-table>
  </div>
</template>

<script>
import pack from '../../../../package.json'
import XEUtils from 'xe-utils'
import XEClipboard from 'xe-clipboard'
import tableAPI from '../../../api/table'
import tableColumnAPI from '../../../api/column'
import toolbarAPI from '../../../api/toolbar'
import gridAPI from '../../../api/grid'
import excelAPI from '../../../api/excel'
import pagerAPI from '../../../api/pager'
import radioAPI from '../../../api/radio'
import checkboxAPI from '../../../api/checkbox'
import inputAPI from '../../../api/input'
import buttonAPI from '../../../api/button'
import tooltipAPI from '../../../api/tooltip'
import messageAPI from '../../../api/message'

export default {
  data () {
    return {
      filterName: this.$route.query.filterName,
      defaultExpandRowKeys: [],
      tableData: [],
      nameFilters: [
        { label: 'Props', value: 'Props' },
        { label: 'Slots', value: 'Slots' },
        { label: 'Events', value: 'Events' },
        { label: 'Methods', value: 'Methods' }
      ],
      headerMenus: [
        [
          {
            code: 'hideColumn',
            name: '隐藏列'
          },
          {
            code: 'showAllColumn',
            name: '取消所有隐藏列'
          }
        ],
        [
          {
            code: 'exportAll',
            name: '导出完整文档'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'resize',
            name: '重置操作'
          }
        ],
        [
          {
            code: 'copy',
            name: '复制内容'
          },
          {
            code: 'export',
            name: '导出文档'
          }
        ]
      ]
    }
  },
  computed: {
    apiName () {
      return this.$route.params.name
    },
    apiList () {
      let filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let options = { children: 'list' }
        let searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
        let rest = XEUtils.searchTree(this.tableData, item => searchProps.some(key => item[key].toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = item[key].replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest
      }
      return this.tableData
    }
  },
  watch: {
    apiName () {
      this.loadList()
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      let apis = []
      switch (this.$route.params.name) {
        case 'table':
          apis = tableAPI
          break
        case 'table-column':
          apis = tableColumnAPI
          break
        case 'toolbar':
          apis = toolbarAPI
          break
        case 'grid':
          apis = gridAPI
          break
        case 'excel':
          apis = excelAPI
          break
        case 'pager':
          apis = pagerAPI
          break
        case 'radio':
          apis = radioAPI
          break
        case 'checkbox':
          apis = checkboxAPI
          break
        case 'input':
          apis = inputAPI
          break
        case 'button':
          apis = buttonAPI
          break
        case 'tooltip':
          apis = tooltipAPI
          break
        case 'message':
          apis = messageAPI
          break
      }
      // 生成唯一 id
      let index = 1
      let searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
      XEUtils.eachTree(apis, item => {
        item.id = index++
        item.desc = item.descKey ? this.$t(item.descKey) : item.desc
        searchProps.forEach(key => {
          item[key] = item[key] || '&#12288;'// 使用空白占位符、避免由于空值导致高度缩小破坏布局
        })
      }, { children: 'list' })
      this.tableData = apis
      // 默认展开一级
      this.defaultExpandRowKeys = apis.filter(item => item.list && item.list.length).map(item => item.id)
    },
    cellClassNameFunc ({ row, column }) {
      return {
        'api-disabled': row.disabled,
        'disabled-line-through': row.disabled && column.property === 'name'
      }
    },
    contextMenuClickEvent ({ menu, row, column }) {
      switch (menu.code) {
        case 'hideColumn':
          this.$refs.xToolbar.hideColumn(column)
          break
        case 'showAllColumn':
          this.$refs.xToolbar.showColumn()
          break
        case 'exportAll':
          this.$refs.xTable.exportCsv({
            data: XEUtils.toTreeArray(this.tableData, { children: 'list' }),
            filename: `vxe-${this.apiName}_v${pack.version}.csv`
          })
          break
        case 'copy':
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XMsg.message('已复制到剪贴板！')
            }
          }
          break
        case 'resize':
          this.filterName = ''
          this.tableData = []
          if (this.$refs.xTable) {
            this.$refs.xTable.clearAll()
          }
          this.$nextTick(() => this.loadList())
          break
        case 'export':
          this.$refs.xTable.exportCsv({
            filename: `vxe-${this.apiName}_v${pack.version}.csv`
          })
          break
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.filterName = ''
    if (this.$refs.xTable) {
      this.$refs.xTable.clearAll()
    }
  }
}
</script>

<style lang="scss">
.api-table {
  .api-disabled {
    color: #cb2431;
  }
  .disabled-line-through {
    text-decoration: line-through;
  }
}
</style>
