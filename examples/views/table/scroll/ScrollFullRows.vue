<template>
  <div>
    <p>虚拟滚动渲染，加载 10 万行，左右固定列</p>
    <p>大数据不建议使用双向绑定的 data 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="reloadData"/> 函数</p>
    <p>对于多选 type=<table-column-api-link prop="selection"/> 当数据量海量时应该绑定 <table-api-link prop="checkProp"/> 属性渲染速度更快</p>
    <p>数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/> 参数以及调整好 <table-api-link prop="optimization"/> ：{scrollX,scrollY} 适合的参数可以更加流畅</p>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-overflow
      height="600"
      :loading="loading"
      :select-config="{checkProp: 'checked'}"
      :optimization ="{scrollY: {gt: 500, oSize: 20, rSize: 60}}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable width="200"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="200"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200"></vxe-table-column>
      <vxe-table-column prop="region" label="Region" width="200"></vxe-table-column>
      <vxe-table-column prop="time" label="Time" width="200"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" width="300"></vxe-table-column>
      <vxe-table-column prop="updateTime" label="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="attr1" label="Attr1" width="200"></vxe-table-column>
      <vxe-table-column prop="attr2" label="Attr2" width="200"></vxe-table-column>
      <vxe-table-column prop="attr3" label="Attr3" width="200"></vxe-table-column>
      <vxe-table-column prop="attr4" label="Attr4" width="200"></vxe-table-column>
      <vxe-table-column prop="attr5" label="Attr5" width="200"></vxe-table-column>
      <vxe-table-column prop="attr6" label="Attr6" width="200"></vxe-table-column>
      <vxe-table-column prop="attr7" label="Attr7" width="200"></vxe-table-column>
      <vxe-table-column prop="attr8" label="Attr8" width="200"></vxe-table-column>
      <vxe-table-column prop="attr9" label="Attr9" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="age" label="Age" width="200" fixed="right"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let tableData = window.MOCK_DATA_LIST.slice(0, 100000)
      // 阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
      if (this.$refs.xTable) {
        this.$refs.xTable.reloadData(tableData)
      }
      this.loading = false
    }, 300)
  }
}
</script>
