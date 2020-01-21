import Mock from "mockjs"; //导入mockjs 模板
let Todos = []; //定义我们需要的数据
const COUNT = [1, 2, 3, 4, 5]; //定义需要的数量

for (let i = 1; i <= COUNT.length; i++) {
  Todos.push(
    Mock.mock({
      /* 生成模拟数据*/
      id: Mock.Random.guid(),
      title: Mock.Random.first(), //生成清单名
      isDelete: false, //是否删除
      locked: Mock.Random.boolean(), //随机锁定
      record: COUNT.map(() => {
        return {
          text: Mock.Random.cparagraph(2), //随机文本
          isDelete: false,
          checked: Mock.Random.boolean()
        };
      })
    })
  );
}

export {
  //导出列表数据
  Todos
}
