<template>
  <div>
    <p>表格搜索功能，非常简单就可以实现表格内容搜索</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName1" type="search" placeholder="试试全表搜索"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      height="300"
      :data="list1">
      <vxe-table-column type="index" width="80"></vxe-table-column>
      <vxe-table-column prop="name" label="Name">
        <template v-slot="{ row }">
          <span v-html="row.name"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="role" label="Role">
        <template v-slot="{ row }">
          <span v-html="row.role"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="age" label="Age">
        <template v-slot="{ row }">
          <span v-html="row.age"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="address" label="Address">
        <template v-slot="{ row }">
          <span v-html="row.address"></span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="scss">{{ demoCodes[2] }}</code>
    </pre>

    <p>树表格搜索功能，非常简单就可以实现树表格内容搜索</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName2" type="search" placeholder="试试全表搜索"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      :data.sync="list2"
      :tree-config="{key: 'id', children: 'children', expandAll: !!filterName2}">
      <vxe-table-column type="index" width="120" label="序号" tree-node></vxe-table-column>
      <vxe-table-column prop="name" label="Name">
        <template v-slot="{ row }">
          <span v-html="row.name"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="size" label="Size">
        <template v-slot="{ row }">
          <span v-html="row.size"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="type" label="Type">
        <template v-slot="{ row }">
          <span v-html="row.type"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="date" label="Date">
        <template v-slot="{ row }">
          <span v-html="row.date"></span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="scss">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      filterName1: '',
      tableData1: [],
      filterName2: '',
      tableData2: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          height="300"
          :data="list">
          <vxe-table-column type="index" width="80"></vxe-table-column>
          <vxe-table-column prop="name" label="Name">
            <template v-slot="{ row }">
              <span v-html="row.name"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="role" label="Role">
            <template v-slot="{ row }">
              <span v-html="row.role"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="age" label="Age">
            <template v-slot="{ row }">
              <span v-html="row.age"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="address" label="Address">
            <template v-slot="{ row }">
              <span v-html="row.address"></span>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              filterName: '',
              tableData: []
            }
          },
          computed: {
            list () {
              let filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
              if (filterName) {
                let filterRE = new RegExp(filterName, 'gi')
                let searchProps = ['name', 'role', 'age', 'address']
                let rest = this.tableData.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1))
                return rest.map(row => {
                  let item = Object.assign({}, row)
                  searchProps.forEach(key => {
                    item[key] = XEUtils.toString(item[key]).replace(filterRE, match => \`<span class="keyword-lighten">\${match}</span>\`)
                  })
                  return item
                })
              }
              return this.tableData
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          }
        }
        `,
        `
        .keyword-lighten {
          color: #000;
          background-color: #FFFF00;
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-input v-model="filterName2" type="search" placeholder="试试全表搜索"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          :data.sync="list"
          :tree-config="{key: 'id', children: 'children', expandAll: !!filterName2}">
          <vxe-table-column type="index" width="120" label="序号" tree-node></vxe-table-column>
          <vxe-table-column prop="name" label="Name">
            <template v-slot="{ row }">
              <span v-html="row.name"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="size" label="Size">
            <template v-slot="{ row }">
              <span v-html="row.size"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="type" label="Type">
            <template v-slot="{ row }">
              <span v-html="row.type"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="date" label="Date">
            <template v-slot="{ row }">
              <span v-html="row.date"></span>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              filterName: '',
              tableData: []
            }
          },
          computed: {
            list () {
              let filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
              if (filterName) {
                let filterRE = new RegExp(filterName, 'gi')
                let options = { children: 'children' }
                let searchProps = ['name', 'size', 'type', 'date']
                let rest = XEUtils.searchTree(this.tableData, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
                XEUtils.eachTree(rest, item => {
                  searchProps.forEach(key => {
                    item[key] = XEUtils.toString(item[key]).replace(filterRE, match => \`<span class="keyword-lighten">\${match}</span>\`)
                  })
                }, options)
                return rest
              }
              return this.tableData
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          }
        }`,
        `
        .keyword-lighten {
          color: #000;
          background-color: #FFFF00;
        }
        `
      ]
    }
  },
  computed: {
    list1 () {
      let filterName = XEUtils.toString(this.filterName1).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let searchProps = ['name', 'role', 'age', 'address']
        let rest = this.tableData1.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1))
        return rest.map(row => {
          let item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
      }
      return this.tableData1
    },
    list2 () {
      let filterName = XEUtils.toString(this.filterName2).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let options = { children: 'children' }
        let searchProps = ['name', 'size', 'type', 'date']
        let rest = XEUtils.searchTree(this.tableData2, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest
      }
      return this.tableData2
    }
  },
  created () {
    this.tableData1 = window.MOCK_DATA_LIST.slice(0, 50)
    this.tableData2 = window.MOCK_TREE_DATA_LIST.slice(0)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
