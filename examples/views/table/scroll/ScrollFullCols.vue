<template>
  <div>
    <p>虚拟滚动渲染，加载 10 万行 1 万列，左右固定列</p>
    <p>大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="loadColumn"/> 函数</p>
    <p>对于多选 type=<table-column-api-link prop="selection"/> 当数据量海量时应该绑定 <table-api-link prop="checkProp"/> 属性渲染速度更快</p>
    <p>数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/> 参数以及调整好 <table-api-link prop="optimization"/> ：{scrollX,scrollY} 适合的参数可以更加流畅</p>

    <vxe-grid
      border
      resizable
      show-overflow
      show-header-overflow
      ref="xTable"
      height="600"
      :loading="loading"
      :select-config="{checkProp: 'checked'}"
      :optimization ="{scrollX: {gt: 20, oSize: 4, rSize: 10}, scrollY: {gt: 500, oSize: 20, rSize: 60}}">
    </vxe-grid>
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
      let tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
      // 阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
      if (this.$refs.xTable) {
        this.$refs.xTable.loadColumn(tableColumn)
        this.$refs.xTable.loadData(tableData)
      }
      this.loading = false
    }, 300)
  }
}
</script>
