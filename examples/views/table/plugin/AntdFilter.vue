<template>
  <div>
    <p>具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-iview" target="_blank">vxe-table-plugin-iview</a> 适配插件的 API</p>

    <vxe-table
      border
      highlight-hover-row
      height="400"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="AInput" :filters="[{data: ''}]" :filter-render="{name: 'AInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
      <vxe-table-column prop="age" label="AInputNumber" sortable :filters="[{data: 0}]" :filter-render="{name: 'AInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
      <vxe-table-column prop="role" label="AAutoComplete" :filters="[{data: ''}]" :filter-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
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
      restaurants: ['前端', '后端', '开发', '测试'],
      ACProps: {
        dataSource: [],
        placeholder: '请输入角色名称'
      },
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          height="400"
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="AInput" :filters="[{data: null}]" :filter-render="{name: 'AInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
          <vxe-table-column prop="age" label="AInputNumber" sortable :filters="[{data: 0}]" :filter-render="{name: 'AInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
          <vxe-table-column prop="role" label="AAutoComplete" :filters="[{data: ''}]" :filter-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              restaurants: ['前端', '后端', '开发', '测试'],
              ACProps: {
                dataSource: [],
                placeholder: '请输入角色名称'
              }
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            roleSearchEvent ({ row }, value) {
              this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    roleSearchEvent ({ row }, value) {
      this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
    }
  }
}
</script>
