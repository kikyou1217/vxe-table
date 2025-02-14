<template>
  <div>
    <p>树表格、增删改查、工具栏</p>
    <p>可以通过 <toolbar-api-link prop="storage"/> 开启将列个性化的设置状态保存到本地</p>

    <vxe-grid
      highlight-hover-row
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="toolbar"
      :select-config="{labelProp: 'id'}"
      :tree-config="{key: 'id', children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>

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
      tableProxy: {
        ajax: {
          // 处理树结构转换
          query: () => XEAjax.getJSON('/api/file/list').then(data => XEUtils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' })),
          save: ({ body }) => XEAjax.doPost('/api/file/save', body)
        }
      },
      toolbar: {
        id: 'treeEdit_demo1',
        buttons: [
          { code: 'reload', name: '刷新' },
          { code: 'insert_actived', name: '新增' },
          { code: 'mark_cancel', name: '标记/取消' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        setting: {
          storage: true,
          immediate: true
        }
      },
      tableColumn: [
        { type: 'selection', label: '全选', width: 180, treeNode: true },
        { prop: 'name', label: '名称', editRender: { name: 'input' } },
        { prop: 'size', label: '大小', editRender: { name: 'input' } },
        { prop: 'createTime', label: '创建时间', formatter: this.formatterDate },
        { prop: 'updateTime', label: '修改时间', formatter: this.formatterDate }
      ],
      demoCodes: [
        `
        <vxe-grid
          highlight-hover-row
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="toolbar"
          :select-config="{labelProp: 'id'}"
          :tree-config="{key: 'id', children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  // 处理树结构转换
                  query: () => XEAjax.getJSON('/api/file/list').then(data => XEUtils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' })),
                  save: ({ body }) => XEAjax.doPost('/api/file/save', body)
                }
              },
              toolbar: {
                id: 'treeEdit_demo1',
                buttons: [
                  { code: 'reload', name: '刷新' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'mark_cancel', name: '标记/取消' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                setting: {
                  storage: true,
                  immediate: true
                }
              },
              tableColumn: [
                { type: 'selection', label: '全选', width: 180, treeNode: true },
                { prop: 'name', label: '名称', editRender: { name: 'input' } },
                { prop: 'size', label: '大小', editRender: { name: 'input' } },
                { prop: 'createTime', label: '创建时间', formatter: this.formatterDate },
                { prop: 'updateTime', label: '修改时间', formatter: this.formatterDate }
              ]
            }
          },
          methods: {
            formatterDate ({ cellValue }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterDate ({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    }
  }
}
</script>
