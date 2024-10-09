import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/db';

class Tag extends Model {
  public id!: number;
  public name!: string;
}

// Initialize the Tag model
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'Tags',
    timestamps: false,
  }
);


export default Tag;
