const { PI } = Math;

exports.area = (r) => PI * r ** 2

exports.circumference = (r) => 2 * PI * r;

// circle.js 模块导出了 area() 和 circumference() 两个函数。 通过在特殊的 exports 对象上指定额外的属性，函数和对象可以被添加到模块的根部。

// 模块内的本地变量是私有的，因为模块被 Node.js 包装在一个函数中（详见模块包装器）。 在这个例子中，变量 PI 是 circle.js 私有的。