<template>
  <div>
    <p>可编辑表格</p>

    <vxe-grid
      border
      height="530"
      :loading="loading"
      :pager-config="tablePage"
      :columns="tableColumn"
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row'}"
      @current-page-change="handleCurrentChange"
      @page-size-change="handleSizeChange"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100, 200, 500]
      },
      tableColumn: [
        { type: 'index', width: 60 },
        { type: 'selection', width: 50 },
        { prop: 'name', label: 'Name', editRender: { name: 'input' } },
        { prop: 'nickname', label: 'Nickname', editRender: { name: 'input' } },
        { prop: 'role', label: 'Role', editRender: { name: 'input' } },
        { prop: 'describe', label: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          height="530"
          :loading="loading"
          :pager-config="tablePage"
          :columns="tableColumn"
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row'}"
          @current-page-change="handleCurrentChange"
          @page-size-change="handleSizeChange"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tablePage: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              },
              tableColumn: [
                { type: 'index', width: 60 },
                { type: 'selection', width: 50 },
                { prop: 'name', label: 'Name', editRender: { name: 'input' } },
                { prop: 'nickname', label: 'Nickname', editRender: { name: 'input' } },
                { prop: 'role', label: 'Role', editRender: { name: 'input' } },
                { prop: 'describe', label: 'Describe', showOverflow: true, editRender: { name: 'input' } }
              ],
              tableData: []
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              // 模拟后台接口
              this.loading = true
              XEAjax.doGet(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`).then(response => {
                let { page, result } = response.data
                this.tableData = result
                this.tablePage.total = page.total
                this.loading = false
              }).catch(e => {
                this.loading = false
              })
            },
            searchEvent () {
              this.tablePage.currentPage = 1
              this.findList()
            },
            handleSizeChange (pageSize) {
              this.tablePage.pageSize = pageSize
              this.searchEvent()
            },
            handleCurrentChange (currentPage) {
              this.tablePage.currentPage = currentPage
              this.findList()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      // 模拟后台接口
      this.loading = true
      XEAjax.doGet(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`).then(response => {
        let { page, result } = response.data
        this.tableData = result
        this.tablePage.total = page.total
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    searchEvent () {
      this.tablePage.currentPage = 1
      this.findList()
    },
    handleSizeChange (pageSize) {
      this.tablePage.pageSize = pageSize
      this.searchEvent()
    },
    handleCurrentChange (currentPage) {
      this.tablePage.currentPage = currentPage
      this.findList()
    }
  }
}
</script>
