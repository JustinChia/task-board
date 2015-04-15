// 依赖
var Sequelize = require('sequelize');
var moment = require('moment');
var base = require('./base');

// 类
var IterationModel = base.define('iteration', {
  version_id: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  start_time: {
    type: Sequelize.INTEGER,
  },
  end_time: {
    type: Sequelize.INTEGER,
    validate: {
      ltStartTime: function() {
        if (this.start_time >= this.end_time) {
          throw new Error('结束时间应大于起始时间');
        }
      }
    }
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: {
        msg: '状态值为整形数值'
      },
      isIn: {
          args: [[0, 1, 99]],
          msg: '值为非法值',
      },
    }
  },
  create_time: {
    type: Sequelize.INTEGER,
    defaultValue: moment().unix(),
  },
}, {
  validate: {
    
  },
  classMethods: {
    
  },
  instanceMethods: {
    
  }
});

// 状态
IterationModel.statusOnline = 0;
IterationModel.statusClosed = 1;
IterationModel.statusOffline = 99;

// 关系
var VersionModel = require('./version2');

IterationModel.belongsTo(VersionModel, { foreignKey: 'version_id' });

// 导出
module.exports = IterationModel;