<template>
  <div>
    <p>通过 <table-api-link prop="customs"/> 来初始化绑定动态列，prop:属性,visible:默认是否显示；可使用的属性 {property(只读),label(只读),visible（读写）}</p>
    <p>该功能对于列比较多的表格非常有用，可以轻松实现强大的显示/隐藏列的配置功能，实时调用 refreshColumn 刷新列</p>

    <div class="table-oper">
      <span class="menu-btn">
        <i class="icon-menu"></i>
        <div class="menu-wrapper">
          <template v-for="(column,index) in customColumns1">
            <vxe-checkbox
              v-if="column.property"
              class="checkbox-item"
              v-model="column.visible"
              :key="index"
              @change="$refs.xTable1.refreshColumn()">{{ column.label }}</vxe-checkbox>
          </template>
        </div>
      </span>
    </div>

    <vxe-table
      ref="xTable1"
      border
      height="200"
      :data.sync="tableData"
      :customs.sync="customColumns1">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="role" label="Role"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="scss">{{ demoCodes[2] }}</code>
    </pre>

    <p>如果是根据服务端数据控制显示/隐藏列，则需要手动调用 <table-api-link prop="reloadCustoms"/> 更新即可</p>

    <div class="table-oper">
      <span class="menu-btn">
        <i class="icon-menu"></i>
        <div class="menu-wrapper">
          <template v-for="(column,index) in customColumns2">
            <vxe-checkbox
              v-if="column.property"
              class="checkbox-item"
              v-model="column.visible"
              :key="index"
              @change="$refs.xTable2.refreshColumn()">{{ column.label }}</vxe-checkbox>
          </template>
        </div>
      </span>
    </div>

    <vxe-table
      ref="xTable2"
      border
      height="200"
      :loading="loading"
      :data.sync="tableData"
      :customs.sync="customColumns2">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="role" label="Role"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="scss">{{ demoCodes[5] }}</code>
    </pre>

    <p>通过点击后才调用 <table-api-link prop="refreshColumn"/> 刷新列</p>

    <template v-for="(column,index) in customColumns3">
      <vxe-checkbox
        v-if="column.property"
        class="checkbox-item"
        v-model="column.visible"
        :key="index">{{ column.label }}</vxe-checkbox>
    </template>

    <vxe-toolbar :data="tableData" setting>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable3.refreshColumn()">刷新</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable3"
      border
      height="300"
      :data.sync="tableData"
      :customs.sync="customColumns3">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="role" label="Role"></vxe-table-column>
      <vxe-table-column label="基本信息">
        <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
        <vxe-table-column prop="age" label="Age"></vxe-table-column>
        <vxe-table-column label="其他信息">
          <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
          <vxe-table-column prop="flag" label="Flag"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      // 如果为空则默认全部显示，也可以指定默认的隐藏列
      customColumns1: [
        {
          prop: 'age',
          visible: false
        }
      ],
      customColumns2: [],
      customColumns3: [],
      demoCodes: [
        `
        <div class="table-oper">
          <span class="menu-btn">
            <i class="icon-menu"></i>
            <div class="menu-wrapper">
              <template v-for="(column,index) in customColumns">
                <vxe-checkbox
                  v-if="column.property"
                  class="checkbox-item"
                  v-model="column.visible"
                  :key="index"
                  @change="$refs.xTable.refreshColumn()">{{ column.label }}</vxe-checkbox>
              </template>
            </div>
          </span>
        </div>

        <vxe-table
          ref="xTable"
          border
          height="400"
          :data.sync="tableData"
          :customs.sync="customColumns">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="role" label="Role"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              // 如果为空则默认全部显示，也可以指定默认的隐藏列
              customColumns: [
                {
                  prop: 'age',
                  visible: false
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        .table-oper {
          height: 20px;
          width: 100%;
        }
        .menu-btn {
          position: relative;
          width: 20px;
          height: 20px;
          float: right;
          &:hover {
            .menu-wrapper {
              display: block;
            }
          }
        }
        .menu-wrapper {
          display: none;
          position: absolute;
          width: 80px;
          top: 16px;
          right: 0;
          z-index: 9;
          background-color: #fff;
          font-size: 14px;
          padding: 4px 10px;
          user-select: none;
          border: 1px solid #e8eaec;
          .checkbox-item {
            display: block;
            margin: 4px 0;
          }
        }
        .icon-menu {
          width: 16px;
          height: 0px;
          display: inline-block;
          margin-bottom: 16px;
          box-shadow: 0 6px 0 2px #606266, 0 0 0 2px #606266, 0 12px 0 2px #606266;
        }
        `,
        `
        <div class="table-oper">
          <span class="menu-btn">
            <i class="icon-menu"></i>
            <div class="menu-wrapper">
              <template v-for="(column,index) in customColumns">
                <vxe-checkbox
                  v-if="column.property"
                  class="checkbox-item"
                  v-model="column.visible"
                  :key="index"
                  @change="$refs.xTable.refreshColumn()">{{ column.label }}</vxe-checkbox>
              </template>
            </div>
          </span>
        </div>

        <vxe-table
          ref="xTable"
          border
          height="400"
          :data.sync="tableData"
          :customs.sync="customColumns">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="role" label="Role"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              customColumns: []
            }
          },
          created () {
            this.loading = true
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
            setTimeout(() => {
              this.loading = false
              this.$refs.xTable.reloadCustoms([
                {
                  prop: 'name',
                  visible: false
                }
              ])
            }, 300)
          }
        }
        `,
        `
        .table-oper {
          height: 20px;
          width: 100%;
        }
        .menu-btn {
          position: relative;
          width: 20px;
          height: 20px;
          float: right;
          &:hover {
            .menu-wrapper {
              display: block;
            }
          }
        }
        .menu-wrapper {
          display: none;
          position: absolute;
          width: 80px;
          top: 16px;
          right: 0;
          z-index: 9;
          background-color: #fff;
          font-size: 14px;
          padding: 4px 10px;
          user-select: none;
          border: 1px solid #e8eaec;
          .checkbox-item {
            display: block;
            margin: 4px 0;
          }
        }
        .icon-menu {
          width: 16px;
          height: 0px;
          display: inline-block;
          margin-bottom: 16px;
          box-shadow: 0 6px 0 2px #606266, 0 0 0 2px #606266, 0 12px 0 2px #606266;
        }
        `,
        `
        <template v-for="(column,index) in customColumns">
          <vxe-checkbox
            v-if="column.property"
            class="checkbox-item"
            v-model="column.visible"
            :key="index">{{ column.label }}</vxe-checkbox>
        </template>

        <vxe-toolbar :data="tableData" setting>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable.refreshColumn()">刷新</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          height="400"
          :data.sync="tableData"
          :customs.sync="customColumns">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="role" label="Role"></vxe-table-column>
          <vxe-table-column label="基本信息">
            <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
            <vxe-table-column prop="age" label="Age"></vxe-table-column>
            <vxe-table-column label="其他信息">
              <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
              <vxe-table-column prop="flag" label="Flag"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              customColumns: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
    setTimeout(() => {
      this.loading = false
      if (this.$refs.xTable2) {
        this.$refs.xTable2.reloadCustoms([
          {
            prop: 'name',
            visible: false
          }
        ])
      }
    }, 300)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

<style lang="scss" scoped>
.table-oper {
  height: 20px;
  width: 100%;
}
.menu-btn {
  position: relative;
  width: 20px;
  height: 20px;
  float: right;
  &:hover {
    .menu-wrapper {
      display: block;
    }
  }
}
.menu-wrapper {
  display: none;
  position: absolute;
  width: 80px;
  top: 16px;
  right: 0;
  z-index: 9;
  background-color: #fff;
  font-size: 14px;
  padding: 4px 10px;
  user-select: none;
  border: 1px solid #e8eaec;
  .checkbox-item {
    display: block;
    margin: 4px 0;
  }
}
.icon-menu {
  width: 16px;
  height: 0px;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 0 6px 0 2px #606266, 0 0 0 2px #606266, 0 12px 0 2px #606266;
}
</style>
