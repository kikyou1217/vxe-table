const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'size',
        descKey: 'app.api.pager.desc.size',
        type: 'String',
        enum: 'medium,small,mini',
        defVal: '',
        list: []
      },
      {
        name: 'loading',
        descKey: 'app.api.pager.desc.loading',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'layouts',
        descKey: 'app.api.pager.desc.layouts',
        type: 'Array',
        enum: 'PrevJump,PrevPage,Number,JumpNumber,NextPage,NextJump,Sizes,Jump,FullJump,PageCount,Total',
        defVal: '[PrevPage,NextPage,FullJump,Sizes,Total]',
        list: []
      },
      {
        name: 'current-page',
        descKey: 'app.api.pager.desc.currentPage',
        type: 'Number',
        enum: '',
        defVal: '1',
        list: []
      },
      {
        name: 'page-size',
        descKey: 'app.api.pager.desc.pageSize',
        type: 'Number',
        enum: '',
        defVal: '10',
        list: []
      },
      {
        name: 'total',
        descKey: 'app.api.pager.desc.total',
        type: 'Number',
        enum: '',
        defVal: '0',
        list: []
      },
      {
        name: 'pager-count',
        descKey: 'app.api.pager.desc.pagerCount',
        type: 'Number',
        enum: '',
        defVal: '7',
        list: []
      },
      {
        name: 'page-sizes',
        descKey: 'app.api.pager.desc.pageSizes',
        type: 'Array',
        enum: '',
        defVal: '[10,15,20,50,100]',
        list: []
      },
      {
        name: 'background',
        descKey: 'app.api.pager.desc.background',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      }
    ]
  },
  {
    name: 'Slots',
    descKey: 'app.api.title.slots',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Events',
    descKey: 'app.api.title.events',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'current-change',
        desc: '当前页发生改变时会触发该事件',
        type: '',
        enum: '',
        defVal: 'currentPage',
        list: []
      },
      {
        name: 'size-change',
        desc: '每页大小发生改变时会触发该事件',
        type: '',
        enum: '',
        defVal: 'pageSize',
        list: []
      }
    ]
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]

export default apis
